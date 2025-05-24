import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { BookOpen, CheckCircle, Clock, Play } from 'lucide-react';
import Layout from '../layout/Layout';
import { useAuth } from '../../context/AuthContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import { UserPreferences } from '../../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [preferences] = useLocalStorage<UserPreferences>('preferences', {
    reason: 'fun',
    goalTime: 5,
    selectedCategory: 'alphabets',
  });

  const [startTime, setStartTime] = useLocalStorage<number | null>('startTime', null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useLocalStorage<boolean>('isTimerActive', false);
  const [goalCompleted, setGoalCompleted] = useLocalStorage<boolean>('goalCompleted', false);
  const [hasStarted, setHasStarted] = useLocalStorage<boolean>('hasStarted', false);

  useEffect(() => {
    let interval: number | undefined;

    if (isTimerActive && startTime) {
      interval = window.setInterval(() => {
        const now = Date.now();
        const newElapsed = Math.floor((now - startTime) / 1000);
        setElapsedTime(newElapsed);

        if (newElapsed >= preferences.goalTime * 60 && !goalCompleted) {
          setGoalCompleted(true);
          setIsTimerActive(false);
          alert("🎉 You've completed your goal for today!");
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, startTime, preferences.goalTime, goalCompleted, setGoalCompleted, setIsTimerActive]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (!isTimerActive) {
      if (!hasStarted) {
        // First time start
        setStartTime(Date.now());
        setHasStarted(true);
      } else {
        // Resume from pause
        const newStartTime = Date.now() - elapsedTime * 1000;
        setStartTime(newStartTime);
      }
    }
    setIsTimerActive(!isTimerActive);
  };

  const resetTimer = () => {
    setStartTime(null);
    setElapsedTime(0);
    setIsTimerActive(false);
    setGoalCompleted(false);
    setHasStarted(false);
  };

  const handleContinueLearning = () => {
    navigate('/category-selector');
  };

  const progress = Math.min((elapsedTime / (preferences.goalTime * 60)) * 100, 100);

  const getTimerButtonLabel = () => {
    if (!hasStarted) return 'Start';
    if (isTimerActive) return 'Pause';
    return 'Resume';
  };

  return (
    <Layout>
      <div className="page-content pt-8">
        <div className="container-custom">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name || 'Learner'}!
            </h1>
            <p className="text-gray-300">
              Track your progress and continue your sign language journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="md:col-span-2"
            >
              <Card className="h-full">
                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-semibold mb-4">Daily Goal</h2>
                  <div className="flex flex-col items-center justify-center flex-grow py-6">
                    <div className="w-48 h-48 relative mb-6 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#2d2d2d"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={goalCompleted ? '#76c893' : '#34a0a4'}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 45}
                          strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Clock size={28} className="mb-2 text-gray-300" />
                        <div className="text-3xl font-bold">{formatTime(elapsedTime)}</div>
                        <div className="text-sm text-gray-400 mt-1">
                          Goal: {preferences.goalTime} min
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        variant={isTimerActive ? 'secondary' : 'primary'}
                        onClick={toggleTimer}
                        className="w-32"
                      >
                        {getTimerButtonLabel()}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={resetTimer}
                        className="w-32"
                        disabled={elapsedTime === 0}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="h-full">
                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      <ProgressBar label="Alphabets" progress={12} count="3/26" />
                      <ProgressBar label="Quiz Score" progress={0} count="0%" />
                      <ProgressBar label="Practice" progress={0} count="0/3" />
                    </div>
                    <div className="mt-6">
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={handleContinueLearning}
                        icon={<Play size={18} />}
                      >
                        Continue Learning
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Learning Paths</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <LearningCard
                title="Learn Signs"
                description="Start learning sign language alphabets and words"
                onClick={() => navigate('/category-selector')}
                icon={<BookOpen size={32} className="mb-3 text-green-300" />}
                className="border border-green-400 bg-green-400 bg-opacity-10"
              />
              <LearningCard
                title="Dictionary"
                description="Look up signs for alphabets and common words"
                onClick={() => navigate('/dictionary')}
                icon={<BookOpen size={32} className="mb-3 text-teal-500" />}
                className="border border-teal-500 bg-teal-500 bg-opacity-10"
              />
              {goalCompleted && (
                <LearningCard
                  title="Goal Completed"
                  description={`You've reached your daily goal of ${preferences.goalTime} minutes!`}
                  icon={<CheckCircle size={32} className="mb-3 text-success" />}
                  className="border border-success bg-success bg-opacity-10"
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

const ProgressBar = ({
  label,
  count,
  progress,
}: {
  label: string;
  count: string;
  progress: number;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-300">{label}</span>
    <div className="flex items-center">
      <span className="text-sm mr-2">{count}</span>
      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  </div>
);

const LearningCard = ({
  title,
  description,
  icon,
  onClick,
  className,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <Card animate={true} onClick={onClick} className={className || ''}>
    <div className="flex flex-col items-center p-4 text-center">
      {icon}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </Card>
);

export default Dashboard;
