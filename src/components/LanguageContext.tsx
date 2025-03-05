import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the translations interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Define the language context interface
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

// Create the translations object
const translations: Translations = {
  home: {
    en: 'Home',
    am: 'መነሻ',
  },
  features: {
    en: 'Features',
    am: 'ባህሪያት',
  },
  dashboard: {
    en: 'Dashboard',
    am: 'ዳሽቦርድ',
  },
  marketplace: {
    en: 'Marketplace',
    am: 'ገበያ',
  },
  compliance: {
    en: 'Compliance & Trust',
    am: 'ደንብ እና እምነት',
  },
  signIn: {
    en: 'Sign In',
    am: 'ግባ',
  },
  signUp: {
    en: 'Sign Up',
    am: 'ተመዝገብ',
  },
  secureTransactions: {
    en: 'Secure Transactions, Trusted Outcomes',
    am: 'ደህንነቱ የተጠበቀ ግብይት፣ የታመነ ውጤት',
  },
  escrowDescription: {
    en: "Ethiopia's premier P2P escrow platform, ensuring safe and secure transactions for buyers and sellers.",
    am: "የኢትዮጵያ ቀዳሚ P2P ኤስክሮው መድረክ፣ ለገዢዎች እና ሻጮች ደህንነቱ የተጠበቀ እና ተአማኒ ግብይት ያረጋግጣል።",
  },
  signUpForFree: {
    en: 'Sign Up for Free',
    am: 'በነፃ ይመዝገቡ',
  },
  howItWorks: {
    en: 'How It Works',
    am: 'እንዴት እንደሚሰራ',
  },
  whyChooseUs: {
    en: 'Why Choose Safe Trade Ethiopia?',
    am: 'ለምን ሴፍ ትሬድ ኢትዮጵያን ይመርጣሉ?',
  },
  escrowProtection: {
    en: '100% Escrow Protection',
    am: '100% የኤስክሮው ጥበቃ',
  },
  aiDispute: {
    en: 'AI-Powered Dispute Resolution',
    am: 'በሰው ሰራሽ ብልህነት የሚመራ የክርክር አፈታት',
  },
  telebirr: {
    en: 'Seamless Telebirr Integration',
    am: 'ቀልጣፋ የቴሌብር ውህደት',
  },
  readyToTrade: {
    en: 'Ready to Trade with Confidence?',
    am: 'በእምነት ለመነገድ ዝግጁ ነዎት?',
  },
  joinThousands: {
    en: 'Join thousands of Ethiopians who are already enjoying secure transactions through our platform.',
    am: 'ከሺዎች ኢትዮጵያውያን ጋር ይቀላቀሉ እና በመድረካችን በኩል ደህንነቱ የተጠበቀ ግብይት ይደሰቱ።',
  },
  getStartedNow: {
    en: 'Get Started Now',
    am: 'አሁን ይጀምሩ',
  },
  fullName: {
    en: 'Full Name',
    am: 'ሙሉ ስም',
  },
  emailAddress: {
    en: 'Email Address',
    am: 'የኢሜይል አድራሻ',
  },
  phoneNumber: {
    en: 'Phone Number',
    am: 'ስልክ ቁጥር',
  },
  password: {
    en: 'Password',
    am: 'የይለፍ ቃል',
  },
  confirmPassword: {
    en: 'Confirm Password',
    am: 'የይለፍ ቃል ያረጋግጡ',
  },
  nationalId: {
    en: 'Ethiopian National ID/FFIDA Number',
    am: 'የኢትዮጵያ ብሔራዊ መታወቂያ/FFIDA ቁጥር',
  },
  uploadId: {
    en: 'Upload National ID/FFIDA',
    am: 'ብሔራዊ መታወቂያ/FFIDA ይስቀሉ',
  },
  termsAndConditions: {
    en: 'I agree to the Terms of Service and Privacy Policy',
    am: 'የአገልግሎት ውሎችን እና የግላዊነት ፖሊሲን ተስማምቻለሁ',
  },
  alreadyHaveAccount: {
    en: 'Already have an account?',
    am: 'አካውንት አለዎት?',
  },
  forgotPassword: {
    en: 'Forgot Password?',
    am: 'የይለፍ ቃል ረሳሁ?',
  },
  rememberMe: {
    en: 'Remember Me',
    am: 'አስታውሰኝ',
  },
  dontHaveAccount: {
    en: "Don't have an account?",
    am: 'አካውንት የለዎትም?',
  },
  verifyPhone: {
    en: 'Verify Phone Number',
    am: 'ስልክ ቁጥር ያረጋግጡ',
  },
  enterOtp: {
    en: 'Enter the 6-digit code sent to your phone',
    am: 'ወደ ስልክዎ የተላከውን 6 አሃዝ ኮድ ያስገቡ',
  },
  resendCode: {
    en: 'Resend Code',
    am: 'ኮድ እንደገና ላክ',
  },
  verify: {
    en: 'Verify',
    am: 'አረጋግጥ',
  },
  kycVerification: {
    en: 'KYC Verification',
    am: 'KYC ማረጋገጫ',
  },
  completeIdentity: {
    en: 'Complete your identity verification to unlock all features',
    am: 'ሁሉንም ባህሪያት ለመክፈት የማንነት ማረጋገጫዎን ያጠናቅቁ',
  },
  verificationProgress: {
    en: 'Verification Progress',
    am: 'የማረጋገጫ ሂደት',
  },
  personalInfo: {
    en: 'Personal Information',
    am: 'የግል መረጃ',
  },
  addressVerification: {
    en: 'Address Verification',
    am: 'የአድራሻ ማረጋገጫ',
  },
  phoneVerification: {
    en: 'Phone Verification',
    am: 'የስልክ ማረጋገጫ',
  },
  otpVerification: {
    en: 'OTP Verification',
    am: 'OTP ማረጋገጫ',
  },
  uploadSelfie: {
    en: 'Upload Selfie',
    am: 'ሴልፊ ይስቀሉ',
  },
  next: {
    en: 'Next',
    am: 'ቀጣይ',
  },
  back: {
    en: 'Back',
    am: 'ተመለስ',
  },
  submit: {
    en: 'Submit',
    am: 'አስገባ',
  },
  cancel: {
    en: 'Cancel',
    am: 'ሰርዝ',
  },
  depositFunds: {
    en: 'Deposit Funds',
    am: 'ገንዘብ ያስገቡ',
  },
  withdrawFunds: {
    en: 'Withdraw Funds',
    am: 'ገንዘብ ያውጡ',
  },
  amount: {
    en: 'Amount',
    am: 'መጠን',
  },
  paymentMethod: {
    en: 'Payment Method',
    am: 'የክፍያ ዘዴ',
  },
  telebirrPayment: {
    en: 'Telebirr Payment',
    am: 'በቴሌብር ይክፈሉ',
  },
  bankTransfer: {
    en: 'Bank Transfer',
    am: 'የባንክ ዝውውር',
  },
  proceed: {
    en: 'Proceed',
    am: 'ቀጥል',
  },
  searchProducts: {
    en: 'Search for products, services, or items...',
    am: 'ምርቶችን፣ አገልግሎቶችን ወይም እቃዎችን ይፈልጉ...',
  },
  filters: {
    en: 'Filters',
    am: 'ማጣሪያዎች',
  },
  category: {
    en: 'Category',
    am: 'ምድብ',
  },
  priceRange: {
    en: 'Price Range (ETB)',
    am: 'የዋጋ ክልል (ብር)',
  },
  location: {
    en: 'Location',
    am: 'ቦታ',
  },
  sellerRating: {
    en: 'Seller Rating',
    am: 'የሻጭ ደረጃ',
  },
  applyFilters: {
    en: 'Apply Filters',
    am: 'ማጣሪያዎችን ተግብር',
  },
  resultsFound: {
    en: 'results found',
    am: 'ውጤቶች ተገኝተዋል',
  },
  sortBy: {
    en: 'Sort by:',
    am: 'አስቀምጥ በ:',
  },
  buyNow: {
    en: 'Buy Now',
    am: 'አሁን ይግዙ',
  },
  featuredSellers: {
    en: 'Featured Sellers',
    am: 'ተለይተው የቀረቡ ሻጮች',
  },
  viewProfile: {
    en: 'View Profile',
    am: 'መገለጫ ይመልከቱ',
  },
  createAccount: {
    en: 'Create your account',
    am: 'መለያዎን ይፍጠሩ',
  },
  joinSafeTrade: {
    en: 'Join Safe Trade Ethiopia and start secure transactions',
    am: 'ሴፍ ትሬድ ኢትዮጵያን ይቀላቀሉ እና ደህንነቱ የተጠበቀ ግብይት ይጀምሩ',
  },
  continueWith: {
    en: 'Or continue with',
    am: 'ወይም ይቀጥሉ በ',
  },
  passwordRequirements: {
    en: 'Password Requirements',
    am: 'የይለፍ ቃል መስፈርቶች',
  },
  minChars: {
    en: 'At least 8 characters',
    am: 'ቢያንስ 8 ቁምፊዎች',
  },
  minNumber: {
    en: 'At least 1 number',
    am: 'ቢያንስ 1 ቁጥር',
  },
  minUppercase: {
    en: 'At least 1 uppercase letter',
    am: 'ቢያንስ 1 ከፍተኛ ፊደል',
  },
  minSpecialChar: {
    en: 'At least 1 special character',
    am: 'ቢያንስ 1 ልዩ ቁምፊ',
  },
  welcomeBack: {
    en: 'Welcome back',
    am: 'እንኳን ደህና መጡ',
  },
  signInToAccount: {
    en: 'Sign in to your account',
    am: 'ወደ መለያዎ ይግቡ',
  },
  dragAndDrop: {
    en: 'Drag and drop your file here, or click to browse',
    am: 'ፋይልዎን እዚህ ይጎትቱ እና ይጣሉ፣ ወይም ለማሰስ ጠቅ ያድርጉ',
  },
  supportedFormats: {
    en: 'Supported formats: JPG, PNG, PDF (Max 5MB)',
    am: 'የሚደገፉ ቅርጸቶች: JPG, PNG, PDF (ከፍተኛ 5MB)',
  },
  uploadSuccess: {
    en: 'File uploaded successfully',
    am: 'ፋይል በተሳካ ሁኔታ ተስቅሏል',
  },
  remove: {
    en: 'Remove',
    am: 'አስወግድ',
  },
  idType: {
    en: 'ID Type',
    am: 'የመታወቂያ አይነት',
  },
  nationalIdCard: {
    en: 'National ID',
    am: 'ብሔራዊ መታወቂያ',
  },
  passport: {
    en: 'Passport',
    am: 'ፓስፖርት',
  },
  driversLicense: {
    en: 'Driver\'s License',
    am: 'የመንጃ ፈቃድ',
  },
  idNumber: {
    en: 'ID Number',
    am: 'የመታወቂያ ቁጥር',
  },
  dateOfBirth: {
    en: 'Date of Birth',
    am: 'የትውልድ ቀን',
  },
  residentialAddress: {
    en: 'Residential Address',
    am: 'የመኖሪያ አድራሻ',
  },
  uploadProofOfAddress: {
    en: 'Upload Proof of Address',
    am: 'የአድራሻ ማረጋገጫ ይስቀሉ',
  },
  addressProofDescription: {
    en: 'Please upload a utility bill, bank statement, or government letter (not older than 3 months)',
    am: 'እባክዎ የውሃ/የኤሌክትሪክ ሂሳብ፣ የባንክ መግለጫ ወይም የመንግስት ደብዳቤ ይስቀሉ (ከ3 ወራት በላይ ያልሆነ)',
  },
  otpSent: {
    en: 'We\'ve sent a 6-digit verification code to your phone number. Please enter it below.',
    am: 'ወደ ስልክ ቁጥርዎ 6 አሃዝ የማረጋገጫ ኮድ ልከናል። እባክዎ ከዚህ በታች ያስገቡት።',
  },
  resendIn: {
    en: 'Resend code in',
    am: 'ኮድ እንደገና ይላክ በ',
  },
  seconds: {
    en: 'seconds',
    am: 'ሰከንዶች',
  },
  verificationSubmitted: {
    en: 'Verification Submitted!',
    am: 'ማረጋገጫ ተልኳል!',
  },
  verificationSuccess: {
    en: 'Your KYC verification has been submitted successfully. We\'ll review your information and update your account status within 24-48 hours.',
    am: 'የእርስዎ KYC ማረጋገጫ በተሳካ ሁኔታ ተልኳል። መረጃዎን እናገመግማለን እና በ24-48 ሰዓታት ውስጥ የመለያዎን ሁኔታ እናዘምናለን።',
  },
  limitedFeatures: {
    en: 'You can continue using Safe Trade Ethiopia with limited features while your verification is in progress.',
    am: 'ማረጋገጫዎ በሂደት ላይ እያለ ሴፍ ትሬድ ኢትዮጵያን በተገደበ ባህሪያት መጠቀም ይችላሉ።',
  },
  returnToDashboard: {
    en: 'Return to Dashboard',
    am: 'ወደ ዳሽቦርድ ተመለስ',
  }
};

// Create the language context
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Create the language provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);