import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import { selectCartItems, selectTotalAmount } from '../redux/cartSlice';

const Cart = () => {
  // Read cart items and precomputed total from Redux store.
  const cartItems = useSelector(selectCartItems) || [];
  const total = useSelector(selectTotalAmount) || 0;

  // Show an empty state when there are no items in the cart.
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

      {/* Render a CartItem for every item in the cart */}
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