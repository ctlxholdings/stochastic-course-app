'use client';

import { useState } from 'react';
import { Quiz, QuizQuestion } from '@/types';

interface QuizContainerProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
}

export default function QuizContainer({ quiz, onComplete }: QuizContainerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | boolean | null>(null);
  const [numericalInput, setNumericalInput] = useState('');

  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  const handleSelectAnswer = (answer: string | boolean) => {
    setSelectedAnswer(answer);
    setShowExplanation(false);
  };

  const handleNumericalSubmit = () => {
    const value = parseFloat(numericalInput);
    if (!isNaN(value)) {
      setSelectedAnswer(value);
      setShowExplanation(false);
    }
  };

  const checkAnswer = (): boolean => {
    if (selectedAnswer === null) return false;

    if (question.type === 'numerical' && question.tolerance !== undefined) {
      const numAnswer = selectedAnswer as number;
      const correct = question.correctAnswer as number;
      return Math.abs(numAnswer - correct) <= question.tolerance;
    }

    return selectedAnswer === question.correctAnswer;
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setAnswers(prev => ({ ...prev, [question.id]: selectedAnswer }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate final score
      const correctCount = quiz.questions.reduce((count, q) => {
        const answer = answers[q.id];
        if (answer === undefined && selectedAnswer !== null && q.id === question.id) {
          // Include current answer
          if (q.type === 'numerical' && q.tolerance !== undefined) {
            return count + (Math.abs((selectedAnswer as number) - (q.correctAnswer as number)) <= q.tolerance ? 1 : 0);
          }
          return count + (selectedAnswer === q.correctAnswer ? 1 : 0);
        }
        if (answer === undefined) return count;
        if (q.type === 'numerical' && q.tolerance !== undefined) {
          return count + (Math.abs((answer as number) - (q.correctAnswer as number)) <= q.tolerance ? 1 : 0);
        }
        return count + (answer === q.correctAnswer ? 1 : 0);
      }, 0);

      const score = Math.round((correctCount / totalQuestions) * 100);
      setShowResults(true);
      onComplete(score);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setNumericalInput('');
    }
  };

  if (showResults) {
    const correctCount = quiz.questions.reduce((count, q) => {
      const answer = answers[q.id];
      if (answer === undefined) return count;
      if (q.type === 'numerical' && q.tolerance !== undefined) {
        return count + (Math.abs((answer as number) - (q.correctAnswer as number)) <= q.tolerance ? 1 : 0);
      }
      return count + (answer === q.correctAnswer ? 1 : 0);
    }, 0);
    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= quiz.passingScore;

    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
        <div className={`text-6xl mb-4`}>
          {passed ? '🎉' : '📚'}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {passed ? 'Quiz Passed!' : 'Keep Learning'}
        </h3>
        <p className="text-gray-700 text-lg mb-4">
          You scored <span className={passed ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{score}%</span>
          {' '}({correctCount}/{totalQuestions} correct)
        </p>
        <p className="text-gray-500 text-sm">
          {passed
            ? 'Great job! You\'ve mastered this lesson.'
            : `You need ${quiz.passingScore}% to pass. Review the material and try again.`}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
      {/* Progress */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 text-sm">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <div className="flex gap-1">
          {quiz.questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx < currentQuestion
                  ? 'bg-coral'
                  : idx === currentQuestion
                  ? 'bg-coral/60'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <h4 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h4>

      {/* Answer Options */}
      <div className="space-y-2 mb-4">
        {question.type === 'multiple-choice' && question.options && (
          question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectAnswer(option)}
              disabled={showExplanation}
              className={`w-full text-left p-3 rounded-lg transition-colors border ${
                showExplanation
                  ? option === question.correctAnswer
                    ? 'bg-green-50 border-green-500 text-green-800'
                    : selectedAnswer === option
                    ? 'bg-red-50 border-red-500 text-red-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                  : selectedAnswer === option
                  ? 'bg-coral/10 border-coral text-gray-900'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span>{option}</span>
            </button>
          ))
        )}

        {question.type === 'true-false' && (
          <>
            <button
              onClick={() => handleSelectAnswer(true)}
              disabled={showExplanation}
              className={`w-full text-left p-3 rounded-lg transition-colors border ${
                showExplanation
                  ? question.correctAnswer === true
                    ? 'bg-green-50 border-green-500 text-green-800'
                    : selectedAnswer === true
                    ? 'bg-red-50 border-red-500 text-red-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                  : selectedAnswer === true
                  ? 'bg-coral/10 border-coral text-gray-900'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span>True</span>
            </button>
            <button
              onClick={() => handleSelectAnswer(false)}
              disabled={showExplanation}
              className={`w-full text-left p-3 rounded-lg transition-colors border ${
                showExplanation
                  ? question.correctAnswer === false
                    ? 'bg-green-50 border-green-500 text-green-800'
                    : selectedAnswer === false
                    ? 'bg-red-50 border-red-500 text-red-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                  : selectedAnswer === false
                  ? 'bg-coral/10 border-coral text-gray-900'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span>False</span>
            </button>
          </>
        )}

        {question.type === 'numerical' && (
          <div className="flex gap-2">
            <input
              type="number"
              step="any"
              value={numericalInput}
              onChange={(e) => setNumericalInput(e.target.value)}
              disabled={showExplanation}
              placeholder="Enter your answer"
              className="flex-1 bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral"
            />
            {!showExplanation && (
              <button
                onClick={handleNumericalSubmit}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg border border-gray-200"
              >
                Set
              </button>
            )}
          </div>
        )}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`p-4 rounded-lg mb-4 ${checkAnswer() ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-medium mb-1 ${checkAnswer() ? 'text-green-700' : 'text-red-700'}`}>
            {checkAnswer() ? 'Correct!' : 'Incorrect'}
          </p>
          <p className="text-gray-600 text-sm">{question.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {!showExplanation ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="flex-1 bg-coral hover:bg-coral-dark disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 bg-coral hover:bg-coral-dark text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}
