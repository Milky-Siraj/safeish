import React, { useState } from 'react';
import { Smartphone, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

interface TelebirrPaymentProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const TelebirrPayment: React.FC<TelebirrPaymentProps> = ({ amount, onSuccess, onCancel }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmitPhone = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call to Telebirr
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };
  
  const handleConfirmPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment confirmation
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-center mb-6">
        <Smartphone size={24} className="text-green-700 mr-2" />
        <h2 className="text-xl font-bold">Telebirr Payment</h2>
      </div>
      
      {/* Step 1: Enter Phone Number */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <p className="text-gray-600 mb-4 text-center">
            Enter your Telebirr registered phone number to proceed with the payment.
          </p>
          
          <form onSubmit={handleSubmitPhone}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., 0911234567"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your phone number without the country code
              </p>
            </div>
            
            <div className="bg-gray-100 rounded-md p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold">ETB {amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fee:</span>
                <span className="font-bold">ETB 0.00</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 flex items-center"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Continue <ArrowRight size={16} className="ml-1" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}
      
      {/* Step 2: Confirm on Phone */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center"
        >
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
            <p className="text-yellow-700">
              A payment request has been sent to your Telebirr account. Please check your phone and confirm the payment.
            </p>
          </div>
          
          <div className="mb-6">
            <Smartphone size={64} className="text-green-700 mx-auto mb-4" />
            <p className="text-gray-600">
              Please check your Telebirr app and confirm the payment of <span className="font-bold">ETB {amount.toLocaleString()}</span>
            </p>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPayment}
              className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "I've Confirmed the Payment"
              )}
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Step 3: Success */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          >
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          </motion.div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-6">
            Your payment of <span className="font-bold">ETB {amount.toLocaleString()}</span> has been successfully processed.
          </p>
          
          <div className="bg-gray-100 rounded-md p-4 mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono">TBR{Math.floor(Math.random() * 1000000)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Date:</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-green-600 font-medium">Completed</span>
            </div>
          </div>
          
          <button
            onClick={onSuccess}
            className="w-full px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
          >
            Continue
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default TelebirrPayment;