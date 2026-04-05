import PropTypes from 'prop-types';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (event) => {
    dispatch(addToCart(product));
        const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Added! 🔔';
    btn.style.background = '#27ae60';
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
    }, 1200);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <LazyLoadImage
          src={product.thumbnail}
          alt={product.title}
          placeholderSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjY2NjIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg=="
          effect="blur"
          className="product-image"
          width="100%"
          height="220"
        />
      </div>

      <div className="product-info">
        <h3 className="product-title" title={product.title}>
          {product.title.length > 45 ? `${product.title.slice(0, 45)}...` : product.title}
        </h3>
        
        <div className="product-meta">
          <div className="price-section">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="original-price">
                ${((product.price * 100) / (100 - product.discountPercentage)).toFixed(0)}
              </span>
            )}
          </div>
          {product.rating && (
            <span className="product-rating">★ {product.rating}</span>
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

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    rating: PropTypes.number,
    discountPercentage: PropTypes.number
  }).isRequired
};

ProductItem.displayName = 'ProductItem';

export default memo(ProductItem);