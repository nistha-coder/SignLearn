import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight, Brain, Globe, Heart, Users } from 'lucide-react';
import Layout from '../layout/Layout';

const benefits = [
  {
    icon: <Users size={32} className="text-green-300" />,
    title: 'Better Communication',
    description: 'Connect with the deaf and hard-of-hearing community directly.',
  },
  {
    icon: <Brain size={32} className="text-teal-500" />,
    title: 'Cognitive Benefits',
    description: 'Improve your spatial awareness and memory capabilities.',
  },
  {
    icon: <Globe size={32} className="text-blue-700" />,
    title: 'Cultural Awareness',
    description: 'Gain insight into deaf culture and expand your worldview.',
  },
  {
    icon: <Heart size={32} className="text-primary" />,
    title: 'Emotional Intelligence',
    description: 'Develop deeper empathy and understanding for others.',
  },
];

const Benefits: React.FC = () => {
  const navigate = useNavigate();

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
    <Layout showHeader={true} showFooter={false}>
      <div className="page-content">
        <div className="w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold mb-3">Benefits of Learning Sign Language</h1>
            <p className="text-gray-300">
              Discover how sign language can enrich your life and benefit society
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-bg-medium p-6 rounded-lg border border-gray-700"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center"
          >
            <Button 
              variant="primary" 
              onClick={() => navigate('/onboarding/goal-time')}
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

export default Benefits;