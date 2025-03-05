import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Logo />
              <span className="ml-2 text-xl font-bold">SAFE TRADE ETHIOPIA</span>
            </div>
            <p className="text-gray-400 mb-4">
              Secure Transactions, Trusted Outcomes. The premier P2P escrow platform in Ethiopia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('features')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('marketplace')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Marketplace
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('compliance')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Compliance & Trust
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  KYC/AML Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-green-700" />
                <span className="text-gray-400">Bole, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-green-700" />
                <span className="text-gray-400">+251 911 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-green-700" />
                <span className="text-gray-400">info@safetradeethiopia.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SAFE TRADE ETHIOPIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;