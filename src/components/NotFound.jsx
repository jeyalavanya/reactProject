import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, this page doesn't exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};
export default NotFound;