import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { DotSquare as AlphabetSquare, BookOpen, MessageCircle, Lock } from 'lucide-react';
import Layout from '../layout/Layout';
import useLocalStorage from '../../hooks/useLocalStorage';
import { UserPreferences } from '../../types';

const CategorySelector: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('preferences', {
    reason: 'fun',
    goalTime: 5,
    selectedCategory: 'alphabets',
  });

  const handleCategorySelect = (category: 'alphabets' | 'communication' | 'words') => {
    if (category !== 'alphabets') {
      // For coming soon categories, just show an alert
      alert(`${category.charAt(0).toUpperCase() + category.slice(1)} learning is coming soon!`);
      return;
    }
    
    setPreferences({
      ...preferences,
      selectedCategory: category,
    });
    
    navigate('/mode-selector');
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
            <h1 className="text-3xl font-bold mb-3">Choose a Category</h1>
            <p className="text-gray-300">
              Select what you'd like to learn today
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
                onClick={() => handleCategorySelect('alphabets')}
                className="border border-primary"
              >
                <div className="flex flex-col items-center p-6 text-center">
                  <AlphabetSquare size={48} className="mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Alphabets</h3>
                  <p className="text-gray-300 mb-4">
                    Learn the manual alphabet signs for A-Z
                  </p>
                  <Button variant="primary" className="mt-auto">
                    Start Learning
                  </Button>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="border border-gray-700 opacity-75">
                <div className="flex flex-col items-center p-6 text-center relative">
                  <div className="absolute right-3 top-3">
                    <Lock size={20} className="text-gray-500" />
                  </div>
                  <MessageCircle size={48} className="mb-4 text-gray-500" />
                  <h3 className="text-xl font-semibold mb-2">Communication</h3>
                  <p className="text-gray-400 mb-4">
                    Learn common phrases and conversation basics
                  </p>
                  <div className="bg-accent bg-opacity-20 text-accent px-3 py-1 rounded-full text-sm mt-auto">
                    Coming Soon
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="border border-gray-700 opacity-75">
                <div className="flex flex-col items-center p-6 text-center relative">
                  <div className="absolute right-3 top-3">
                    <Lock size={20} className="text-gray-500" />
                  </div>
                  <BookOpen size={48} className="mb-4 text-gray-500" />
                  <h3 className="text-xl font-semibold mb-2">Words</h3>
                  <p className="text-gray-400 mb-4">
                    Learn signs for common words and expand your vocabulary
                  </p>
                  <div className="bg-accent bg-opacity-20 text-accent px-3 py-1 rounded-full text-sm mt-auto">
                    Coming Soon
                  </div>
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
              onClick={() => navigate('/dashboard')}
              className="px-8"
            >
              Back to Dashboard
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default CategorySelector;