import React, { useState } from 'react';
import { Plus, ChevronDown, Clock, CheckCircle, AlertTriangle, Wallet, Settings, User, CreditCard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationCenter from '../components/NotificationCenter';
import DepositWithdrawModal from '../components/DepositWithdrawModal';
import ProfileSettings from '../components/ProfileSettings';
import { useLanguage } from '../components/LanguageContext';

const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('transactions');
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionDescription, setTransactionDescription] = useState('');
  const [transactionTerms, setTransactionTerms] = useState('');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleNewTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setShowNewTransactionForm(false);
    // Reset form
    setTransactionAmount('');
    setTransactionDescription('');
    setTransactionTerms('');
  };

  const handleSettingsSave = () => {
    // Show success message or notification
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Abebe Kebede</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <NotificationCenter />
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 bg-white rounded-full shadow-sm"
              >
                <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <ChevronDown size={16} className="text-gray-600" />
              </button>
              
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button 
                      onClick={() => {
                        setActiveTab('settings');
                        setShowProfileMenu(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </button>
                    <button 
                      onClick={() => {
                        setShowDepositModal(true);
                        setShowProfileMenu(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                    >
                      <CreditCard size={16} className="mr-2" />
                      Deposit Funds
                    </button>
                    <button 
                      onClick={() => {
                        setShowWithdrawModal(true);
                        setShowProfileMenu(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                    >
                      <Wallet size={16} className="mr-2" />
                      Withdraw Funds
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={() => setShowNewTransactionForm(true)}
              className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors flex items-center"
            >
              <Plus size={18} className="mr-1" />
              New Transaction
            </button>
          </div>
        </div>

        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="text-gray-500 text-sm mb-2">Escrow Balance</h3>
            <div className="flex items-center">
              <Wallet size={24} className="text-green-700 mr-2" />
              <p className="text-2xl font-bold">ETB 25,000</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => setShowDepositModal(true)}
                className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors flex-1"
              >
                Deposit
              </button>
              <button 
                onClick={() => setShowWithdrawModal(true)}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex-1"
              >
                Withdraw
              </button>
            </div>
          </motion.div>
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="text-gray-500 text-sm mb-2">Active Transactions</h3>
            <p className="text-2xl font-bold">5</p>
          </motion.div>
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="text-gray-500 text-sm mb-2">Completed Transactions</h3>
            <p className="text-2xl font-bold">12</p>
          </motion.div>
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="text-gray-500 text-sm mb-2">Total Transaction Value</h3>
            <p className="text-2xl font-bold">ETB 120,500</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b overflow-x-auto">
            <button 
              onClick={() => setActiveTab('transactions')}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'transactions' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Transactions
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'notifications' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Notifications
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'settings' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Settings
            </button>
          </div>

          {/* Transactions Tab Content */}
          {activeTab === 'transactions' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Transactions</h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Filter by:</span>
                  <div className="relative">
                    <button className="px-3 py-1 bg-gray-100 rounded-md text-sm flex items-center">
                      All Transactions
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Transaction Cards */}
              <div className="space-y-4">
                {/* Pending Transaction */}
                <motion.div 
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center">
                          <Clock size={12} className="mr-1" />
                          Pending
                        </span>
                      </div>
                      <h3 className="font-medium">Purchase of iPhone 13 Pro</h3>
                      <p className="text-sm text-gray-500">Transaction ID: #ETH12345</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">ETB 45,000</p>
                      <p className="text-sm text-gray-500">Created: May 15, 2025</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-gray-500">Seller:</span> Dawit Haile
                    </div>
                    <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors">
                      View Details
                    </button>
                  </div>
                </motion.div>

                {/* Completed Transaction */}
                <motion.div 
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                          <CheckCircle size={12} className="mr-1" />
                          Completed
                        </span>
                      </div>
                      <h3 className="font-medium">Website Development Services</h3>
                      <p className="text-sm text-gray-500">Transaction ID: #ETH12344</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">ETB 25,000</p>
                      <p className="text-sm text-gray-500">Completed: May 10, 2025</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-gray-500">Seller:</span> Tech Solutions Ltd
                    </div>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                  </div>
                </motion.div>

                {/* Disputed Transaction */}
                <motion.div 
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center">
                          <AlertTriangle size={12} className="mr-1" />
                          Disputed
                        </span>
                      </div>
                      <h3 className="font-medium">Used Toyota Corolla (2018)</h3>
                      <p className="text-sm text-gray-500">Transaction ID: #ETH12343</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">ETB 850,000</p>
                      <p className="text-sm text-gray-500">Disputed: May 5, 2025</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-gray-500">Seller:</span> Addis Auto Dealers
                    </div>
                    <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors">
                      Resolve Dispute
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Notifications Tab Content */}
          {activeTab === 'notifications' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <div className="space-y-4">
                <motion.div 
                  className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="font-medium">Transaction #ETH12345 is awaiting your approval</p>
                  <p className="text-sm text-gray-600 mt-1">The seller has marked the item as delivered. Please inspect and approve.</p>
                  <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
                </motion.div>
                <motion.div 
                  className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="font-medium">Funds released for transaction #ETH12344</p>
                  <p className="text-sm text-gray-600 mt-1">The escrow funds have been successfully released to the seller.</p>
                  <p className="text-xs text-gray-500 mt-2">2 days ago</p>
                </motion.div>
                <motion.div 
                  className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="font-medium">New message from Dawit Haile</p>
                  <p className="text-sm text-gray-600 mt-1">Regarding transaction #ETH12345: "The item will be delivered tomorrow."</p>
                  <p className="text-xs text-gray-500 mt-2">3 days ago</p>
                </motion.div>
              </div>
            </div>
          )}

          {/* Settings Tab Content */}
          {activeTab === 'settings' && (
            <div className="p-6">
              <ProfileSettings onSave={handleSettingsSave} />
            </div>
          )}
        </div>
      </div>

      {/* New Transaction Modal */}
      {showNewTransactionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Transaction</h2>
              <button 
                onClick={() => setShowNewTransactionForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleNewTransaction}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Amount (ETB)
                </label>
                <input 
                  type="number" 
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter amount"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input 
                  type="text"
                  value={transactionDescription}
                  onChange={(e) => setTransactionDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="What are you buying/selling?"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Terms
                </label>
                <textarea 
                  value={transactionTerms}
                  onChange={(e) => setTransactionTerms(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Specify delivery timeline, condition expectations, etc."
                  rows={4}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Counterparty Email or Phone
                </label>
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter email or phone number"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  type="button"
                  onClick={() => setShowNewTransactionForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-800 transition-colors"
                >
                  Create Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      <DepositWithdrawModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        type="deposit"
      />

      {/* Withdraw Modal */}
      <DepositWithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        type="withdraw"
      />
    </div>
  );
};

export default DashboardPage;