import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lessonService from './lesson.service';
import ExerciseCard from './ExerciseCard';

export default function LessonPage() {
  const { lessonId, childId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  const loadLesson = async () => {
    try {
      const data = await lessonService.getLessonById(parseInt(lessonId));
      setLesson(data);
    } catch (err) {
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (isCorrect) => {
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    const isLastExercise = currentIndex === lesson.exercises.length - 1;

    if (isLastExercise) {
      try {
        const result = await lessonService.completeLesson(parseInt(lessonId), parseInt(childId));
        setXpEarned(result.xpEarned);
      } catch (err) {
        setXpEarned(0);
      }
      setFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📖</div>
          <p className="text-gray-500">Загружаем урок...</p>
        </div>
      </div>
    );
  }

  if (finished) {
    const total = lesson.exercises.length;
    const percent = Math.round((score / total) * 100);

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full animate-bounce-in">
          <div className="text-7xl mb-4">
            {percent >= 80 ? '🏆' : percent >= 50 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Урок завершён!</h2>
          <p className="text-gray-500 mb-6">{lesson.title}</p>

          <div className="bg-purple-50 rounded-2xl p-4 mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Правильных ответов: <span className="text-primary">{score}/{total}</span>
            </p>
            <p className="text-4xl font-bold text-warning mt-2">
              +{xpEarned} XP ⭐
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="btn-kids w-full bg-primary text-white hover:bg-purple-700"
          >
            ← Вернуться к урокам
          </button>
        </div>
      </div>
    );
  }

  const currentExercise = lesson.exercises[currentIndex];
  const progress = ((currentIndex) / lesson.exercises.length) * 100;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-lg mx-auto mb-6">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
          <div className="flex-1 bg-gray-200 rounded-full h-4">
            <div
              className="bg-primary rounded-full h-4 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-500 font-semibold">
            {currentIndex + 1}/{lesson.exercises.length}
          </span>
        </div>
        <h1 className="text-xl font-bold text-gray-700 text-center">{lesson.title}</h1>
      </div>

      <ExerciseCard
        key={currentIndex}
        exercise={currentExercise}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
