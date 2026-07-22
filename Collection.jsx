// Collection / listing screen with filter rail for the Nonchalant web kit.
const { ProductCard, Tag, Divider, Checkbox } = window.NonchalantDesignSystem_440cc0;

function Collection({ title, onNav }) {
  const { products, sizes } = window.NCL_DATA;
  const [selSizes, setSelSizes] = React.useState([]);
  const toggle = (s) => setSelSizes((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const shown = products.filter((p) => {
    if (title === 'New') return p.isNew;
    if (title === 'Sale') return false;
    if (['Tees', 'Hoodies', 'Bottoms', 'Basics'].includes(title)) return p.cat === title;
    return true;
  });
  return (
    <div style={{ padding: '40px 40px 80px' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ font: 'var(--text-eyebrow)', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--n-500)', marginBottom: 10 }}>Shop / {title}</div>
        <h1 style={{ font: 'var(--text-h1)', margin: 0, color: 'var(--n-900)' }}>{title}</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48 }}>
        {/* Filters */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div>
            <div style={{ font: 'var(--text-eyebrow)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--n-700)', marginBottom: 14 }}>Size</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sizes.map((s) => <Tag key={s} selected={selSizes.includes(s)} onClick={() => toggle(s)}>{s}</Tag>)}
            </div>
          </div>
          <Divider />
          <div>
            <div style={{ font: 'var(--text-eyebrow)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--n-700)', marginBottom: 14 }}>Category</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Tees', 'Hoodies', 'Bottoms', 'Basics'].map((c) => <Checkbox key={c} label={c} defaultChecked={c === title} />)}
            </div>
          </div>
        </aside>
        {/* Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
            <span style={{ font: 'var(--text-body-sm)', color: 'var(--n-500)' }}>{shown.length} items</span>
            <span style={{ font: 'var(--text-eyebrow)', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--n-700)' }}>Sort · Featured</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px 24px' }}>
            {shown.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', padding: '60px 0', textAlign: 'center', font: 'var(--text-body)', color: 'var(--n-500)' }}>Nothing on sale right now — check back after the next drop.</div>
            ) : shown.map((p) => (
              <ProductCard key={p.id} name={p.name} price={p.price} badge={p.badge} swatchColor={p.fill} colors={p.colors}
                image={<Shot img={p.img} fill={p.fill} />}
                onClick={() => onNav('product', p)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
window.Collection = Collection;
