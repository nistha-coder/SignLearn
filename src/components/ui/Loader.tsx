import React from 'react';
import { motion } from 'framer-motion';
import { HandMetal } from 'lucide-react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }}
        className="mb-4"
      >
        <HandMetal size={48} className="text-primary" />
      </motion.div>
      <p className="text-gray-400">{message}</p>
    </div>
  );
};

export default Loader;