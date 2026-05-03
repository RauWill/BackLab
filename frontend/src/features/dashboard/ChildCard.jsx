import { useNavigate } from 'react-router-dom';

const CARD_COLORS = [
  'from-purple-400 to-purple-600',
  'from-pink-400 to-pink-600',
  'from-blue-400 to-blue-600',
  'from-green-400 to-green-600',
];

export default function ChildCard({ child, index, onDelete }) {
  const navigate = useNavigate();
  const colorClass = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <div className={`bg-gradient-to-br ${colorClass} rounded-3xl p-6 text-white shadow-lg
                     transform transition-transform hover:scale-105`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="text-5xl">{child.avatar || '😊'}</div>
        <div>
          <h3 className="text-xl font-bold">{child.name}</h3>
          <p className="text-white/80 text-sm">{child.age} лет</p>
        </div>
      </div>

      <div className="bg-white/20 rounded-2xl p-3 mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-semibold">⭐ Опыт (XP)</span>
          <span className="font-bold text-warning">{child.totalXp} XP</span>
        </div>
        <div className="bg-white/30 rounded-full h-2">
          <div
            className="bg-warning rounded-full h-2 transition-all duration-500"
            style={{ width: `${Math.min((child.totalXp % 100), 100)}%` }}
          />
        </div>
        <p className="text-xs text-white/70 mt-1">
          Уровень {Math.floor(child.totalXp / 100) + 1}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/learn/${child.id}`)}
          className="btn-kids flex-1 bg-white text-purple-600 hover:bg-purple-50 text-base"
        >
          🎮 Учиться!
        </button>
        <button
          onClick={() => onDelete(child.id)}
          className="btn-kids bg-white/20 hover:bg-white/30 text-base px-4"
          title="Удалить профиль"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
