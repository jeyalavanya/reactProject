import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ onToggleSidebar }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-button" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          ☰
        </button>

        <div className="brand-wrap">
          <span className="brand-logo">▶</span>
          <span className="brand-text">YouTube</span>
        </div>
      </div>

      <div className="header-center">
        <input className="search-input" placeholder="Search" />
      </div>

      <div className="header-right">
        {user ? (
          <>
            <span className="user-name">{user.username}</span>
            <button className="signin-button" onClick={logout}>Logout</button>
          </>
        ) : (
          <button className="signin-button" onClick={() => navigate('/auth')}>
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}