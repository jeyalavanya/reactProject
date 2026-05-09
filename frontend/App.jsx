import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './src/context/AuthContext';
import HomePage from './src/pages/HomePage';
import AuthPage from './src/pages/AuthPage';
import VideoDetailPage from './src/pages/VideoDetailPage';
import ChannelPage from './src/pages/ChannelPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/channel" element={<ChannelPage />} />
          <Route path="/video/:videoId" element={<VideoDetailPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}