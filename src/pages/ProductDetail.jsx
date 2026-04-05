import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  return (
    <div className="page">
      <h1>Product Detail</h1>
      <p>ID: {id}</p>
      <p>Product details load here...</p>
    </div>
  );
};
export default ProductDetail;