import { LazyLoadImage } from 'react-lazy-load-image-component';  // npm i react-lazy-load-image-component
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice.js';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));  // Redux action
  };

  return (
    <div className="product-card">
      <LazyLoadImage
        src={product.thumbnail}
        alt={product.title}
        className="product-image"
        placeholderSrc="https://via.placeholder.com/300x200/eee/ccc?text=Loading..."
        effect="blur"
        width={300}
        height={200}
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default ProductItem;