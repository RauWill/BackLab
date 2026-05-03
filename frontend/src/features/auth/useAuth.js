import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './auth.service';

export function useAuth() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError('');
      const { token, user } = await authService.login(email, password);
      authService.saveSession(token, user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    try {
      setLoading(true);
      setError('');
      const { token, user } = await authService.register(email, password);
      authService.saveSession(token, user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.clearSession();
    navigate('/login');
  };

  return { login, register, logout, error, loading };
}
