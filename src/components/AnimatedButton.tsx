import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  onClick, 
  primary = true,
  className = ""
}) => {
  const baseClasses = "px-8 py-3 text-lg font-medium rounded-md transition-colors flex items-center justify-center";
  const primaryClasses = "bg-yellow-500 text-gray-900 hover:bg-yellow-400";
  const secondaryClasses = "bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-700";
  
  const buttonClasses = `${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`;

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        opacity: { duration: 0.2 }
      }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;