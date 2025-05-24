import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animate?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  animate = false 
}) => {
  const baseComponent = (
    <div 
      className={`card ${className} ${onClick ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`card ${className} ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return baseComponent;
};

export default Card;