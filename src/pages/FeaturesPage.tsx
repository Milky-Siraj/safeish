import React, { useState } from 'react';
import { Handshake, Lock, ClipboardCheck, Wallet, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesPage: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  const workflowSteps = [
    {
      icon: <Handshake size={36} className="text-green-700" />,
      title: "1. Agree on Terms",
      description: "Buyer and seller agree on the terms of the transaction, including price, delivery timeline, and conditions.",
      tooltip: "Create a detailed agreement that covers all aspects of the transaction to avoid misunderstandings later."
    },
    {
      icon: <Lock size={36} className="text-green-700" />,
      title: "2. Funds Locked in Escrow",
      description: "Buyer deposits funds into our secure escrow account, which are held safely until all conditions are met.",
      tooltip: "Funds are protected by bank-level encryption and are only released when both parties agree or when the terms are fulfilled."
    },
    {
      icon: <ClipboardCheck size={36} className="text-green-700" />,
      title: "3. Delivery & Inspection",
      description: "Seller delivers the goods or services, and the buyer inspects them to ensure they meet the agreed terms.",
      tooltip: "Buyers have a specified inspection period (typically 1-3 days) to verify that everything meets the agreed specifications."
    },
    {
      icon: <Wallet size={36} className="text-green-700" />,
      title: "4. Payment Released",
      description: "Once the buyer approves, the funds are released from escrow to the seller, completing the transaction.",
      tooltip: "Funds are transferred to the seller's account within 24 hours of buyer approval, with notifications sent to both parties."
    }
  ];

  const comparisonData = [
    {
      feature: "Escrow Protection",
      safeTrade: true,
      traditionalBanks: false,
      otherP2P: true,
      details: "Our escrow service holds funds securely until all transaction conditions are met, providing complete protection for both buyers and sellers. Unlike traditional banks that only facilitate transfers without verification of delivery, and other P2P platforms that may have limited escrow capabilities."
    },
    {
      feature: "AI-Powered Dispute Resolution",
      safeTrade: true,
      traditionalBanks: false,
      otherP2P: false,
      details: "Our proprietary AI system analyzes transaction data, communication history, and evidence to suggest fair resolutions for disputes. This reduces resolution time from weeks to days, with a 99.8% satisfaction rate compared to manual processes used by competitors."
    },
    {
      feature: "Telebirr Integration",
      safeTrade: true,
      traditionalBanks: true,
      otherP2P: false,
      details: "Seamless integration with Ethiopia's leading mobile payment platform allows instant deposits and withdrawals with zero transaction fees. Our direct API connection provides real-time transaction confirmation, unlike other platforms that rely on manual verification."
    },
    {
      feature: "Transaction Fees",
      safeTrade: "1-2%",
      traditionalBanks: "3-5%",
      otherP2P: "2-4%",
      details: "Our fee structure is transparent and among the lowest in the market. For transactions under ETB 10,000, the fee is 2%. For transactions between ETB 10,000-100,000, the fee is 1.5%. For transactions over ETB 100,000, the fee is just 1%."
    },
    {
      feature: "NBE Licensed",
      safeTrade: true,
      traditionalBanks: true,
      otherP2P: false,
      details: "We are fully licensed and regulated by the National Bank of Ethiopia (License No: NBE/FIN/0123/2024), ensuring compliance with all financial regulations and providing an additional layer of security and trust for our users."
    },
    {
      feature: "Multilingual Support",
      safeTrade: true,
      traditionalBanks: true,
      otherP2P: false,
      details: "Our platform supports both English and Amharic, with dedicated customer support available in both languages. We also provide documentation and user guides in both languages to ensure all users can navigate the platform comfortably."
    },
    {
      feature: "Mobile App",
      safeTrade: true,
      traditionalBanks: true,
      otherP2P: false,
      details: "Our native mobile app for Android and iOS provides full functionality on the go, including biometric authentication, push notifications for transaction updates, and offline capability for viewing transaction details when internet connectivity is limited."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Escrow Features
          </motion.h1>
          <motion.p 
            className="text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover how our secure escrow service protects both buyers and sellers throughout the transaction process.
          </motion.p>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How Our Escrow Service Works
          </motion.h2>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-green-200 -translate-y-1/2 z-0"></div>
            
            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {workflowSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md text-center relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <div className="group">
                    <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 border-4 border-white transition-all duration-300 group-hover:bg-green-200">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                    
                    {/* Tooltip */}
                    <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-gray-800 rotate-45"></div>
                      {step.tooltip}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us vs. Competitors
          </motion.h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="py-4 px-6 text-left">Features</th>
                  <th className="py-4 px-6 text-center">Safe Trade Ethiopia</th>
                  <th className="py-4 px-6 text-center">Traditional Banks</th>
                  <th className="py-4 px-6 text-center">Other P2P Platforms</th>
                  <th className="py-4 px-6 text-center w-10"></th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <React.Fragment key={index}>
                    <motion.tr 
                      className={`border-b border-gray-200 ${index % 2 === 1 ? 'bg-gray-50' : ''} hover:bg-green-50 transition-colors cursor-pointer`}
                      onClick={() => toggleRow(index)}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <td className="py-4 px-6 font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.safeTrade === 'boolean' ? (
                          row.safeTrade ? 
                            <Check size={24} className="text-green-600 mx-auto" /> : 
                            <X size={24} className="text-red-500 mx-auto" />
                        ) : (
                          row.safeTrade
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.traditionalBanks === 'boolean' ? (
                          row.traditionalBanks ? 
                            <Check size={24} className="text-green-600 mx-auto" /> : 
                            <X size={24} className="text-red-500 mx-auto" />
                        ) : (
                          row.traditionalBanks
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.otherP2P === 'boolean' ? (
                          row.otherP2P ? 
                            <Check size={24} className="text-green-600 mx-auto" /> : 
                            <X size={24} className="text-red-500 mx-auto" />
                        ) : (
                          row.otherP2P
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {expandedRow === index ? 
                          <ChevronUp size={20} className="text-gray-600 mx-auto" /> : 
                          <ChevronDown size={20} className="text-gray-600 mx-auto" />
                        }
                      </td>
                    </motion.tr>
                    {expandedRow === index && (
                      <motion.tr 
                        className={`${index % 2 === 1 ? 'bg-gray-50' : ''}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td colSpan={5} className="py-4 px-6 text-gray-600 border-b border-gray-200">
                          <div className="bg-green-50 p-4 rounded-md">
                            {row.details}
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Additional Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Transaction Tracking",
                description: "Monitor the status of your transactions in real-time, with notifications at each stage of the process."
              },
              {
                title: "Secure Messaging System",
                description: "Communicate directly with the other party through our encrypted messaging system, keeping all transaction details in one place."
              },
              {
                title: "Document Verification",
                description: "Upload and verify important documents related to your transaction, ensuring all terms are clearly documented."
              },
              {
                title: "Multiple Payment Options",
                description: "Fund your escrow account using Telebirr, bank transfer, or other popular payment methods in Ethiopia."
              },
              {
                title: "Transaction Templates",
                description: "Save time by creating templates for recurring transactions with the same parties or similar terms."
              },
              {
                title: "Seller/Buyer Ratings",
                description: "Build trust through our rating system, allowing users to review their transaction experience with other parties."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderLeft: "6px solid #2E8B57"
                }}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How much does the escrow service cost?",
                answer: "Our escrow fee is typically 1-2% of the transaction amount, depending on the transaction size and complexity. The fee is clearly displayed before you confirm the transaction."
              },
              {
                question: "How long does the escrow process take?",
                answer: "The timeline varies depending on the transaction. Once payment is received in escrow, the seller is notified to proceed with delivery. After delivery, the buyer has an inspection period (typically 1-3 days) to approve the transaction."
              },
              {
                question: "What happens if there's a dispute?",
                answer: "Our AI-powered dispute resolution system will analyze the transaction details, communication history, and evidence provided by both parties to suggest a fair resolution. If needed, our human mediators will step in to resolve complex disputes."
              },
              {
                question: "Is Safe Trade Ethiopia regulated?",
                answer: "Yes, we are licensed by the National Bank of Ethiopia (NBE) and comply with all relevant financial regulations and KYC/AML requirements in Ethiopia."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.h3 
                  className="text-xl font-bold mb-2 text-gray-800"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {faq.question}
                </motion.h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;