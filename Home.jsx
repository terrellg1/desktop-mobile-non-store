// Home screen for the Nonchalant web kit.
const { Button, ProductCard } = window.NonchalantDesignSystem_440cc0;

function Home({ onNav, onAdd }) {
  const { products, categories } = window.NCL_DATA;
  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', height: 620, background: 'var(--clay)', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, #E8DAC6 0%, #DCC4AC 52%, #C9A987 100%)' }} />
        <img src="img/world-tee.png" alt="" style={{ position: 'absolute', right: '4%', top: '50%', transform: 'translateY(-50%)', height: '78%', objectFit: 'contain', filter: 'drop-shadow(0 40px 50px rgba(38,30,22,.28))' }} />
        <div style={{ position: 'relative', padding: '0 40px', maxWidth: 620 }}>
          <div style={{ font: 'var(--text-eyebrow)', fontSize: 12, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--umber)', marginBottom: 18 }}>Drop 06 · The World Tee</div>
          <h1 style={{ font: 'var(--text-display)', fontSize: 72, color: 'var(--n-900)', margin: 0, lineHeight: .96, letterSpacing: '-.02em' }}>this world<br/>without non<br/>is just 'eh'.</h1>
          <div style={{ marginTop: 30, display: 'flex', gap: 12 }}>
            <Button variant="primary" size="lg" onClick={() => onNav('product', window.NCL_DATA.products[0])}>Shop the tee</Button>
            <Button variant="secondary" size="lg" onClick={() => onNav('collection', 'New')}>New arrivals</Button>
          </div>
        </div>
      </section>

      {/* Category rail */}
      <section style={{ padding: '56px 40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {categories.map((c) => (
            <button key={c.name} onClick={() => onNav('collection', c.name)} style={{ border: 'none', padding: 0, background: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <Shot img={c.img} fill={c.fill} ratio="4 / 5" style={{ borderRadius: 'var(--radius-md)' }} />
              <div style={{ font: 'var(--text-eyebrow)', fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--n-900)', marginTop: 12 }}>{c.name}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section style={{ padding: '40px 40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
          <h2 style={{ font: 'var(--text-h2)', margin: 0, color: 'var(--n-900)' }}>Best sellers</h2>
          <button onClick={() => onNav('collection', 'New')} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'var(--text-eyebrow)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--n-600)' }}>View all →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px 24px' }}>
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} name={p.name} price={p.price} badge={p.badge} swatchColor={p.fill} colors={p.colors}
              image={<Shot img={p.img} fill={p.fill} />}
              onClick={() => onNav('product', p)} />
          ))}
        </div>
      </section>

      {/* Editorial band */}
      <section style={{ margin: '64px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 460 }}>
        <div style={{ background: 'var(--sand)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 64px' }}>
          <div style={{ font: 'var(--text-eyebrow)', fontSize: 12, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--sienna)', marginBottom: 18 }}>Fits Everybody</div>
          <h2 style={{ font: 'var(--text-h1)', fontSize: 48, margin: 0, color: 'var(--n-900)', lineHeight: 1.05 }}>one fabric,<br/>every body.</h2>
          <p style={{ font: 'var(--text-body)', color: 'var(--n-700)', maxWidth: 380, marginTop: 20 }}>Heavyweight combed cotton, cut relaxed and unisex in sizes XS–XXL. Pressed the moment you order — made to disappear on.</p>
          <div style={{ marginTop: 28 }}><Button variant="primary" onClick={() => onNav('collection', 'Basics')}>Shop the collection</Button></div>
        </div>
        <Shot img="img/love-non-tee.png" fill="var(--fawn)" ratio="auto" style={{ height: '100%' }} />
      </section>
    </div>
  );
}
window.Home = Home;
