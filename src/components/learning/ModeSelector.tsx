import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { BookOpen, BrainCircuit, CheckSquare } from 'lucide-react';
import Layout from '../layout/Layout';
import useLocalStorage from '../../hooks/useLocalStorage';
import { UserPreferences } from '../../types';

const ModeSelector: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('preferences', {
    reason: 'fun',
    goalTime: 5,
    selectedCategory: 'alphabets',
  });

  const handleModeSelect = (mode: 'learn' | 'quiz' | 'practice') => {
    setPreferences({
      ...preferences,
      selectedMode: mode,
    });
    
    if (mode === 'learn') {
      navigate('/learn');
    } else if (mode === 'quiz') {
      navigate('/quiz');
    } else if (mode === 'practice') {
      navigate('/practice');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-custom">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold mb-3">Choose a Learning Mode🧠</h1>
            <p className="text-gray-300">
              Select how you want to learn {preferences.selectedCategory}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            <motion.div variants={itemVariants}>
              <Card
                animate={true}
                onClick={() => handleModeSelect('learn')}
                className="border border-green-300"
              >
                <div className="flex flex-col items-center p-6 text-center h-full">
                  <BookOpen size={48} className="mb-4 text-green-300" />
                  <h3 className="text-xl font-semibold mb-2">Learn Mode</h3>
                  <p className="text-gray-300 mb-4">
                    Study signs one by one with detailed explanations
                  </p>
                  <Button variant="primary" className="mt-auto">
                    Start Learning
                  </Button>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card
                animate={true}
                onClick={() => handleModeSelect('quiz')}
                className="border border-teal-500"
              >
                <div className="flex flex-col items-center p-6 text-center h-full">
                  <CheckSquare size={48} className="mb-4 text-teal-500" />
                  <h3 className="text-xl font-semibold mb-2">Quiz Mode</h3>
                  <p className="text-gray-300 mb-4">
                    Test your knowledge with multiple-choice questions
                  </p>
                  <Button variant="primary" className="mt-auto">
                    Take Quiz
                  </Button>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card
                animate={true}
                onClick={() => handleModeSelect('practice')}
                className="border border-blue-700"
              >
                <div className="flex flex-col items-center p-6 text-center h-full">
                  <BrainCircuit size={48} className="mb-4 text-blue-700" />
                  <h3 className="text-xl font-semibold mb-2">Practice Mode</h3>
                  <p className="text-gray-300 mb-4">
                    Use your webcam to practice signs with real-time feedback
                  </p>
                  <Button variant="primary" className="mt-auto">
                    Start Practice
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center"
          >
            <Button 
              variant="outline" 
              onClick={() => navigate('/category-selector')}
              className="px-8"
            >
              Back to Categories
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ModeSelector;