import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const { t } = useLanguage();
  
  // Password strength criteria
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  
  // Calculate overall strength
  const criteria = [hasMinLength, hasNumber, hasSpecialChar, hasUpperCase];
  const strengthPercentage = (criteria.filter(Boolean).length / criteria.length) * 100;
  
  // Determine color based on strength
  let strengthColor = 'bg-red-500';
  if (strengthPercentage >= 75) strengthColor = 'bg-green-500';
  else if (strengthPercentage >= 50) strengthColor = 'bg-yellow-500';
  else if (strengthPercentage >= 25) strengthColor = 'bg-orange-500';
  
  return (
    <div className="mt-2 space-y-2">
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${strengthColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${strengthPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center">
          {hasMinLength ? (
            <CheckCircle size={16} className="text-green-500 mr-2" />
          ) : (
            <XCircle size={16} className="text-gray-300 mr-2" />
          )}
          <span className={`text-xs ${hasMinLength ? 'text-green-500' : 'text-gray-500'}`}>
            {t('minChars')}
          </span>
        </div>
        <div className="flex items-center">
          {hasNumber ? (
            <CheckCircle size={16} className="text-green-500 mr-2" />
          ) : (
            <XCircle size={16} className="text-gray-300 mr-2" />
          )}
          <span className={`text-xs ${hasNumber ? 'text-green-500' : 'text-gray-500'}`}>
            {t('minNumber')}
          </span>
        </div>
        <div className="flex items-center">
          {hasUpperCase ? (
            <CheckCircle size={16} className="text-green-500 mr-2" />
          ) : (
            <XCircle size={16} className="text-gray-300 mr-2" />
          )}
          <span className={`text-xs ${hasUpperCase ? 'text-green-500' : 'text-gray-500'}`}>
            {t('minUppercase')}
          </span>
        </div>
        <div className="flex items-center">
          {hasSpecialChar ? (
            <CheckCircle size={16} className="text-green-500 mr-2" />
          ) : (
            <XCircle size={16} className="text-gray-300 mr-2" />
          )}
          <span className={`text-xs ${hasSpecialChar ? 'text-green-500' : 'text-gray-500'}`}>
            {t('minSpecialChar')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;