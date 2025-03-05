import React from 'react';
import { Shield, CheckCircle, FileText, Users, Smartphone, Building, Eye } from 'lucide-react';

const CompliancePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Compliance & Trust</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Safe Trade Ethiopia is committed to maintaining the highest standards of security, compliance, and trust.
          </p>
        </div>
      </section>

      {/* Badges Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 text-center">
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Shield size={36} className="text-green-700" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Licensed by NBE</h2>
                <p className="text-gray-600 mb-6">
                  Safe Trade Ethiopia is fully licensed and regulated by the National Bank of Ethiopia, ensuring compliance with all financial regulations.
                </p>
                <div className="inline-block border-2 border-green-700 rounded-md px-6 py-3 font-bold text-green-700">
                  License No: NBE/FIN/0123/2024
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 text-center">
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={36} className="text-green-700" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">KYC/AML Certified</h2>
                <p className="text-gray-600 mb-6">
                  Our platform implements rigorous Know Your Customer and Anti-Money Laundering procedures to prevent fraud and ensure secure transactions.
                </p>
                <div className="inline-block border-2 border-green-700 rounded-md px-6 py-3 font-bold text-green-700">
                  Certified Compliant
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">Our Trusted Partners</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="h-16 flex items-center justify-center mb-6">
                <div className="text-2xl font-bold text-green-700 flex items-center">
                  <Smartphone size={32} className="mr-2" />
                  Telebirr
                </div>
              </div>
              <p className="text-gray-600">
                Ethiopia's leading mobile money platform, enabling seamless deposits and withdrawals for our escrow service.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="h-16 flex items-center justify-center mb-6">
                <div className="text-2xl font-bold text-green-700 flex items-center">
                  <Building size={32} className="mr-2" />
                  Awash Bank
                </div>
              </div>
              <p className="text-gray-600">
                One of Ethiopia's premier private banks, providing secure banking infrastructure for our escrow services.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="h-16 flex items-center justify-center mb-6">
                <div className="text-2xl font-bold text-green-700 flex items-center">
                  <Shield size={32} className="mr-2" />
                  EIC
                </div>
              </div>
              <p className="text-gray-600">
                Ethiopian Insurance Corporation, providing additional protection and insurance for high-value transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Security Measures
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex">
              <div className="mr-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Shield size={24} className="text-green-700" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">256-bit Encryption</h3>
                <p className="text-gray-600">
                  All data transmitted through our platform is protected with industry-standard 256-bit encryption, ensuring your information remains secure.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Users size={24} className="text-green-700" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Two-Factor Authentication</h3>
                <p className="text-gray-600">
                  Add an extra layer of security to your account with two-factor authentication, preventing unauthorized access.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FileText size={24} className="text-green-700" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Secure Document Storage</h3>
                <p className="text-gray-600">
                  All transaction documents are stored securely with encryption and access controls to protect sensitive information.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Eye size={24} className="text-green-700" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">24/7 Fraud Monitoring</h3>
                <p className="text-gray-600">
                  Our advanced AI systems continuously monitor transactions for suspicious activity, protecting you from fraud.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Process */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Compliance Process
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-green-700 text-white">
                <h3 className="text-xl font-bold">KYC Verification Steps</h3>
              </div>
              <div className="p-6">
                <ol className="space-y-6">
                  <li className="flex">
                    <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</span>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Identity Verification</h4>
                      <p className="text-gray-600">
                        Submit a valid government-issued ID (National ID, Passport, or Driver's License) to verify your identity.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</span>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Address Verification</h4>
                      <p className="text-gray-600">
                        Provide a recent utility bill or bank statement to confirm your residential address.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</span>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Phone Verification</h4>
                      <p className="text-gray-600">
                        Verify your phone number through an SMS code to ensure we can contact you regarding your transactions.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">4</span>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Enhanced Due Diligence</h4>
                      <p className="text-gray-600">
                        For high-value transactions (over ETB 500,000), additional verification steps may be required to ensure compliance with regulations.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            What Our Partners Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt="Partner"
                  className="w-16 h-16 rounded-full mx-auto object-cover"
                />
              </div>
              <p className="text-gray-600 italic mb-4">
                "Safe Trade Ethiopia has set a new standard for secure online transactions in the country. Their compliance with NBE regulations is exemplary."
              </p>
              <p className="font-bold">Ato Girma Tadesse</p>
              <p className="text-sm text-gray-500">Financial Compliance Officer, NBE</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt="Partner"
                  className="w-16 h-16 rounded-full mx-auto object-cover"
                />
              </div>
              <p className="text-gray-600 italic mb-4">
                "The integration with Telebirr has been seamless, providing users with a secure and convenient way to fund their escrow accounts."
              </p>
              <p className="font-bold">Woizero Hiwot Mekonnen</p>
              <p className="text-sm text-gray-500">Partnership Director, Telebirr</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt="Partner"
                  className="w-16 h-16 rounded-full mx-auto object-cover"
                />
              </div>
              <p className="text-gray-600 italic mb-4">
                "As a banking partner, we've been impressed with Safe Trade Ethiopia's commitment to security and regulatory compliance in all their operations."
              </p>
              <p className="font-bold">Ato Yonas Alemu</p>
              <p className="text-sm text-gray-500">VP of Digital Banking, Awash Bank</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Trade with Confidence?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of Ethiopians who are already enjoying secure transactions through our platform.
          </p>
          <button className="px-8 py-3 text-lg font-medium bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-400 transition-colors">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default CompliancePage;