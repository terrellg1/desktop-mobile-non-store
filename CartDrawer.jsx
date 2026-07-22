// Cart drawer for the Nonchalant web kit.
const { Button, IconButton, Divider } = window.NonchalantDesignSystem_440cc0;

function CartDrawer({ open, items, onClose, onQty, onRemove }) {
  const subtotal = items.reduce((s, it) => s + it.priceNum * it.qty, 0);
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,22,19,.35)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity var(--dur-base) var(--ease-standard)', zIndex: 40 }} />
      <aside style={{ position: 'fixed', top: 0, right: 0, height: '100%', width: 420, maxWidth: '92vw', background: 'var(--surface-page)', zIndex: 50, transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform var(--dur-slow) var(--ease-out)', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
          <span style={{ font: 'var(--text-eyebrow)', fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--n-900)' }}>Your bag ({items.length})</span>
          <IconButton variant="ghost" aria-label="Close" onClick={onClose}><NclIcon.close /></IconButton>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px' }}>
          {items.length === 0 && <p style={{ font: 'var(--text-body)', color: 'var(--n-500)', textAlign: 'center', marginTop: 48 }}>Your bag is empty.</p>}
          {items.map((it) => (
            <div key={it.key} style={{ display: 'flex', gap: 14, padding: '18px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <Ph fill={it.fill} ratio="3 / 4" style={{ width: 76, flexShrink: 0, borderRadius: 'var(--radius-sm)' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{ font: 'var(--text-body-sm)', color: 'var(--n-900)', fontWeight: 500 }}>{it.name}</span>
                  <span style={{ font: 'var(--text-body-sm)', color: 'var(--n-900)' }}>{it.price}</span>
                </div>
                <span style={{ font: 'var(--text-caption)', color: 'var(--n-500)' }}>{it.color} · {it.size}</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, border: '1px solid var(--n-300)', borderRadius: 'var(--radius-pill)', padding: '5px 12px' }}>
                    <button onClick={() => onQty(it.key, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--n-700)', display: 'flex' }}><NclIcon.minus /></button>
                    <span style={{ font: 'var(--text-body-sm)', minWidth: 14, textAlign: 'center' }}>{it.qty}</span>
                    <button onClick={() => onQty(it.key, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--n-700)', display: 'flex' }}><NclIcon.plus /></button>
                  </div>
                  <button onClick={() => onRemove(it.key)} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'var(--text-caption)', color: 'var(--n-500)', textDecoration: 'underline' }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ font: 'var(--text-body)', color: 'var(--n-900)' }}>Subtotal</span>
            <span style={{ font: 'var(--text-body)', color: 'var(--n-900)', fontWeight: 500 }}>${subtotal}</span>
          </div>
          <p style={{ font: 'var(--text-caption)', color: 'var(--n-500)', margin: '0 0 16px' }}>Shipping & taxes calculated at checkout.</p>
          <Button variant="primary" size="lg" fullWidth disabled={items.length === 0}>Checkout</Button>
        </div>
      </aside>
    </>
  );
}
window.CartDrawer = CartDrawer;
