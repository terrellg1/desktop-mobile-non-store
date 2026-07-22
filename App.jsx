// App orchestrator for the Nonchalant web kit.
function App() {
  const [route, setRoute] = React.useState({ page: 'home', arg: null });
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  const [, setRev] = React.useState(0);
  const [admin, setAdmin] = React.useState(() => location.hash === '#admin');

  React.useEffect(() => {
    const onChange = () => setRev((r) => r + 1);
    const onHash = () => setAdmin(location.hash === '#admin');
    window.addEventListener('ncl-change', onChange);
    window.addEventListener('hashchange', onHash);
    return () => { window.removeEventListener('ncl-change', onChange); window.removeEventListener('hashchange', onHash); };
  }, []);

  const onNav = (page, arg) => {
    if (page === 'admin') { location.hash = 'admin'; setAdmin(true); window.scrollTo(0, 0); return; }
    if (admin) { if (location.hash) location.hash = ''; setAdmin(false); }
    setRoute({ page, arg }); if (page !== 'product') window.scrollTo(0, 0);
  };
  const addToCart = (p) => {
    const key = p.id + '-' + Date.now();
    setCart((c) => [...c, { key, id: p.id, name: p.name, price: p.price, priceNum: parseInt(p.price.replace(/\D/g, '')), fill: p.fill, color: p.colors[0].name, size: 'M', qty: 1 }]);
    setCartOpen(true);
  };
  const onQty = (key, d) => setCart((c) => c.map((it) => it.key === key ? { ...it, qty: Math.max(1, it.qty + d) } : it));
  const onRemove = (key) => setCart((c) => c.filter((it) => it.key !== key));
  const count = cart.reduce((s, it) => s + it.qty, 0);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-page)', display: 'flex', flexDirection: 'column' }}>
      <Announcement />
      <Nav onNav={onNav} onCart={() => setCartOpen(true)} cartCount={count} active={route.page === 'collection' ? route.arg : null} />
      <main style={{ flex: 1 }}>
        {admin ? <Admin onNav={onNav} /> : <>
          {route.page === 'home' && <Home onNav={onNav} onAdd={addToCart} />}
          {route.page === 'collection' && <Collection title={route.arg || 'New'} onNav={onNav} />}
          {route.page === 'product' && <Product product={route.arg} onAdd={addToCart} onNav={onNav} />}
        </>}
      </main>
      <Footer onNav={onNav} />
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onQty={onQty} onRemove={onRemove} />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
