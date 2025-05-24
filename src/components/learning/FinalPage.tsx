import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Award, Home, RefreshCw } from 'lucide-react';
import Layout from '../layout/Layout';
import { useAuth } from '../../context/AuthContext';

const FinalPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleRestart = () => {
    navigate('/dashboard');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout showHeader={true} showFooter={false}>
      <div className="page-content">
        <div className="w-full max-w-xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex justify-center mb-6">
              <Award size={80} className="text-green-300" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-300 to-blue-700 bg-clip-text text-transparent">
              Well done! You're amazing!
            </h1>
            <p className="text-xl text-gray-300">
              You've completed this learning session successfully.
              Continue practicing to master sign language!
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-bg-medium p-6 rounded-xl border border-gray-700 mb-10"
          >
            <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
            <div className="space-y-4 text-left mb-6">
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <p className="text-gray-300">
                  Practice regularly with the Quiz and Practice modes to reinforce your learning.
                </p>
              </div>
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <p className="text-gray-300">
                  Use the Dictionary feature to look up signs whenever you need a refresher.
                </p>
              </div>
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <p className="text-gray-300">
                  Try to incorporate what you've learned into your daily life to build fluency.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="outline" 
                onClick={handleRestart}
                icon={<RefreshCw size={18} />}
                className="sm:w-1/2"
              >
                Start Again
              </Button>
              
              <Button 
                variant="primary" 
                onClick={() => navigate('/dashboard')}
                icon={<Home size={18} />}
                className="sm:w-1/2"
              >
                Dashboard
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button 
              onClick={handleLogout}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Logout
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default FinalPage;