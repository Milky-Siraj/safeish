import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OTPInputProps {
  length?: number;
  onChange: (otp: string) => void;
  value: string;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onChange, value }) => {
  const [otp, setOtp] = useState<string[]>(value.split('').concat(Array(length - value.length).fill('')));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  useEffect(() => {
    // Initialize refs array
    inputRefs.current = Array(length).fill(null).map((_, i) => inputRefs.current[i] || null);
  }, [length]);
  
  useEffect(() => {
    // Update OTP state when value prop changes
    if (value !== otp.join('')) {
      setOtp(value.split('').concat(Array(length - value.length).fill('')));
    }
  }, [value, length]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;
    
    // Only accept numbers
    if (!/^\d*$/.test(newValue)) return;
    
    // Update the OTP array
    const newOtp = [...otp];
    
    // If user is pasting a value longer than 1 character
    if (newValue.length > 1) {
      // Take only what fits in the remaining inputs
      const pastedValue = newValue.substring(0, length - index);
      
      // Fill the current and subsequent inputs
      for (let i = 0; i < pastedValue.length; i++) {
        if (index + i < length) {
          newOtp[index + i] = pastedValue[i];
        }
      }
      
      // Focus the next empty input or the last input
      const nextIndex = Math.min(index + pastedValue.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else {
      // Handle single character input
      newOtp[index] = newValue;
      
      // Auto-focus next input if current input is filled
      if (newValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    
    setOtp(newOtp);
    onChange(newOtp.join(''));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onChange(newOtp.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    }
    
    // Handle left arrow key
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle right arrow key
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Only proceed if pasted data contains only digits
    if (!/^\d*$/.test(pastedData)) return;
    
    const newOtp = [...otp];
    
    // Fill inputs starting from current index
    for (let i = 0; i < pastedData.length; i++) {
      if (index + i < length) {
        newOtp[index + i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    onChange(newOtp.join(''));
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(index + pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };
  
  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length }, (_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <input
            ref={el => inputRefs.current[index] = el}
            type="text"
            maxLength={1}
            value={otp[index] || ''}
            onChange={e => handleChange(e, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            onPaste={e => handlePaste(e, index)}
            className="w-12 h-14 text-center text-xl font-bold border-2 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            autoComplete="off"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default OTPInput;