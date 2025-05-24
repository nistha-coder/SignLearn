import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import Layout from '../layout/Layout';
import Loader from '../ui/Loader';
import { quizQuestions } from '../../data/quizQuestions';
import { QuizQuestion, QuizResult } from '../../types';

const QuizMode: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setShuffledQuestions(shuffled);
    setIsLoading(false);
    setStartTime(Date.now());
  }, []);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      if (isCorrect) setScore((prev) => prev + 1);
      setIsAnswerSubmitted(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      const result: QuizResult = {
        totalQuestions: shuffledQuestions.length,
        correctAnswers: score,
        timeTaken,
      };
      localStorage.setItem('quizResult', JSON.stringify(result));
      navigate('/quiz-results');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="page-content">
          <div className="container-custom">
            <Loader message="Loading quiz questions..." />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-content">
        <div className="container-custom">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-3">Alphabet Signs Quiz</h1>
            <p className="text-gray-300">Test your knowledge of sign language alphabets</p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="bg-bg-medium p-6 rounded-xl border border-gray-700 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-primary">
                    Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
                  </span>
                  <span className="text-lg font-semibold text-green-300">Score: {score}</span>
                </div>

                <div className="text-xl font-bold mb-6">{currentQuestion.question}</div>

                <div className="w-full h-64 rounded-lg overflow-hidden mb-6 bg-gray-800 flex items-center justify-center">
                  <video src={currentQuestion.imageUrl} autoPlay loop muted width="300" className="h-full object-contain" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.options.map((option) => {
                    const isCorrectAnswer = option === currentQuestion.correctAnswer;
                    const isSelectedWrong = selectedAnswer === option && !isCorrectAnswer;

                    let cardClasses = 'border border-gray-700';
                    if (isAnswerSubmitted) {
                      if (isCorrectAnswer) {
                        cardClasses = 'border-2 border-success bg-success bg-opacity-20';
                      } else if (isSelectedWrong) {
                        cardClasses = 'border-2 border-error bg-error bg-opacity-20';
                      }
                    } else if (selectedAnswer === option) {
                      cardClasses = 'border-2 border-primary';
                    }

                    return (
                      <Card
                        key={option}
                        onClick={() => handleAnswerSelect(option)}
                        className={`p-4 text-center cursor-pointer ${cardClasses}`}
                        animate={!isAnswerSubmitted}
                      >
                        <div className="flex items-center justify-center">
                          {isAnswerSubmitted && isCorrectAnswer && (
                            <CheckCircle size={18} className="mr-2 text-success" />
                          )}
                          {isAnswerSubmitted && isSelectedWrong && (
                            <XCircle size={18} className="mr-2 text-error" />
                          )}
                          <span className="text-lg font-medium">{option}</span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center">
                {!isAnswerSubmitted ? (
                  <Button
                    variant="primary"
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    className="w-full"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    className="w-full"
                    icon={<ArrowRight size={18} className="ml-2" />}
                  >
                    {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question' : 'See Results'}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuizMode;
