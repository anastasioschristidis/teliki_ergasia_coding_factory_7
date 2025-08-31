import { Link } from 'react-router-dom';

function Header({ userInfo, logoutHandler }) {
  return (
    <header style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>eShop</Link>
        <Link to="/cart">🛒 Καλάθι</Link>

        {userInfo ? (
          <>
            <span>Καλωσήρθες, {userInfo.name}</span>
            <button onClick={logoutHandler}>Αποσύνδεση</button>
          </>
        ) : (
          <>
            <Link to="/login">👤 Σύνδεση</Link>
            <Link to="/register">Εγγραφή</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
