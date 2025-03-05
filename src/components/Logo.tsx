import React from 'react';
import { Shield, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
    <motion.div 
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Shield size={32} className="text-green-700" />
      <Handshake size={16} className="text-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
};

export default Logo;