import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';

// Lazy load all pages for performance optimization
const Home = lazy(() => import('./pages/Home.jsx'));
const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'));
const CartPage = lazy(() => import('./components/Cart.jsx'));
const Checkout = lazy(() => import('./components/Checkout.jsx'));
const NotFound = lazy(() => import('./components/NotFound.jsx'));

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Suspense fallback={
            <div className="loading">
              <p>Loading...</p>
            </div>
          }>
            <Routes>
              {/* Home route */}
              <Route path="/" element={<Home />} />
              
              {/* Dynamic product detail with route param */}
              <Route path="/product/:id" element={<ProductDetail />} />
              
              {/* Cart route */}
              <Route path="/cart" element={<CartPage />} />
              
              {/* Checkout route */}
              <Route path="/checkout" element={<Checkout />} />
              
              {/* 404 NotFound route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;