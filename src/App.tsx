import React, { useState } from 'react';
import { 
  Home, 
  Shield, 
  Brain, 
  Smartphone, 
  Handshake, 
  Lock, 
  ClipboardCheck, 
  Wallet, 
  ChevronDown, 
  Menu, 
  X, 
  Bell, 
  Plus,
  Search,
  Star,
  Filter,
  Globe
} from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import DashboardPage from './pages/DashboardPage';
import MarketplacePage from './pages/MarketplacePage';
import CompliancePage from './pages/CompliancePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import KYCVerificationPage from './pages/KYCVerificationPage';
import ChatWidget from './components/ChatWidget';
import { LanguageProvider } from './components/LanguageContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'features':
        return <FeaturesPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'compliance':
        return <CompliancePage />;
      case 'signup':
        return <SignUpPage setCurrentPage={setCurrentPage} />;
      case 'signin':
        return <SignInPage setCurrentPage={setCurrentPage} />;
      case 'kyc':
        return <KYCVerificationPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  // Don't show header and footer on auth pages
  const isAuthPage = ['signup', 'signin', 'kyc'].includes(currentPage);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {!isAuthPage && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        <main className="flex-grow">
          {renderPage()}
        </main>
        {!isAuthPage && <Footer setCurrentPage={setCurrentPage} />}
        <ChatWidget />
      </div>
    </LanguageProvider>
  );
}

export default App;