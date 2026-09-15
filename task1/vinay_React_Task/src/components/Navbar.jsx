import { Link } from 'react-router-dom';

function Navbar() {
  const s = {
    wrap: { background: '#1e293b', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', width: '100%' },
    cont: { maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    brand: { color: '#ffffff', textDecoration: 'none', fontWeight: '800', fontSize: '22px', letterSpacing: '1px' },
    links: { display: 'flex', gap: '30px' },
    link: { color: '#f8fafc', textDecoration: 'none', fontWeight: '600', fontSize: '16px', letterSpacing: '0.5px', transition: 'color 0.2s ease', cursor :'pointer' }
  };

  return (
    <nav style={s.wrap}>
      <div style={s.cont}>
        <Link to="/" style={s.brand}>Ampera</Link>
        <div style={s.links}>
          <Link to="/products" style={s.link}>Products</Link>
          <Link to="/customers" style={s.link}>Customers</Link>
          <Link to="/orders" style={s.link}>Orders</Link>
          <Link to="/stores" style={s.link}>Stores</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
