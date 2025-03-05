import React, { useState } from 'react';
import { X, CreditCard, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import TelebirrPayment from './TelebirrPayment';

interface DepositWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdraw';
}

const DepositWithdrawModal: React.FC<DepositWithdrawModalProps> = ({ isOpen, onClose, type }) => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('telebirr');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const validateAmount = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (type === 'withdraw') {
      // For withdraw, we could check against available balance
      // This is a placeholder - in a real app, you'd check against actual balance
      const availableBalance = 25000; // Example balance
      if (Number(amount) > availableBalance) {
        newErrors.amount = 'Insufficient balance';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleProceed = () => {
    if (validateAmount()) {
      setStep(2);
    }
  };
  
  const handlePaymentSuccess = () => {
    // In a real app, you would update the user's balance here
    onClose();
    // Show success notification or redirect
  };
  
  const resetModal = () => {
    setAmount('');
    setPaymentMethod('telebirr');
    setStep(1);
    setErrors({});
  };
  
  const handleClose = () => {
    resetModal();
    onClose();
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">
                {type === 'deposit' ? t('depositFunds') : t('withdrawFunds')}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            {step === 1 ? (
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('amount')} (ETB)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter amount"
                    min="1"
                  />
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('paymentMethod')}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`border rounded-md p-4 flex flex-col items-center cursor-pointer transition-colors ${
                        paymentMethod === 'telebirr' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                      onClick={() => setPaymentMethod('telebirr')}
                    >
                      <Smartphone size={24} className="text-green-700 mb-2" />
                      <span className="text-sm font-medium">{t('telebirrPayment')}</span>
                    </div>
                    <div
                      className={`border rounded-md p-4 flex flex-col items-center cursor-pointer transition-colors ${
                        paymentMethod === 'bank' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <CreditCard size={24} className="text-green-700 mb-2" />
                      <span className="text-sm font-medium">{t('bankTransfer')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={handleProceed}
                    className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
                  >
                    {t('proceed')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {paymentMethod === 'telebirr' ? (
                  <TelebirrPayment
                    amount={Number(amount)}
                    onSuccess={handlePaymentSuccess}
                    onCancel={handleClose}
                  />
                ) : (
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-4">Bank Transfer Details</h3>
                    <div className="bg-gray-100 p-4 rounded-md text-left mb-6">
                      <p className="mb-2"><span className="font-medium">Bank:</span> Commercial Bank of Ethiopia</p>
                      <p className="mb-2"><span className="font-medium">Account Name:</span> Safe Trade Ethiopia</p>
                      <p className="mb-2"><span className="font-medium">Account Number:</span> 1000123456789</p>
                      <p className="mb-2"><span className="font-medium">Amount:</span> ETB {Number(amount).toLocaleString()}</p>
                      <p><span className="font-medium">Reference:</span> Your registered phone number</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                      Please make the transfer and upload your receipt. Our team will verify and credit your account within 24 hours.
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={handleClose}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        {t('cancel')}
                      </button>
                      <button
                        onClick={handlePaymentSuccess}
                        className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
                      >
                        I've Made the Transfer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DepositWithdrawModal;