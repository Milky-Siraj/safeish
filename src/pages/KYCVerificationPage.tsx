import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../components/LanguageContext';
import FileUpload from '../components/FileUpload';
import OTPInput from '../components/OTPInput';

interface KYCVerificationPageProps {
  setCurrentPage?: (page: string) => void;
}

const KYCVerificationPage: React.FC<KYCVerificationPageProps> = ({ setCurrentPage }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [idType, setIdType] = useState('national_id');
  const [idNumber, setIdNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [addressFile, setAddressFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Update progress based on current step
    setProgress((step - 1) * 25);
  }, [step]);
  
  const validateStep = (currentStep: number) => {
    const newErrors: {[key: string]: string} = {};
    
    if (currentStep === 1) {
      if (!idType) newErrors.idType = 'Please select an ID type';
      if (!idNumber) newErrors.idNumber = 'Please enter your ID number';
      if (!fullName) newErrors.fullName = 'Please enter your full name';
      if (!dateOfBirth) newErrors.dateOfBirth = 'Please enter your date of birth';
      if (!idFile) newErrors.idFile = 'Please upload a copy of your ID';
    } else if (currentStep === 2) {
      if (!address) newErrors.address = 'Please enter your address';
      if (!addressFile) newErrors.addressFile = 'Please upload a proof of address';
    } else if (currentStep === 3) {
      if (!phoneNumber) newErrors.phoneNumber = 'Please enter your phone number';
      if (!selfieFile) newErrors.selfieFile = 'Please upload a selfie';
    } else if (currentStep === 4) {
      if (!otp || otp.length !== 6) newErrors.otp = 'Please enter a valid 6-digit OTP';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (validateStep(step)) {
      const newStep = step + 1;
      setStep(newStep);
      setProgress((newStep - 1) * 25);
      
      // If moving to step 4, send OTP
      if (newStep === 4) {
        sendOTP();
      }
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      const newStep = step - 1;
      setStep(newStep);
      setProgress((newStep - 1) * 25);
    }
  };
  
  const sendOTP = () => {
    if (phoneNumber) {
      setIsLoading(true);
      
      // Simulate OTP sending
      setTimeout(() => {
        setIsLoading(false);
        setOtpSent(true);
        setOtpCooldown(60);
        
        // Countdown timer
        const timer = setInterval(() => {
          setOtpCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 1500);
    } else {
      setErrors({...errors, phoneNumber: 'Please enter your phone number'});
    }
  };
  
  const submitKYC = () => {
    if (validateStep(4)) {
      setIsLoading(true);
      
      // Simulate KYC submission
      setTimeout(() => {
        setIsLoading(false);
        setProgress(100);
        setStep(5);
      }, 1500);
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-green-700 text-white">
              <h1 className="text-2xl font-bold">{t('kycVerification')}</h1>
              <p className="mt-2">{t('completeIdentity')}</p>
            </div>
            
            {/* Progress Bar */}
            <div className="p-4 border-b">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-700 bg-green-100">
                      {t('verificationProgress')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-700">
                      {progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
                  <motion.div 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg- green-700"
                    initial={{ width: `${(step - 1) * 25}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-4">{t('personalInfo')}</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('idType')}</label>
                    <select
                      value={idType}
                      onChange={(e) => setIdType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="national_id">{t('nationalIdCard')}</option>
                      <option value="passport">{t('passport')}</option>
                      <option value="drivers_license">{t('driversLicense')}</option>
                    </select>
                    {errors.idType && <p className="mt-1 text-sm text-red-600">{errors.idType}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('idNumber')}</label>
                    <input
                      type="text"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your ID number"
                    />
                    {errors.idNumber && <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')}</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your full name as it appears on your ID"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('dateOfBirth')}</label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                  </div>
                  
                  <FileUpload
                    id="idFile"
                    label={t('uploadId')}
                    onFileChange={setIdFile}
                    value={idFile}
                    error={errors.idFile}
                  />
                  
                  <div className="flex justify-end">
                    <motion.button
                      onClick={nextStep}
                      className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('next')}
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {/* Step 2: Address Verification */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-4">{t('addressVerification')}</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('residentialAddress')}</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your full residential address"
                      rows={3}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('uploadProofOfAddress')}</label>
                    <p className="text-xs text-gray-500 mb-2">
                      {t('addressProofDescription')}
                    </p>
                    
                    <FileUpload
                      id="addressFile"
                      onFileChange={setAddressFile}
                      value={addressFile}
                      error={errors.addressFile}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <motion.button
                      onClick={prevStep}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('back')}
                    </motion.button>
                    <motion.button
                      onClick={nextStep}
                      className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('next')}
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {/* Step 3: Phone Verification & Selfie */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-4">{t('phoneVerification')}</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('phoneNumber')}</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        +251
                      </span>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="911234567"
                      />
                    </div>
                    {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('uploadSelfie')}</label>
                    <p className="text-xs text-gray-500 mb-2">
                      Please upload a clear selfie showing your face. This will be compared with your ID document.
                    </p>
                    
                    <FileUpload
                      id="selfieFile"
                      onFileChange={setSelfieFile}
                      value={selfieFile}
                      acceptedFileTypes=".jpg,.jpeg,.png"
                      error={errors.selfieFile}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <motion.button
                      onClick={prevStep}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('back')}
                    </motion.button>
                    <motion.button
                      onClick={nextStep}
                      className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('next')}
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {/* Step 4: OTP Verification */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-4">{t('otpVerification')}</h2>
                  
                  <div className="mb-6 text-center">
                    <p className="text-gray-600 mb-4">
                      {t('otpSent')}
                    </p>
                    
                    <div className="mb-4">
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                      />
                      {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp}</p>}
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {otpCooldown > 0 ? (
                        <p>{t('resendIn')} {otpCooldown} {t('seconds')}</p>
                      ) : (
                        <button 
                          onClick={sendOTP}
                          className="text-green-700 hover:text-green-800 flex items-center justify-center mx-auto"
                          disabled={isLoading}
                        >
                          <RefreshCw size={16} className="mr-1" />
                          {t('resendCode')}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <motion.button
                      onClick={prevStep}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading}
                    >
                      {t('back')}
                    </motion.button>
                    <motion.button
                      onClick={submitKYC}
                      className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        t('submit')
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {/* Step 5: Completion */}
              {step === 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  >
                    <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('verificationSubmitted')}</h2>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {t('verificationSuccess')}
                  </p>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-md mx-auto mb-6 text-left">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                      <p className="text-sm text-yellow-700">
                        {t('limitedFeatures')}
                      </p>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => setCurrentPage && setCurrentPage('dashboard')}
                    className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('returnToDashboard')}
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCVerificationPage;