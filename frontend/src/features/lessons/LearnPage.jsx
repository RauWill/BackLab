import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lessonService from './lesson.service';
import childService from '../dashboard/child.service';

export default function LearnPage() {
  const { childId } = useParams();
  const navigate = useNavigate();

  const [units, setUnits] = useState([]);
  const [child, setChild] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [childId]);

  const loadData = async () => {
    try {
      const [unitsData, childData, progressData] = await Promise.all([
        lessonService.getAllUnits(),
        childService.getById(parseInt(childId)),
        lessonService.getChildProgress(parseInt(childId)),
      ]);
      setUnits(unitsData);
      setChild(childData);
      setProgress(progressData);
    } finally {
      setLoading(false);
    }
  };

  const isCompleted = (lessonId) =>
    progress.some((p) => p.lessonId === lessonId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-bounce">🚀</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-2"
        >
          ← Назад
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 flex items-center gap-4">
          <div className="text-5xl">{child?.avatar || '😊'}</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{child?.name}</h1>
            <p className="text-warning font-bold text-lg">⭐ {child?.totalXp} XP</p>
          </div>
        </div>

        <div className="space-y-6">
          {units.map((unit) => (
            <div key={unit.id} className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-purple-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">{unit.title}</h2>
                {unit.description && (
                  <p className="text-white/70 text-sm">{unit.description}</p>
                )}
              </div>

              <div className="p-4 space-y-3">
                {unit.lessons.map((lesson, index) => {
                  const done = isCompleted(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => navigate(`/learn/${childId}/lesson/${lesson.id}`)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl
                                  transition-all text-left active:scale-98
                                  ${done
                                    ? 'bg-green-50 border-2 border-green-200'
                                    : 'bg-gray-50 border-2 border-gray-100 hover:border-primary hover:bg-purple-50'
                                  }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                        ${done ? 'bg-success text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {done ? '✓' : index + 1}
                      </div>

                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{lesson.title}</p>
                        <p className="text-sm text-gray-400">
                          {lesson.exercises?.length || 0} упражнений
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-warning font-bold">+{lesson.xpReward} XP</span>
                        {done && <p className="text-green-500 text-xs">Пройдено!</p>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
