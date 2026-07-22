// Nav + announcement bar + footer for the Nonchalant web kit.
const { IconButton } = window.NonchalantDesignSystem_440cc0;

function Announcement() {
  return (
    <div style={{ background: 'var(--n-900)', color: 'var(--n-50)', textAlign: 'center', padding: '9px 16px',
      font: 'var(--text-eyebrow)', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase' }}>
      Complimentary shipping on orders over $75
    </div>
  );
}

function Nav({ onNav, onCart, cartCount, active }) {
  const { nav } = window.NCL_DATA;
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--surface-page)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '0 40px', height: 68 }}>
        <nav style={{ display: 'flex', gap: 26 }}>
          {nav.map((n) => (
            <button key={n} onClick={() => onNav('collection', n)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
              font: 'var(--text-eyebrow)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase',
              color: n === 'Sale' ? 'var(--sienna)' : (active === n ? 'var(--n-900)' : 'var(--n-600)'),
              borderBottom: active === n ? '1px solid var(--n-900)' : '1px solid transparent',
            }}>{n}</button>
          ))}
        </nav>
        <button onClick={() => onNav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', justifySelf: 'center' }}>
          <img src="../../assets/logo-black.png" alt="Nonchalant" style={{ height: 22 }} />
        </button>
        <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end', alignItems: 'center' }}>
          <IconButton variant="ghost" aria-label="Search"><NclIcon.search /></IconButton>
          <IconButton variant="ghost" aria-label="Account"><NclIcon.user /></IconButton>
          <button onClick={onCart} aria-label="Bag" style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', width: 42, height: 42, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--n-900)' }}>
            <NclIcon.bag />
            {cartCount > 0 && <span style={{ position: 'absolute', top: 6, right: 4, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, background: 'var(--n-900)', color: 'var(--n-50)', fontSize: 10, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ onNav }) {
  const cols = [
    ['Shop', ['New arrivals', 'Lounge', 'Underwear', 'Swim', 'Gift cards']],
    ['Help', ['Shipping', 'Returns', 'Size guide', 'Contact']],
    ['About', ['Our story', 'Sustainability', 'Careers', 'Stores']],
  ];
  return (
    <footer style={{ background: 'var(--n-900)', color: 'var(--n-300)', padding: '64px 40px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 1fr)', gap: 40 }}>
        <div>
          <img src="../../assets/logo-white.png" alt="Nonchalant" style={{ height: 22, marginBottom: 20 }} />
          <p style={{ font: 'var(--text-body-sm)', color: 'var(--n-400)', maxWidth: 240, lineHeight: 1.6 }}>
            effortless, on purpose. softness engineered to disappear.
          </p>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <div style={{ font: 'var(--text-eyebrow)', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--n-100)', marginBottom: 16 }}>{h}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((i) => <a key={i} href="#" style={{ font: 'var(--text-body-sm)', color: 'var(--n-400)', textDecoration: 'none' }}>{i}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--n-800)', display: 'flex', justifyContent: 'space-between', font: 'var(--text-caption)', color: 'var(--n-500)' }}>
        <span>© 2026 Nonchalant</span>
        <span style={{ letterSpacing: '.1em', textTransform: 'uppercase', display: 'flex', gap: 14 }}>
          <span>Privacy · Terms · Accessibility</span>
          <button onClick={() => onNav && onNav('admin')} style={{ background: 'none', border: 'none', color: 'var(--n-600)', cursor: 'pointer', font: 'inherit', letterSpacing: '.1em', textTransform: 'uppercase', padding: 0 }}>Admin</button>
        </span>
      </div>
    </footer>
  );
}

Object.assign(window, { Announcement, Nav, Footer });
