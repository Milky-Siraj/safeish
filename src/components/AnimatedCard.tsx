import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg p-8 shadow-lg border-t-4 border-green-700 hover:transform hover:-translate-y-2 transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <motion.div 
        className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 15px rgba(68, 117, 81, 0.5)",
        }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default AnimatedCard;