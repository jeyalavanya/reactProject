import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, selectTotalAmount, selectTotalItems } from '../redux/cartSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector(selectTotalAmount) || 0;
  const itemCount = useSelector(selectTotalItems) || 0;

  const [formData, setFormData] = useState({ name: '', email: '', address: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <div className="checkout page">
      <div className="checkout-card">
        <div className="checkout-main">
          <div className="checkout-header">
            <h1>Checkout</h1>
            <p className="checkout-subtitle">
              Complete your order with secure shipping details and payment-ready checkout.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <textarea
                id="address"
                name="address"
                placeholder="123 Main St, City, Country"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="order-summary">
              <h2>Order summary</h2>
              <div className="summary-row">
                <span>Items in cart</span>
                <span>{itemCount}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button type="submit" className="checkout-submit">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;