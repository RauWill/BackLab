import { useState } from 'react';

export default function ExerciseCard({ exercise, onAnswer }) {
  const [selected, setSelected] = useState(null);  // Выбранный ответ
  const [answered, setAnswered] = useState(false);  // Уже ответили?

  const options = JSON.parse(exercise.options);

  const handleSelect = (option) => {

    setSelected(option);
    setAnswered(true);

    const isCorrect = option === exercise.correctAnswer;

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1000);
  };

  const getButtonStyle = (option) => {
    if (!answered) {
      return 'bg-white border-4 border-gray-200 text-gray-800 hover:border-primary hover:bg-purple-50';
    }
    if (option === exercise.correctAnswer) {
      return 'bg-success border-4 border-green-400 text-white animate-bounce';
    }
    if (option === selected) {
      return 'bg-danger border-4 border-red-400 text-white';
    }
    return 'bg-gray-100 border-4 border-gray-200 text-gray-400';
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
        {exercise.question}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            disabled={answered}
            className={`min-h-[64px] px-4 py-4 rounded-2xl font-bold text-xl
                        transition-all duration-200 active:scale-95 cursor-pointer
                        shadow-md ${getButtonStyle(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
      {answered && (
        <div className={`mt-6 text-center text-2xl font-bold animate-bounce-in
          ${selected === exercise.correctAnswer ? 'text-success' : 'text-danger'}`}>
          {selected === exercise.correctAnswer ? '🎉 Отлично!' : '💪 Попробуй ещё!'}
        </div>
      )}
    </div>
  );
}
