import React, { useState } from 'react';
import { Search, Filter, Star, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StarRating from '../components/StarRating';
import SellerProfile from '../components/SellerProfile';
import { useLanguage } from '../components/LanguageContext';

const MarketplacePage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [location, setLocation] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [showSellerProfile, setShowSellerProfile] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  
  // Sample product data
  const products = [
    {
      id: 1,
      title: 'iPhone 13 Pro - 256GB',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'electronics',
      location: 'Addis Ababa',
      seller: {
        id: 's1',
        name: 'Tech Store Ethiopia',
        rating: 4.8,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        location: 'Addis Ababa, Ethiopia',
        joinDate: 'January 2023',
        transactions: 156,
        description: 'We are a premium electronics retailer specializing in the latest smartphones, laptops, and accessories. All our products come with official warranty and after-sales support.'
      }
    },
    {
      id: 2,
      title: 'Toyota Corolla 2018 - Silver',
      price: 850000,
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'vehicles',
      location: 'Addis Ababa',
      seller: {
        id: 's2',
        name: 'Addis Auto Dealers',
        rating: 4.5,
        reviews: 87,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        location: 'Addis Ababa, Ethiopia',
        joinDate: 'March 2022',
        transactions: 92,
        description: 'Established car dealership with over 10 years of experience. We offer a wide range of new and used vehicles with comprehensive inspection and documentation.'
      }
    },
    {
      id: 3,
      title: '2 Bedroom Apartment - Bole',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'real-estate',
      location: 'Addis Ababa',
      seller: {
        id: 's3',
        name: 'Prime Properties',
        rating: 4.2,
        reviews: 56,
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        location: 'Addis Ababa, Ethiopia',
        joinDate: 'June 2023',
        transactions: 43,
        description: 'Specialized in premium residential and commercial properties in Addis Ababa. We offer rental and sale options with transparent terms and professional property management.'
      }
    },
    {
      id: 4,
      title: 'MacBook Pro M1 - 512GB',
      price: 120000,
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'electronics',
      location: 'Addis Ababa',
      seller: {
        id: 's4',
        name: 'Digital World',
        rating: 4.7,
        reviews: 92,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        location: 'Addis Ababa, Ethiopia',
        joinDate: 'April 2022',
        transactions: 118,
        description: 'Authorized Apple reseller with certified technicians. We provide genuine Apple products with warranty and repair services.'
      }
    },
    {
      id: 5,
      title: 'Professional DSLR Camera Kit',
      price: 75000,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'electronics',
      location: 'Hawassa',
      seller: {
        id: 's5',
        name: 'Photo Studio Ethiopia',
        rating: 4.9,
        reviews: 43,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        location: 'Hawassa, Ethiopia',
        joinDate: 'September 2022',
        transactions: 67,
        description: 'Professional photography equipment supplier with expertise in cameras, lenses, and accessories. We also offer photography workshops and rental services.'
      }
    },
    {
      id: 6,
      title: 'Handcrafted Ethiopian Coffee Table',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'furniture',
      location: 'Bahir Dar',
      seller: {
        id: 's6',
        name: 'Ethiopian Crafts',
        rating: 4.6,
        reviews: 38,
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        location: 'Bahir Dar, Ethiopia',
        joinDate: 'November 2022',
        transactions: 52,
        description: 'Artisanal workshop specializing in traditional Ethiopian furniture and home decor. Each piece is handcrafted by skilled artisans using sustainable local materials.'
      }
    },
    {
      id: 7,
      title: 'Land for Sale - 500sqm in Bishoftu',
      price: 1500000,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'real-estate',
      location: 'Bishoftu',
      seller: {
        id: 's7',
        name: 'Oromia Real Estate',
        rating: 4.3,
        reviews: 29,
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        location: 'Bishoftu, Ethiopia',
        joinDate: 'February 2023',
        transactions: 31,
        description: 'Specialized in land and property sales in Oromia region. We ensure all properties have clear titles and legal documentation for secure transactions.'
      }
    },
    {
      id: 8,
      title: 'Traditional Ethiopian Dress - Size M',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'fashion',
      location: 'Addis Ababa',
      seller: {
        id: 's8',
        name: 'Habesha Clothing',
        rating: 4.8,
        reviews: 112,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        location: 'Addis Ababa, Ethiopia',
        joinDate: 'July 2022',
        transactions: 143,
        description: 'Authentic Ethiopian traditional clothing made with high-quality fabrics and intricate embroidery. We specialize in both modern and traditional designs for all occasions.'
      }
    }
  ];

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    // Search term filter
    if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    
    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Location filter
    if (location !== 'all' && product.location !== location) {
      return false;
    }
    
    // Minimum seller rating filter
    if (minRating > 0 && product.seller.rating < minRating) {
      return false;
    }
    
    return true;
  });

  const handleViewSellerProfile = (seller: any) => {
    setSelectedSeller(seller);
    setShowSellerProfile(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Safe Trade Marketplace</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Buy and sell with confidence using our secure escrow service.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex">
              <div className="relative flex-grow">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('searchProducts')}
                  className="w-full pl-10 pr-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                />
              </div>
              <button className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-r-md font-medium hover:bg-yellow-400 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">{t('filters')}</h2>
                  <Filter size={20} className="text-gray-600" />
                </div>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">{t('category')}</h3>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="furniture">Furniture</option>
                    <option value="fashion">Fashion</option>
                  </select>
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">{t('priceRange')}</h3>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input 
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Max"
                    />
                  </div>
                </div>
                
                {/* Location Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">{t('location')}</h3>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Locations</option>
                    <option value="Addis Ababa">Addis Ababa</option>
                    <option value="Hawassa">Hawassa</option>
                    <option value="Bahir Dar">Bahir Dar</option>
                    <option value="Bishoftu">Bishoftu</option>
                    <option value="Dire Dawa">Dire Dawa</option>
                  </select>
                </div>
                
                {/* Seller Rating Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">{t('sellerRating')}</h3>
                  <div className="mb-2">
                    <StarRating 
                      initialRating={minRating} 
                      onChange={setMinRating} 
                      size={24}
                    />
                  </div>
                  {minRating > 0 && (
                    <p className="text-sm text-gray-600">
                      Minimum: {minRating} {minRating === 1 ? 'star' : 'stars'}
                    </p>
                  )}
                </div>
                
                <button 
                  className="w-full py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                  onClick={() => {
                    // Apply filters - already handled by state changes
                  }}
                >
                  {t('applyFilters')}
                </button>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">{filteredProducts.length} {t('resultsFound')}</p>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">{t('sortBy')}:</span>
                  <select className="p-2 border border-gray-300 rounded-md text-sm">
                    <option>Newest First</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800 mb-2">{product.title}</h3>
                      <p className="text-green-700 font-bold mb-2">ETB {product.price.toLocaleString()}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span className="mr-2">{product.location}</span>
                        <span>•</span>
                        <span className="ml-2">{product.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <button 
                          className="flex items-center text-sm text-gray-600 hover:text-green-700"
                          onClick={() => handleViewSellerProfile(product.seller)}
                        >
                          <User size={16} className="mr-1" />
                          <div className="flex items-center">
                            <StarRating initialRating={product.seller.rating} readOnly size={14} className="mr-1" />
                            <span>({product.seller.reviews})</span>
                          </div>
                        </button>
                        <button className="px-3 py-1 bg-green-700 text-white text-sm rounded-md hover:bg-green-800 transition-colors">
                          {t('buyNow')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600 mb-4">No products found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceRange([0, 1000000]);
                      setLocation('all');
                      setMinRating(0);
                    }}
                    className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sellers */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">{t('featuredSellers')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <motion.div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md p-6 text-center"
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src={product.seller.image} 
                    alt={product.seller.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium mb-1">{product.seller.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  <StarRating initialRating={product.seller.rating} readOnly size={16} />
                  <span className="ml-1 text-sm text-gray-600">({product.seller.reviews})</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Specializes in {product.category}</p>
                <button 
                  className="w-full py-2 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                  onClick={() => handleViewSellerProfile(product.seller)}
                >
                  {t('viewProfile')}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller Profile Modal */}
      <AnimatePresence>
        {showSellerProfile && selectedSeller && (
          <SellerProfile 
            seller={selectedSeller} 
            onClose={() => setShowSellerProfile(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketplacePage;