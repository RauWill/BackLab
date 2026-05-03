import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './useAuth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { register, error, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) return;
    register(email, password);
  };

  const passwordMismatch = confirm && password !== confirm;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌟</div>
          <h1 className="text-3xl font-bold text-gray-800">Создать аккаунт</h1>
          <p className="text-gray-500 mt-2">Регистрация для родителей</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg
                         focus:outline-none focus:border-primary transition-colors"
              placeholder="parent@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg
                         focus:outline-none focus:border-primary transition-colors"
              placeholder="Минимум 6 символов"
              minLength={6}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Подтвердите пароль
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={`w-full border-2 rounded-xl px-4 py-3 text-lg focus:outline-none transition-colors
                ${passwordMismatch ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
              placeholder="••••••••"
              required
            />
            {passwordMismatch && (
              <p className="text-red-500 text-sm mt-1">Пароли не совпадают</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 text-sm">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || passwordMismatch}
            className="btn-kids w-full bg-primary text-white hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? '⏳ Создаём...' : '✨ Создать аккаунт'}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
