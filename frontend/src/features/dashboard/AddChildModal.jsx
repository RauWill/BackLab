import { useState } from 'react';

const AVATARS = ['🐱', '🐶', '🦊', '🐼', '🦁', '🐸', '🦋', '🐝'];

export default function AddChildModal({ onAdd, onClose }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(5);
  const [avatar, setAvatar] = useState('🐱');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onAdd({ name, age: parseInt(age), avatar });
      onClose();
    } catch (err) {
      alert('Ошибка при создании профиля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-bounce-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">👶 Добавить ребёнка</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Выберите аватар
            </label>
            <div className="flex gap-2 flex-wrap">
              {AVATARS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setAvatar(em)}
                  className={`text-3xl p-2 rounded-xl transition-all
                    ${avatar === em ? 'bg-primary/20 scale-110 ring-2 ring-primary' : 'hover:bg-gray-100'}`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Имя ребёнка
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg
                         focus:outline-none focus:border-primary"
              placeholder="Например: Алиса"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Возраст: <span className="text-primary font-bold">{age} лет</span>
            </label>
            <input
              type="range"
              min={3}
              max={12}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>3 года</span>
              <span>12 лет</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-kids flex-1 bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-kids flex-1 bg-primary text-white hover:bg-purple-700"
            >
              {loading ? '⏳' : '✅ Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
