import { useState } from 'react';
import { useChildren } from './useChildren';
import { useAuth } from '../auth/useAuth';
import ChildCard from './ChildCard';
import AddChildModal from './AddChildModal';
import authService from '../auth/auth.service';

export default function DashboardPage() {
  const { children, loading, error, createChild, deleteChild } = useChildren();
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const user = authService.getCurrentUser();

  const handleDelete = async (id) => {
    if (window.confirm('Удалить профиль ребёнка?')) {
      await deleteChild(id);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <header className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">📚 КидсГрамота</h1>
          <p className="text-gray-500 text-sm mt-1">
            Добро пожаловать, {user?.email}
          </p>
        </div>
        <button
          onClick={logout}
          className="btn-kids bg-gray-100 text-gray-600 hover:bg-gray-200 text-base"
        >
          Выйти
        </button>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            👨‍👩‍👧 Профили детей
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="btn-kids bg-primary text-white hover:bg-purple-700"
          >
            + Добавить ребёнка
          </button>
        </div>

        {loading && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">⏳</div>
            <p>Загружаем профили...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 rounded-2xl p-4 text-center">
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && children.length === 0 && (
          <div className="text-center py-16">
            <div className="text-7xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Добавьте первого ребёнка
            </h3>
            <p className="text-gray-400 mb-6">
              Создайте профиль, чтобы начать обучение
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="btn-kids bg-primary text-white hover:bg-purple-700"
            >
              🚀 Создать профиль
            </button>
          </div>
        )}

        {!loading && children.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map((child, index) => (
              <ChildCard
                key={child.id}
                child={child}
                index={index}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <AddChildModal
          onAdd={createChild}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
