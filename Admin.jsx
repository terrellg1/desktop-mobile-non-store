// Admin / store manager for the Nonchalant storefront.
const { Button, IconButton } = window.NonchalantDesignSystem_440cc0;

const CATS = ['Tees', 'Hoodies', 'Bottoms', 'Basics'];
const A_FIELD = { border: '1px solid var(--n-300)', borderRadius: 'var(--radius-sm)', padding: '10px 12px', font: 'var(--text-body-sm)', color: 'var(--n-900)', background: 'var(--n-0)', width: '100%', boxSizing: 'border-box' };
const A_LABEL = { font: 'var(--text-eyebrow)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--n-600)', marginBottom: 6, display: 'block' };

function readImage(file, cb) {
  const r = new FileReader();
  r.onload = () => cb(r.result);
  r.readAsDataURL(file);
}

function Admin({ onNav }) {
  const [items, setItems] = React.useState(() => JSON.parse(JSON.stringify(window.NCL_ALL || [])));
  const [repo, setRepo] = React.useState(window.NCL_STORE.savedRepo());
  const [token, setToken] = React.useState(window.NCL_STORE.savedToken());
  const [status, setStatus] = React.useState('');

  // Persist working set into overrides + live storefront on every change.
  function commit(next) {
    setItems(next);
    const ov = { _order: [], _new: [] };
    next.forEach((p) => {
      ov._order.push(p.id);
      const rec = { name: p.name, price: p.price, cat: p.cat, tag: p.tag || '', isNew: !!p.isNew, badge: p.badge || '', hidden: !!p.hidden, colors: p.colors };
      if (p.__new) ov._new.push(Object.assign({ id: p.id, __new: true }, rec));
      else ov[p.id] = rec;
    });
    window.NCL_STORE.saveOverrides(ov);
  }

  const setField = (idx, key, val) => { const n = items.slice(); n[idx] = Object.assign({}, n[idx], { [key]: val }); commit(n); };
  const setColor = (idx, ci, key, val) => {
    const n = items.slice(); const p = Object.assign({}, n[idx]);
    p.colors = p.colors.map((c, i) => i === ci ? Object.assign({}, c, { [key]: val }) : c);
    n[idx] = p; commit(n);
  };
  const addColor = (idx) => { const n = items.slice(); const p = Object.assign({}, n[idx]); p.colors = p.colors.concat([{ name: 'New', color: '#CFC3B0', tile: '#E6DAC6', img: '' }]); n[idx] = p; commit(n); };
  const removeColor = (idx, ci) => { const n = items.slice(); const p = Object.assign({}, n[idx]); if (p.colors.length <= 1) return; p.colors = p.colors.filter((_, i) => i !== ci); n[idx] = p; commit(n); };
  const addProduct = () => {
    const n = items.concat([{ id: 'custom-' + Date.now(), __new: true, name: 'New Product', price: '$0', cat: 'Tees', tag: '', isNew: true, colors: [{ name: 'Default', color: '#CFC3B0', tile: '#E6DAC6', img: '' }] }]);
    commit(n);
  };
  const removeProduct = (idx) => { if (!confirm('Delete this product?')) return; commit(items.filter((_, i) => i !== idx)); };
  const move = (idx, dir) => { const j = idx + dir; if (j < 0 || j >= items.length) return; const n = items.slice(); const t = n[idx]; n[idx] = n[j]; n[j] = t; commit(n); };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 40px 120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <div style={{ font: 'var(--text-eyebrow)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--sienna)', marginBottom: 8 }}>Admin</div>
          <h1 style={{ font: 'var(--text-h1)', margin: 0, color: 'var(--n-900)' }}>Store manager</h1>
          <p style={{ font: 'var(--text-body-sm)', color: 'var(--n-600)', maxWidth: 560, marginTop: 10 }}>Edit names, prices, categories, tags, colors and photos, reorder, hide or add products. Changes preview live; hit Publish to push to your site.</p>
        </div>
        <Button variant="secondary" onClick={() => onNav('home')}>← Back to store</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((p, idx) => (
          <div key={p.id} style={{ background: p.hidden ? 'var(--n-100)' : 'var(--surface-card, #fff)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20, opacity: p.hidden ? 0.7 : 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 1fr', gap: 12, alignItems: 'end' }}>
              <div><label style={A_LABEL}>Name</label><input value={p.name} onChange={(e) => setField(idx, 'name', e.target.value)} style={A_FIELD} /></div>
              <div><label style={A_LABEL}>Price</label><input value={p.price} onChange={(e) => setField(idx, 'price', e.target.value)} style={A_FIELD} /></div>
              <div><label style={A_LABEL}>Category</label>
                <select value={p.cat} onChange={(e) => setField(idx, 'cat', e.target.value)} style={A_FIELD}>{CATS.map((c) => <option key={c} value={c}>{c}</option>)}</select>
              </div>
              <div><label style={A_LABEL}>Badge / tag</label><input value={p.badge || ''} onChange={(e) => setField(idx, 'badge', e.target.value)} placeholder="e.g. New" style={A_FIELD} /></div>
            </div>

            <div style={{ display: 'flex', gap: 20, alignItems: 'center', margin: '14px 0' }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: 'var(--text-body-sm)', color: 'var(--n-800)', cursor: 'pointer' }}>
                <input type="checkbox" checked={!!p.isNew} onChange={(e) => setField(idx, 'isNew', e.target.checked)} /> Show in “New”
              </label>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: 'var(--text-body-sm)', color: 'var(--n-800)', cursor: 'pointer' }}>
                <input type="checkbox" checked={!!p.hidden} onChange={(e) => setField(idx, 'hidden', e.target.checked)} /> Hidden
              </label>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                <button onClick={() => move(idx, -1)} title="Move up" style={miniBtn}>↑</button>
                <button onClick={() => move(idx, 1)} title="Move down" style={miniBtn}>↓</button>
                <button onClick={() => removeProduct(idx)} title="Delete" style={Object.assign({}, miniBtn, { color: 'var(--error)' })}>Delete</button>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
              <div style={Object.assign({}, A_LABEL, { marginBottom: 10 })}>Colors & photos</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {p.colors.map((c, ci) => (
                  <div key={ci} style={{ width: 200, border: '1px solid var(--n-200)', borderRadius: 'var(--radius-md)', padding: 12 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                      {['img', 'back'].map((slot) => (
                        <label key={slot} style={{ flex: 1, cursor: 'pointer' }}>
                          <div style={{ aspectRatio: '3 / 4', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: c.tile || '#E6DAC6', position: 'relative', border: '1px solid var(--n-200)' }}>
                            {c[slot] ? <img src={c[slot]} alt="" style={{ position: 'absolute', inset: '6%', width: '88%', height: '88%', objectFit: 'contain' }} />
                              : <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', font: 'var(--text-caption)', color: 'var(--n-500)' }}>{slot === 'img' ? 'Front' : 'Back'}</span>}
                          </div>
                          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files[0]; if (f) readImage(f, (d) => setColor(idx, ci, slot, d)); }} />
                        </label>
                      ))}
                    </div>
                    <input value={c.name} onChange={(e) => setColor(idx, ci, 'name', e.target.value)} placeholder="Color name" style={Object.assign({}, A_FIELD, { marginBottom: 6, padding: '7px 9px' })} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="color" value={c.color || '#CFC3B0'} onChange={(e) => setColor(idx, ci, 'color', e.target.value)} style={{ width: 34, height: 30, border: 'none', background: 'none', cursor: 'pointer' }} />
                      <span style={{ font: 'var(--text-caption)', color: 'var(--n-500)' }}>Swatch</span>
                      {p.colors.length > 1 && <button onClick={() => removeColor(idx, ci)} style={Object.assign({}, miniBtn, { marginLeft: 'auto', color: 'var(--error)' })}>✕</button>}
                    </div>
                  </div>
                ))}
                <button onClick={() => addColor(idx)} style={{ width: 200, minHeight: 120, border: '1px dashed var(--n-400)', borderRadius: 'var(--radius-md)', background: 'none', cursor: 'pointer', color: 'var(--n-600)', font: 'var(--text-body-sm)' }}>+ Add color</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addProduct} style={{ marginTop: 16, border: '1px dashed var(--n-400)', background: 'none', color: 'var(--sienna)', borderRadius: 'var(--radius-md)', padding: '16px 26px', font: 'var(--text-eyebrow)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer', width: '100%' }}>+ Add a product</button>

      <div style={{ marginTop: 36, background: 'var(--n-900)', borderRadius: 'var(--radius-lg)', padding: 26 }}>
        <div style={{ font: 'var(--text-eyebrow)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--fawn)', marginBottom: 16 }}>Publish to live site</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 520 }}>
          <input value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="github-user/repo" style={{ background: 'var(--n-800)', border: '1px solid var(--n-700)', borderRadius: 'var(--radius-sm)', padding: '12px 14px', color: 'var(--n-50)', font: 'var(--text-body-sm)' }} />
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="GitHub token (Contents: read/write)" style={{ background: 'var(--n-800)', border: '1px solid var(--n-700)', borderRadius: 'var(--radius-sm)', padding: '12px 14px', color: 'var(--n-50)', font: 'var(--text-body-sm)' }} />
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="accent" onClick={() => window.NCL_STORE.publish(repo, token, setStatus)}>Publish</Button>
            <button onClick={() => { if (confirm('Discard all local edits?')) { window.NCL_STORE.resetAll(); setItems(JSON.parse(JSON.stringify(window.NCL_ALL))); setStatus('Reset to defaults'); } }} style={{ background: 'none', border: '1px solid var(--n-700)', color: 'var(--n-300)', borderRadius: 'var(--radius-sm)', padding: '12px 18px', font: 'var(--text-eyebrow)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer' }}>Reset</button>
            <span style={{ font: 'var(--text-body-sm)', color: 'var(--fawn)' }}>{status}</span>
          </div>
          <p style={{ font: 'var(--text-caption)', color: 'var(--n-500)', margin: '6px 0 0' }}>Token: github.com → Settings → Developer settings → Fine-grained tokens → repo access with <b style={{ color: 'var(--n-300)' }}>Contents: Read and write</b>.</p>
        </div>
      </div>
    </div>
  );
}

const miniBtn = { background: 'none', border: '1px solid var(--n-300)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', font: 'var(--text-caption)', color: 'var(--n-700)', cursor: 'pointer' };
window.Admin = Admin;
