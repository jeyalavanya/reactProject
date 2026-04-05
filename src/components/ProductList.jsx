import { useSelector } from 'react-redux';
import ProductItem from './ProductItem.jsx';
import { useFetchProducts } from '../hooks/useFetchProducts.js';  // Custom hook (next)

// Placeholder data until API works
const placeholderProducts = [
  { id: 1, title: 'Sample Product 1', price: 29.99, thumbnail: 'https://via.placeholder.com/300x200?text=P1' },
  { id: 2, title: 'Sample Product 2', price: 39.99, thumbnail: 'https://via.placeholder.com/300x200?text=P2' },
  { id: 3, title: 'Sample Product 3', price: 49.99, thumbnail: 'https://via.placeholder.com/300x200?text=P3' }
];

const ProductList = () => {
  // Redux search filter
  const searchQuery = useSelector((state) => state.cart?.search || '');
  
  // Custom hook for products (implements later)
  const { products: apiProducts, loading, error } = useFetchProducts();
  
  // Use API or placeholder
  const products = apiProducts.length > 0 ? apiProducts : placeholderProducts;

  // Filter by search
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="product-list">
        <div className="loading-grid">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list error">
        <h2>Error loading products</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Featured Products</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found for "{searchQuery}"</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductItem 
              key={product.id}  // Unique key req\
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;