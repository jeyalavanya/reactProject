import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      {/* Product thumbnail for the item in the cart */}
      <img src={item.thumbnail} alt={item.title} loading="lazy" />
      <div>
        <h3>{item.title}</h3>
        <p>${item.price}</p>
      </div>
      <div className="quantity">
        {/* Decrease quantity, but never below 1 */}
        <button
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span>{item.quantity}</span>
        {/* Increase quantity by 1 */}
        <button
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
        >
          +
        </button>
      </div>
      {/* Remove the item from cart completely */}
      <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
    </div>
  );
};

export default CartItem;