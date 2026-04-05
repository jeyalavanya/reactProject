import { useState, useEffect, useCallback } from 'react';

// Custom hook to fetch product data and expose loading/error state.
export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized retry function avoids recreating the callback on every render.
  const retryFetch = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      
      const controller = new AbortController();
      const { signal } = controller;
      
      // Use AbortController so the fetch can be canceled if needed.
      const response = await fetch('https://dummyjson.com/products?limit=20', {
        signal,
        cache: 'no-cache'
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      if (err.name === 'AbortError') return;
      
      console.error('Fetch failed:', err);
      setError(err.message || 'Failed to load products. Check connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch products once when the hook is mounted.
    retryFetch();
    
    // Return a cleanup function if future enhancements add cancellable logic.
    return () => {}; 
  }, [retryFetch]);

  return { products, loading, error, retry: retryFetch };
};