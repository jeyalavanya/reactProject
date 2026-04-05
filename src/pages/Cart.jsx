import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items || []);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="cart-total">
        <h2>Total: ${total.toFixed(2)}</h2>
        <Link to="/checkout">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default Cart;