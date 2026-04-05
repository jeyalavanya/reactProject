import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setSearch } from '../redux/cartSlice.js';  // Redux action for search

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux selectors for cart count and current search
  const cartItemCount = useSelector((state) => 
    state.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
  );
  const currentSearch = useSelector((state) => state.cart?.search || '');

  // Sync local state with Redux search so the input stays updated.
  useEffect(() => {
    setSearchQuery(currentSearch);
  }, [currentSearch]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(setSearch(query));  // Update Redux for ProductList filter
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/');  // Redirect to home with filtered products
  };

  return (
    <header className="header">
      <div className="container">
        {/* Logo / Brand */}
        <Link to="/" className="logo">
          🛒 ShoppyGlobe
        </Link>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
        </nav>

        {/* Search Form - for Redux search feature */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="search-input"
          />
        </form>

        {/* Shopping Cart Icon with Badge */}
        <Link to="/cart" className="cart-icon-link">
          <div className="cart-icon">
            🛍️
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </div>
          <span className="cart-text">Cart</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;