import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import {  Clock } from 'lucide-react';
import Layout from '../layout/Layout';
import useLocalStorage from '../../hooks/useLocalStorage';
import { GoalTimeMinutes, UserPreferences } from '../../types';

const timeOptions: GoalTimeMinutes[] = [5, 10, 15, 20, 30];

const GoalTime: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('preferences', {
    reason: 'fun',
    goalTime: 5,
    selectedCategory: 'alphabets',
  });
  
  const [selected, setSelected] = useState<GoalTimeMinutes>(preferences.goalTime);

  const handleTimeSelect = (time: GoalTimeMinutes) => {
    setSelected(time);
  };

  const handleNext = () => {
    setPreferences({
      ...preferences,
      goalTime: selected,
    });
    navigate('/signup');
  };

  return (
    <Layout showHeader={true} showFooter={false}>
      <div className="page-content">
        <div className="w-full max-w-xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold mb-3">Set Your Daily Goal⏳</h1>
            <p className="text-gray-300 italic">
              How much time can you dedicate to learning sign language each day?
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10"
          >
            {timeOptions.map((time) => (
              <Card
                key={time}
                animate={true}
                className={`p-6 text-center ${
                  selected === time 
                    ? 'border-2 border-primary bg-opacity-20 bg-primary' 
                    : 'border border-gray-700'
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                <div className="flex flex-col items-center justify-center">
                  <Clock size={24} className="mb-2 text-teal-500" />
                  <span className="text-2xl font-bold">{time}</span>
                  <span className="text-sm text-gray-300">minutes</span>
                </div>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-gray-400">
              You can always change this later in your profile settings.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-center"
          >
            <Button 
              variant="primary" 
              onClick={handleNext}
              
            >
              → Next
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default GoalTime;