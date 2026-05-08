import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './src/context/AuthContext';
import HomePage from './src/pages/HomePage';
import AuthPage from './src/pages/AuthPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}