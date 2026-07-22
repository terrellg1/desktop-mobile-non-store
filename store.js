// Nonchalant storefront — catalog store with admin overrides + GitHub publish.
// Keeps a pristine base catalog, layers editable overrides on top, and can
// publish overrides (+ uploaded photos) to a GitHub Pages repo like the old store.
(function () {
  const LS_OV = 'ncl-overrides';
  const LS_TOKEN = 'ncl-gh-token';
  const LS_REPO = 'ncl-gh-repo';
  const DEFAULT_TILE = '#E6DAC6';

  // Snapshot the pristine catalog authored in data.js.
  const BASE = JSON.parse(JSON.stringify(window.NCL_DATA.products));
  window.NCL_BASE = BASE;

  function loadOverrides() {
    try { return JSON.parse(localStorage.getItem(LS_OV)) || {}; } catch (e) { return {}; }
  }
  function saveOverrides(ov) {
    try { localStorage.setItem(LS_OV, JSON.stringify(ov)); } catch (e) {}
  }

  // Normalize a product so cards/screens always have img + fill.
  function normalize(p) {
    if (!p.colors || !p.colors.length) p.colors = [{ color: '#CFC3B0', name: 'Default', tile: DEFAULT_TILE, img: '' }];
    p.colors.forEach(function (c) { if (!c.tile) c.tile = DEFAULT_TILE; });
    p.img = p.colors[0].img;
    p.fill = p.colors[0].tile;
    return p;
  }

  // Merge base + overrides into the working catalog (admin sees hidden; store filters).
  function build(includeHidden) {
    const ov = window.NCL_OVERRIDES || {};
    let list = BASE.map(function (b) {
      const o = ov[b.id];
      const p = JSON.parse(JSON.stringify(b));
      if (o) {
        ['name', 'price', 'cat', 'tag', 'isNew', 'badge', 'hidden'].forEach(function (k) {
          if (o[k] !== undefined) p[k] = o[k];
        });
        if (o.colors) p.colors = JSON.parse(JSON.stringify(o.colors));
      }
      return p;
    });
    (ov._new || []).forEach(function (n) { list.push(JSON.parse(JSON.stringify(n))); });
    if (ov._order && ov._order.length) {
      const pos = {}; ov._order.forEach(function (id, i) { pos[id] = i; });
      list.sort(function (a, b) { return (pos[a.id] ?? 999) - (pos[b.id] ?? 999); });
    }
    list = list.map(normalize);
    return includeHidden ? list : list.filter(function (p) { return !p.hidden; });
  }

  // Recompute the live catalog and notify React to re-render.
  function refresh() {
    window.NCL_DATA.products = build(false);
    window.NCL_ALL = build(true);
    window.dispatchEvent(new Event('ncl-change'));
  }

  // Fetch published overrides (products.json) if present, then apply local edits on top.
  function init() {
    window.NCL_OVERRIDES = loadOverrides();
    refresh();
    fetch('products.json', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (remote) {
        if (!remote) return;
        // Local unsaved edits win over remote; otherwise adopt remote.
        if (!Object.keys(window.NCL_OVERRIDES).length) {
          window.NCL_OVERRIDES = remote;
          saveOverrides(remote);
          refresh();
        }
      })
      .catch(function () {});
  }

  // GitHub publish — uploads any data: images to admin-img/, writes products.json.
  function publish(repo, token, onStatus) {
    repo = (repo || '').trim(); token = (token || '').trim();
    if (!repo || !token) { onStatus('Enter repo + token first'); return Promise.reject(); }
    try { localStorage.setItem(LS_REPO, repo); localStorage.setItem(LS_TOKEN, token); } catch (e) {}
    const api = 'https://api.github.com/repos/' + repo + '/contents/';
    const ov = JSON.parse(JSON.stringify(window.NCL_OVERRIDES || {}));
    const files = [];
    function scan(id, obj) {
      (obj.colors || []).forEach(function (c, i) {
        if (c.img && c.img.indexOf('data:') === 0) files.push({ path: 'admin-img/' + id + '-' + i + '.png', c: c, key: 'img' });
        if (c.back && c.back.indexOf('data:') === 0) files.push({ path: 'admin-img/' + id + '-' + i + '-back.png', c: c, key: 'back' });
      });
    }
    Object.keys(ov).forEach(function (k) { if (k[0] !== '_' && ov[k]) scan(k, ov[k]); });
    (ov._new || []).forEach(function (n) { scan(n.id, n); });

    function putFile(path, b64) {
      const url = api + path;
      return fetch(url, { headers: { Authorization: 'Bearer ' + token } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          const body = { message: 'Admin: ' + path, content: b64 };
          if (j && j.sha) body.sha = j.sha;
          return fetch(url, { method: 'PUT', headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        })
        .then(function (r) {
          if (r.ok) return r;
          return r.json().catch(function () { return {}; }).then(function (j) { throw new Error((j && j.message ? j.message : 'HTTP ' + r.status) + ' — ' + path); });
        });
    }

    onStatus('Publishing…');
    let chain = Promise.resolve(), done = 0;
    files.forEach(function (f) {
      chain = chain.then(function () {
        done++; onStatus('Uploading photo ' + done + '/' + files.length + '…');
        return putFile(f.path, f.c[f.key].split(',')[1]).then(function () { f.c[f.key] = f.path; });
      });
    });
    return chain.then(function () {
      onStatus('Saving product data…');
      return putFile('products.json', btoa(unescape(encodeURIComponent(JSON.stringify(ov, null, 2)))));
    }).then(function () {
      onStatus('Published ✓ live in ~1 min');
    }).catch(function (err) {
      onStatus('Failed — ' + ((err && err.message) || 'network error'));
    });
  }

  window.NCL_STORE = {
    loadOverrides: loadOverrides,
    saveOverrides: function (ov) { window.NCL_OVERRIDES = ov; saveOverrides(ov); refresh(); },
    getOverrides: function () { return window.NCL_OVERRIDES || {}; },
    build: build,
    refresh: refresh,
    publish: publish,
    savedRepo: function () { try { return localStorage.getItem(LS_REPO) || ''; } catch (e) { return ''; } },
    savedToken: function () { try { return localStorage.getItem(LS_TOKEN) || ''; } catch (e) { return ''; } },
    resetAll: function () { try { localStorage.removeItem(LS_OV); } catch (e) {} window.NCL_OVERRIDES = {}; refresh(); },
  };
  init();
})();
