import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Smartphone, Apple, PlayCircle } from 'lucide-react';

const AppDownload: React.FC = () => {
  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-lg p-4 w-64"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Smartphone className="text-green-700 mr-2" size={24} />
            <h3 className="font-semibold text-gray-900">Get Our App</h3>
          </div>
          <div className="flex space-x-2">
            <Apple size={20} className="text-gray-600" />
            <PlayCircle size={20} className="text-gray-600" />
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <QRCodeSVG 
            value="https://safetradeethiopia.com/app"
            size={150}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: "https://example.com/logo.png",
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        </div>

        <p className="text-sm text-gray-600 text-center mb-2">
          Scan to download our mobile app
        </p>

        <div className="flex justify-center space-x-2">
          <a 
            href="#" 
            className="text-xs text-green-700 hover:text-green-800 underline"
          >
            App Store
          </a>
          <span className="text-gray-400">|</span>
          <a 
            href="#" 
            className="text-xs text-green-700 hover:text-green-800 underline"
          >
            Play Store
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AppDownload;