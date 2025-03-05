import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, CheckCircle, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import FileUpload from './FileUpload';

interface ProfileSettingsProps {
  onSave: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onSave }) => {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState('Abebe Kebede');
  const [email, setEmail] = useState('abebe.kebede@example.com');
  const [phoneNumber, setPhoneNumber] = useState('0911234567');
  const [nationalId, setNationalId] = useState('');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [tempProfilePhoto, setTempProfilePhoto] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleProfilePhotoChange(file);
    }
  };
  
  const handleProfilePhotoChange = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      setErrors({...errors, profilePhoto: 'Please upload an image file (PNG or JPG)'});
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({...errors, profilePhoto: 'Image size should be less than 5MB'});
      return;
    }
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        setTempProfilePhoto(e.target.result as string);
        // Remove any previous error
        const newErrors = {...errors};
        delete newErrors.profilePhoto;
        setErrors(newErrors);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProfilePhotoChange(e.target.files[0]);
    }
  };
  
  const applyProfilePhoto = () => {
    setProfilePhoto(tempProfilePhoto);
    setTempProfilePhoto(null);
  };
  
  const cancelProfilePhoto = () => {
    setTempProfilePhoto(null);
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!fullName) newErrors.fullName = 'Full name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onSave();
      }, 1500);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div>
        <h3 className="text-lg font-medium mb-4">Profile Photo</h3>
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera size={32} className="text-gray-400" />
              )}
            </div>
          </div>
          
          <div className="flex-1">
            {tempProfilePhoto ? (
              <div className="space-y-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto">
                  <img src={tempProfilePhoto} alt="New profile" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={applyProfilePhoto}
                    className="px-3 py-1 bg-green-700 text-white rounded-md hover:bg-green-800 flex items-center"
                  >
                    <CheckCircle size={16} className="mr-1" /> Apply
                  </button>
                  <button
                    onClick={cancelProfilePhoto}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center"
                  >
                    <X size={16} className="mr-1" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
                  isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/png,image/jpeg"
                  onChange={handleFileInputChange}
                />
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Drag and drop your profile photo here, or click to browse</p>
                <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG (Max 5MB)</p>
                {errors.profilePhoto && (
                  <p className="mt-2 text-sm text-red-600">{errors.profilePhoto}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')}</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('emailAddress')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          
          <div>
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('nationalId')}</label>
            <input
              type="text"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Optional"
            />
          </div>
        </div>
      </div>
      
      {/* KYC Verification */}
      <div>
        <h3 className="text-lg font-medium mb-4">KYC Verification</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Complete your KYC verification to unlock all features of Safe Trade Ethiopia.
              </p>
            </div>
          </div>
        </div>
        
        <FileUpload
          id="idDocument"
          label={t('uploadId')}
          onFileChange={setIdFile}
          value={idFile}
          acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
          error={errors.idFile}
        />
        
        <div className="mt-4">
          <button
            onClick={() => setCurrentPage && setCurrentPage('kyc')}
            className="text-green-700 hover:text-green-800 text-sm font-medium"
          >
            Complete full KYC verification →
          </button>
        </div>
      </div>
      
      {/* Save Button */}
      <div className="pt-4 border-t border-gray-200">
        <motion.button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            'Save Changes'
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ProfileSettings;