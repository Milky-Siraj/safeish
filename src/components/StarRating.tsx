import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface StarRatingProps {
  initialRating?: number;
  totalStars?: number;
  size?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  totalStars = 5,
  size = 20,
  onChange,
  readOnly = false,
  className = ''
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (selectedRating: number) => {
    if (readOnly) return;
    
    setRating(selectedRating);
    if (onChange) {
      onChange(selectedRating);
    }
  };
  
  const handleMouseEnter = (hoveredRating: number) => {
    if (readOnly) return;
    setHoverRating(hoveredRating);
  };
  
  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= (hoverRating || rating);
        
        return (
          <motion.div
            key={index}
            whileHover={!readOnly ? { scale: 1.2 } : {}}
            whileTap={!readOnly ? { scale: 0.9 } : {}}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
            className={`cursor-${readOnly ? 'default' : 'pointer'} p-1`}
          >
            <Star
              size={size}
              className={`${isActive ? 'text-yellow-400' : 'text-gray-300'} transition-colors`}
              fill={isActive ? 'currentColor' : 'none'}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default StarRating;