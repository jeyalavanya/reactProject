import PropTypes from 'prop-types';  // Props validation
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice.js';

const ProductItem = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Use prop callback OR Redux dispatch
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      dispatch(addToCart(product));  // Direct Redux 
    }
    
    // Visual feedback
    const btn = document.querySelector(`[data-product-id="${product.id}"]`);
    if (btn) {
      btn.textContent = 'Added! 🔔';
      btn.style.background = '#27ae60';
      setTimeout(() => {
        btn.textContent = 'Add to Cart 🛒';
        btn.style.background = '';
      }, 1500);
    }
  };

  return (
    <article className="product-card" data-product-id={product.id}>
      {/* Lazy loaded image */}
      <div className="product-image-wrapper">
        <LazyLoadImage
          src={product.thumbnail}
          alt={product.title}
          placeholderSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI5MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg=="
          effect="blur"
          className="product-image"
          width="100%"
          height="200"
          wrapperClassName="image-wrapper"
        />
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title" title={product.title}>
          {product.title.length > 50 
            ? `${product.title.substring(0, 50)}...` 
            : product.title
          }
        </h3>
        
        <div className="product-meta">
          <span className="product-price">
            ${product.price}
            {product.discountPercentage && (
              <span className="original-price">
                ${((product.price * 100) / (100 - product.discountPercentage)).toFixed(0)}
              </span>
            )}
          </span>
          {product.rating && (
            <span className="product-rating">
              ★ {product.rating}
            </span>
          )}
        </div>

        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart 🛒
        </button>
      </div>
    </article>
  );
};

// PropTypes validation (reusable components req)
ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    discountPercentage: PropTypes.number,
    rating: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func
};

ProductItem.defaultProps = {
  onAddToCart: null
};

export default ProductItem;