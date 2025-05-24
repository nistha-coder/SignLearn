import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight, Award, Clock, RefreshCcw } from 'lucide-react';
import Layout from '../layout/Layout';
import { QuizResult } from '../../types';

const QuizResults: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResult | null>(null);
  
  useEffect(() => {
    const storedResults = localStorage.getItem('quizResult');
    
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);
  
  const calculatePercentage = () => {
    if (!results) return 0;
    return Math.round((results.correctAnswers / results.totalQuestions) * 100);
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const handleRetakeQuiz = () => {
    navigate('/quiz');
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  if (!results) {
    return (
      <Layout>
        <div className="page-content">
          <div className="container-custom text-center">
            <h1 className="text-3xl font-bold mb-4">No Quiz Results Found</h1>
            <p className="text-gray-300 mb-6">
              You haven't completed a quiz yet.
            </p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/quiz')}
            >
              Take a Quiz
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const percentage = calculatePercentage();
  
  let message = '';
  let messageColor = '';
  
  if (percentage >= 80) {
    message = 'Excellent! You\'re mastering sign language!';
    messageColor = 'text-green-300';
  } else if (percentage >= 60) {
    message = 'Good job! Keep practicing to improve!';
    messageColor = 'text-teal-500';
  } else {
    message = 'Keep learning and try again!';
    messageColor = 'text-primary';
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
            <h1 className="text-3xl font-bold mb-3">Quiz Results</h1>
            <p className={`text-xl font-medium ${messageColor}`}>
              {message}
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-bg-medium p-6 rounded-xl border border-gray-700 mb-8">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 relative mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#2d2d2d"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={percentage >= 80 ? '#76c893' : percentage >= 60 ? '#34a0a4' : '#1e6091'}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 45}
                      strokeDashoffset={2 * Math.PI * 45 * (1 - percentage / 100)}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{percentage}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <Award size={24} className="text-primary mr-2" />
                  <span className="text-xl font-semibold">
                    {results.correctAnswers} of {results.totalQuestions} correct
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-6 flex justify-center">
                <div className="flex items-center">
                  <Clock size={20} className="text-gray-400 mr-2" />
                  <span className="text-lg text-gray-300">
                    Time taken: {formatTime(results.timeTaken)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="outline" 
                onClick={handleRetakeQuiz}
                icon={<RefreshCcw size={18} />}
                className="sm:w-1/2"
              >
                Retake Quiz
              </Button>
              
              <Button 
                variant="primary" 
                onClick={handleContinue}
                icon={<ArrowRight size={18} className="ml-2" />}
                className="sm:w-1/2 flex flex-row-reverse justify-center"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default QuizResults;