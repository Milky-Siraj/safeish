import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useLanguage } from './LanguageContext';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = (lang: string) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'home', label: t('home') },
    { id: 'features', label: t('features') },
    { id: 'dashboard', label: t('dashboard') },
    { id: 'marketplace', label: t('marketplace') },
    { id: 'compliance', label: t('compliance') },
  ];

  return (
    <motion.header 
      className={`bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-3'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center"
            >
              <Logo />
              <span className="ml-2 text-xl font-bold text-green-700">SAFE TRADE ETHIOPIA</span>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-sm font-medium transition-colors hover:text-green-700 ${
                  currentPage === item.id ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-700'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <motion.button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-green-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={18} className="mr-1" />
                {language === 'en' ? 'English' : 'አማርኛ'}
                <ChevronDown size={16} className="ml-1" />
              </motion.button>
              
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button 
                      onClick={() => toggleLanguage('en')}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${language === 'en' ? 'bg-gray-100' : ''}`}
                    >
                      English
                    </button>
                    <button 
                      onClick={() => toggleLanguage('am')}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${language === 'am' ? 'bg-gray-100' : ''}`}
                    >
                      አማርኛ
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button 
              onClick={() => setCurrentPage('signin')}
              className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('signIn')}
            </motion.button>
            <motion.button 
              onClick={() => setCurrentPage('signup')}
              className="px-4 py-2 text-sm font-medium text-green-700 border border-green-700 rounded-md hover:bg-green-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('signUp')}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-green-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden mt-4 pb-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`text-sm font-medium py-2 transition-colors hover:text-green-700 ${
                      currentPage === item.id ? 'text-green-700 border-l-4 border-green-700 pl-2' : 'text-gray-700'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button 
                  onClick={() => toggleLanguage(language === 'en' ? 'am' : 'en')}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-green-700 py-2"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe size={18} className="mr-1" />
                  {language === 'en' ? 'English' : 'አማርኛ'}
                </motion.button>
                <motion.button 
                  onClick={() => {
                    setCurrentPage('signin');
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('signIn')}
                </motion.button>
                <motion.button 
                  onClick={() => {
                    setCurrentPage('signup');
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-green-700 border border-green-700 rounded-md hover:bg-green-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('signUp')}
                </motion.button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;