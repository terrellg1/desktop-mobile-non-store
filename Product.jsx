// Product detail (PDP) screen for the Nonchalant web kit.
const { Button, SizeSwatch, ColorSwatch, Accordion, Badge } = window.NonchalantDesignSystem_440cc0;

function Product({ product, onAdd, onNav }) {
  const p = product || window.NCL_DATA.products[0];
  const { sizes, products } = window.NCL_DATA;
  const [size, setSize] = React.useState(null);
  const [color, setColor] = React.useState(0);
  const [face, setFace] = React.useState('front');
  React.useEffect(() => { setColor(0); setFace('front'); }, [p.id]);
  const c = p.colors[color] || p.colors[0];
  const shot = (face === 'back' && c.back) ? c.back : c.img;
  const tile = '#E6DAC6';
  const avail = sizes.slice(0, 7);
  return (
    <div style={{ padding: '24px 40px 80px' }}>
      <div style={{ font: 'var(--text-caption)', color: 'var(--n-500)', marginBottom: 20 }}>
        <button onClick={() => onNav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }}>Home</button> / {p.cat} / {p.name}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 56, alignItems: 'start' }}>
        {/* Gallery */}
        <div style={{ position: 'sticky', top: 92 }}>
          <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <Shot img={shot} fill={tile} ratio="3 / 4" pad="6%" />
            {c.back && (
              <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4, padding: 4, borderRadius: 'var(--radius-pill)', background: 'rgba(250,247,242,.72)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.6)' }}>
                {['front', 'back'].map((f) => (
                  <button key={f} onClick={() => setFace(f)} style={{
                    border: 'none', cursor: 'pointer', padding: '9px 20px', borderRadius: 'var(--radius-pill)',
                    font: 'var(--text-eyebrow)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase',
                    background: face === f ? 'var(--n-900)' : 'transparent', color: face === f ? 'var(--n-50)' : 'var(--n-800)',
                    transition: 'all var(--dur-fast) var(--ease-standard)',
                  }}>{f}</button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Buy box */}
        <div style={{ position: 'sticky', top: 92, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {p.badge && <Badge tone="neutral">{p.badge}</Badge>}
          <div>
            <h1 style={{ font: 'var(--text-h2)', margin: '0 0 8px', color: 'var(--n-900)' }}>{p.name}</h1>
            <div style={{ font: 'var(--text-lg)', color: 'var(--n-900)' }}>{p.price}</div>
          </div>
          <div>
            <div style={{ font: 'var(--text-eyebrow)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--n-600)', marginBottom: 12 }}>Color — {c.name}</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {p.colors.map((cc, i) => <ColorSwatch key={i} color={cc.color} name={cc.name} size="lg" selected={i === color} onClick={() => { setColor(i); setFace('front'); }} />)}
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ font: 'var(--text-eyebrow)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--n-600)' }}>Size</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'var(--text-caption)', color: 'var(--n-600)', textDecoration: 'underline' }}>Size guide</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {avail.map((s, i) => <SizeSwatch key={s} label={s} selected={size === s} disabled={i === 6} onClick={() => setSize(s)} />)}
            </div>
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={() => onAdd(p)}>
            {size ? 'Add to bag' : 'Select a size'}
          </Button>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Accordion title="Details & fit" defaultOpen>
              A heavyweight 240gsm combed-cotton statement piece, cut boxy and unisex. Size down for a fitted look. Model is 5'9" wearing size S.
            </Accordion>
            <Accordion title="Fabric & care">100% combed cotton, 240gsm. Machine wash cold, hang or lay flat to dry.</Accordion>
            <Accordion title="Shipping & returns">Complimentary shipping over $75. Free 30-day returns.</Accordion>
          </div>
        </div>
      </div>

      {/* You may also like */}
      <section style={{ marginTop: 80 }}>
        <h2 style={{ font: 'var(--text-h3)', margin: '0 0 24px', color: 'var(--n-900)' }}>You may also like</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {products.filter((x) => x.id !== p.id && x.cat === p.cat).concat(products.filter((x) => x.id !== p.id && x.cat !== p.cat)).slice(0, 4).map((x) => (
            <div key={x.id} style={{ cursor: 'pointer' }} onClick={() => { onNav('product', x); window.scrollTo(0,0); }}>
              <Shot img={x.img} fill={x.fill} style={{ borderRadius: 'var(--radius-md)' }} />
              <div style={{ font: 'var(--text-body-sm)', color: 'var(--n-900)', marginTop: 10 }}>{x.name}</div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--n-600)' }}>{x.price}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
window.Product = Product;
