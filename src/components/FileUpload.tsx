import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  label?: string;
  id: string;
  error?: string;
  value?: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  acceptedFileTypes = '.jpg,.jpeg,.png,.pdf',
  maxSizeMB = 5,
  label,
  id,
  error,
  value
}) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };
  
  const validateAndSetFile = (file: File) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    const acceptedTypes = acceptedFileTypes.split(',').map(type => type.replace('.', '').toLowerCase());
    
    if (!acceptedTypes.includes(fileExtension)) {
      setFileError(`Only ${acceptedFileTypes.replace(/\./g, '')} files are allowed`);
      return;
    }
    
    if (file.size > maxSizeBytes) {
      setFileError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }
    
    setFileError(null);
    onFileChange(file);
  };
  
  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div 
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-green-500 bg-green-50' : 
          value ? 'border-green-500 bg-green-50' : 
          'border-gray-300 hover:border-green-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          className="hidden"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
        />
        
        {value ? (
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
            <p className="text-sm text-gray-600">{value.name}</p>
            <button 
              className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
              onClick={removeFile}
            >
              <X size={16} className="mr-1" />
              {t('remove')}
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">{t('dragAndDrop')}</p>
            <p className="text-xs text-gray-500 mt-1">{t('supportedFormats')}</p>
          </div>
        )}
      </div>
      {(error || fileError) && (
        <p className="mt-1 text-sm text-red-600">{error || fileError}</p>
      )}
    </div>
  );
};

export default FileUpload;