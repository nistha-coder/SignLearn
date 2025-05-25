// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
// import { ArrowRight } from 'lucide-react';
import Layout from '../layout/Layout';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout showHeader={true} showFooter={false}>
      <div className="page-content">
        <div className="w-full max-w-lg mx-auto text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-300 to-blue-700 bg-clip-text text-transparent">
              Welcome to SignLearn!
            </h1>
            <p className="text-lg text-gray-300">
              Unlock the power of your hands — connect, communicate, and express like never before!
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-10"
          >
            <div className="w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden">
              <img 
                src="https://i.giphy.com/LY8yDak6Tngb6FfPrt.webp" 
                alt="Animated Hand Waving" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-300 italic">
              Sign language opens up a whole new world of communication and connection. 
              Let's start this journey together!
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button 
              variant="primary" 
              onClick={() => navigate('/onboarding/why-learning')}
              // icon={<ArrowRight size={18} />}
              // className="px-8"
            >→ Next
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;