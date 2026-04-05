import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Header = () => {
  const [search, setSearch] = useState('');
  const cartItems = useSelector((state) => state.cart?.items?.length || 0);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Redux dispatch search action here later
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          ShoppyGlobe
        </Link>
        <nav className="nav">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
            />
          </form>
          <Link to="/cart" className="cart-link">
            Cart ({cartItems})
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;