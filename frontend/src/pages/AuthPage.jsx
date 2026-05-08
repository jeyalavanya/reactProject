import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const initialForm = {
  username: '',
  email: '',
  password: ''
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState('');
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const response = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password
        });

        setToken(response.data.token);
        setUser(response.data.user);
        navigate('/');
      } else {
        await api.post('/auth/register', formData);
        setIsLogin(true);
        setFormData(initialForm);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <main className="auth-page">
      <form className="google-form-card" onSubmit={handleSubmit}>
        <div className="google-form-top"></div>

        <h1>{isLogin ? 'Sign in' : 'Register'}</h1>
        <p className="sub-text">
          {isLogin
            ? 'Sign in to continue to YouTube Clone'
            : 'Create an account to continue'}
        </p>

        {!isLogin && (
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="auth-submit-btn">
          {isLogin ? 'Login' : 'Register'}
        </button>

        <button
          type="button"
          className="toggle-auth-btn"
          onClick={() => {
            setIsLogin((prev) => !prev);
            setError('');
          }}
        >
          {isLogin ? 'Create account instead' : 'Already have an account? Sign in'}
        </button>
      </form>
    </main>
  );
}