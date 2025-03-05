import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    id: 1,
    name: 'Abebe Kebede',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    text: 'Safe Trade Ethiopia has transformed how I conduct my business transactions. The escrow service provides peace of mind, and their customer support is exceptional.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sara Haile',
    role: 'Online Seller',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    text: 'As a frequent online seller, I appreciate the security and transparency that Safe Trade Ethiopia offers. The platform is user-friendly and reliable.',
    rating: 5
  },
  {
    id: 3,
    name: 'Dawit Mengistu',
    role: 'Real Estate Agent',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    text: 'The escrow service has been invaluable for my real estate transactions. It provides complete security and trust for both parties involved.',
    rating: 5
  },
  {
    id: 4,
    name: 'Tigist Bekele',
    role: 'E-commerce Entrepreneur',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    text: 'Safe Trade Ethiopia has helped me scale my online business by providing a secure platform for transactions. Their mobile app is particularly convenient.',
    rating: 4
  },
  {
    id: 5,
    name: 'Solomon Tadesse',
    role: 'Car Dealer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    text: 'The vehicle purchase process has become much safer with Safe Trade Ethiopia. Their escrow service ensures both buyers and sellers are protected.',
    rating: 5
  },
  {
    id: 6,
    name: 'Hiwot Alemayehu',
    role: 'Import/Export Business',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    text: 'International transactions are now stress-free thanks to Safe Trade Ethiopia. Their compliance with regulations and secure payment system is impressive.',
    rating: 5
  }
];

const TestimonialsCarousel: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What Our Users Say
        </motion.h2>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div 
                className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star 
                      key={index}
                      size={16}
                      className="text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 flex-grow">{testimonial.text}</p>
                
                <div className="mt-4 text-green-700">
                  <span className="text-sm font-medium">Verified User</span>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;