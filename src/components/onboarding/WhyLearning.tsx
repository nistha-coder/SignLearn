import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { ArrowRight, Brain, Briefcase, Heart, PenTool } from 'lucide-react';
import Layout from '../layout/Layout';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LearningReason, UserPreferences } from '../../types';

const reasons = [
  { id: 'fun', label: 'For Fun', icon: <PenTool size={24} className="text-green-300" /> },
  { id: 'business', label: 'Business', icon: <Briefcase size={24} className="text-teal-500" /> },
  { id: 'communication', label: 'Communication', icon: <Heart size={24} className="text-blue-700" /> },
  { id: 'other', label: 'Other', icon: <Brain size={24} className="text-primary" /> },
];

const WhyLearning: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('preferences', {
    reason: 'fun',
    goalTime: 5,
    selectedCategory: 'alphabets',
  });
  
  const [selected, setSelected] = useState<LearningReason>(preferences.reason);

  const handleReasonSelect = (reason: LearningReason) => {
    setSelected(reason);
  };

  const handleNext = () => {
    setPreferences({
      ...preferences,
      reason: selected,
    });
    navigate('/onboarding/benefits');
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
            <h1 className="text-3xl font-bold mb-3">Why are you learning sign language?</h1>
            <p className="text-gray-300">
              This helps us personalize your learning experience
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
          >
            {reasons.map((reason) => (
              <Card
                key={reason.id}
                animate={true}
                className={`p-6 ${
                  selected === reason.id 
                    ? 'border-2 border-primary bg-opacity-20 bg-primary' 
                    : 'border border-gray-700'
                }`}
                onClick={() => handleReasonSelect(reason.id as LearningReason)}
              >
                <div className="flex items-center">
                  <div className="mr-4">{reason.icon}</div>
                  <span className="text-lg font-medium">{reason.label}</span>
                </div>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center"
          >
            <Button 
              variant="primary" 
              onClick={handleNext}
              icon={<ArrowRight size={18} />}
              className="px-8"
            >
              Next
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default WhyLearning;