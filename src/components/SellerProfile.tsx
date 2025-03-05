import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Package, Calendar, MessageCircle } from 'lucide-react';
import StarRating from './StarRating';
import { useLanguage } from './LanguageContext';

interface SellerProfileProps {
  seller: {
    id: string;
    name: string;
    rating: number;
    reviews: number;
    location: string;
    joinDate: string;
    transactions: number;
    description: string;
    image: string;
  };
  onClose: () => void;
}

const SellerProfile: React.FC<SellerProfileProps> = ({ seller, onClose }) => {
  const { t } = useLanguage();
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userRating === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setUserRating(0);
      setReviewText('');
      // In a real app, you would update the seller's rating and reviews count
    }, 1500);
  };
  
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header with seller info */}
        <div className="relative">
          <div className="h-32 bg-green-700"></div>
          <div className="absolute top-16 left-6 w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
            <img 
              src={seller.image} 
              alt={seller.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pt-12 pb-4 px-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{seller.name}</h2>
                <div className="flex items-center mt-1">
                  <StarRating initialRating={seller.rating} readOnly size={16} />
                  <span className="ml-2 text-sm text-gray-600">
                    {seller.rating.toFixed(1)} ({seller.reviews} reviews)
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
        
        {/* Seller details */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <MapPin size={18} className="text-green-700 mr-2" />
              <span className="text-gray-600">{seller.location}</span>
            </div>
            <div className="flex items-center">
              <Package size={18} className="text-green-700 mr-2" />
              <span className="text-gray-600">{seller.transactions} transactions</span>
            </div>
            <div className="flex items-center">
              <Calendar size={18} className="text-green-700 mr-2" />
              <span className="text-gray-600">Joined {seller.joinDate}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">About the Seller</h3>
            <p className="text-gray-600">{seller.description}</p>
          </div>
          
          {/* Review form */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium mb-4">Leave a Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                <StarRating 
                  initialRating={userRating} 
                  onChange={setUserRating} 
                  size={24}
                  className="mb-1"
                />
                {userRating > 0 && (
                  <p className="text-sm text-gray-600">
                    You selected {userRating} {userRating === 1 ? 'star' : 'stars'}
                  </p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Share your experience with this seller..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={userRating === 0 || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <MessageCircle size={16} className="mr-1" />
                      Submit Review
                    </span>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SellerProfile;