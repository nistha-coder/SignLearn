// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { HandMetal } from 'lucide-react';
import Layout from '../layout/Layout';

const GetStarted: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout showHeader={false} showFooter={false}>
      <div className="page-content">
        <div className="w-full max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-4">
              <HandMetal size={80} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2 text-white">SignLearn</h1>
            <p className="text-xl text-gray-300 mb-7 italic">
              Speak with Your Hands – The Fun Way to Learn Sign Language!
            </p>
          </motion.div>

            <div className="w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden">
  <img
    src="https://media.giphy.com/media/bcKmIWkUMCjVm/giphy.gif"
    alt="Animated Hand Waving"
    className="w-full h-full object-cover"
  />
</div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4"
          >
            <Button 
              variant="primary" 
              fullWidth 
              onClick={() => navigate('/onboarding/welcome')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => navigate('/login')}
            >
              Already have an account
            </Button>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 text-gray-400 text-sm"
          >
            By continuing, you agree to our Terms and Privacy Policy
          </motion.p>
        </div>
      </div>
    </Layout>
  );
};

export default GetStarted;