import { useSelector } from 'react-redux';           // Redux selector only
import { useCallback, memo } from 'react';           // React hooks
import ProductItem from './ProductItem.jsx';
import { useFetchProducts } from '../hooks/useFetchProducts.js';

const ProductList = () => {
  const searchQuery = useSelector((state) => state.cart?.search || '');
  const { products, loading, error } = useFetchProducts();

  // Memoized filtered list
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stable add callback (perf optimization)
  const handleAddToCart = useCallback((product) => {
    // Handled by ProductItem's internal dispatch
  }, []);

  if (loading) {
    return (
      <section className="product-list">
        <h2>Loading Products...</h2>
        <div className="loading-grid">
          {Array(8).fill().map((_, i) => (
            <div key={`skeleton-${i}`} className="skeleton-card"></div>
          ))}
        </div>
      </section>
    );
  }
if (error) {
  return (
    <section className="product-list error">
      <h2>😞 Load Failed</h2>
      <p>{error}</p>
      <div className="error-actions">
        <button onClick={() => retry()} className="retry-btn">
          🔄 Retry
        </button>
        <button onClick={() => window.location.reload()} className="hard-reload">
          💾 Reload Page
        </button>
      </div>
    </section>
  );
}

  return (
    <section className="product-list">
      <h2>{filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found</h2>
      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>No products match "{searchQuery}"</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductItem 
              key={product.id} 
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default memo(ProductList);