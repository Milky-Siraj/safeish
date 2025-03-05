import React, { useRef, useEffect, useState } from 'react';
import { Shield, Brain, Smartphone, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../components/LanguageContext';
import AnimatedCard from '../components/AnimatedCard';
import AnimatedButton from '../components/AnimatedButton';
import TestimonialsCarousel from '../components/TestimonialsCarousel';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const { t, language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay was prevented:", error);
      });
    }
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const counterVariants = {
    hidden: { opacity: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      transition: {
        duration: 2,
        delay: custom * 0.1
      }
    })
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover opacity-20"
            autoPlay 
            muted 
            loop
            playsInline
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-people-in-a-business-meeting-4838-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#FFD700" }}
              >
                SAFE TRADE ETHIOPIA
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-10 text-green-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('secureTransactions')}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatedButton 
                onClick={() => setCurrentPage('signup')}
                primary={true}
              >
                {t('signUpForFree')}
              </AnimatedButton>
              <AnimatedButton 
                onClick={() => setCurrentPage('features')}
                primary={false}
              >
                {t('howItWorks')}
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
        <div className="h-16 bg-white rounded-t-[50%] -mb-1 relative z-10"></div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('whyChooseUs')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <AnimatedCard
              icon={<Shield size={32} className="text-green-700" />}
              title={t('escrowProtection')}
              description="Your funds are securely held in escrow until all transaction conditions are met, ensuring complete protection for both buyers and sellers."
              delay={0.1}
            />

            {/* Feature 2 */}
            <AnimatedCard
              icon={<Brain size={32} className="text-green-700" />}
              title={t('aiDispute')}
              description="Our advanced AI system helps resolve disputes quickly and fairly, analyzing transaction data and communication to ensure just outcomes."
              delay={0.2}
            />

            {/* Feature 3 */}
            <AnimatedCard
              icon={<Smartphone size={32} className="text-green-700" />}
              title={t('telebirr')}
              description="Easily fund your escrow account or withdraw funds using Ethiopia's leading mobile payment platform, Telebirr, with zero transaction fees."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          >
            <motion.div
              variants={statsVariants}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              custom={0}
            >
              <motion.p 
                className="text-4xl font-bold text-green-700 mb-2"
                variants={counterVariants}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                custom={0}
              >
                <CountUp end={10000} duration={2} />+
              </motion.p>
              <p className="text-gray-600">Successful Transactions</p>
            </motion.div>
            <motion.div
              variants={statsVariants}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              custom={1}
            >
              <motion.p 
                className="text-4xl font-bold text-green-700 mb-2"
                variants={counterVariants}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                custom={1}
              >
                <CountUp end={5000} duration={2} />+
              </motion.p>
              <p className="text-gray-600">Active Users</p>
            </motion.div>
            <motion.div
              variants={statsVariants}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              custom={2}
            >
              <motion.p 
                className="text-4xl font-bold text-green-700 mb-2"
                variants={counterVariants}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                custom={2}
              >
                <CountUp end={99.8} duration={2} decimals={1} />%
              </motion.p>
              <p className="text-gray-600">Dispute Resolution Rate</p>
            </motion.div>
            <motion.div
              variants={statsVariants}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              custom={3}
            >
              <motion.p 
                className="text-4xl font-bold text-green-700 mb-2"
                variants={counterVariants}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                custom={3}
              >
                ETB <CountUp end={50} duration={2} />M+
              </motion.p>
              <p className="text-gray-600">Transaction Volume</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Add TestimonialsCarousel component */}
      <TestimonialsCarousel />

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('readyToTrade')}
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('joinThousands')}
          </motion.p>
          <AnimatedButton 
            onClick={() => setCurrentPage('signup')}
            primary={true}
            className="inline-flex items-center"
          >
            {t('getStartedNow')}
            <ArrowRight size={20} className="ml-2" />
          </AnimatedButton>
        </div>
      </section>
    </div>
  );
};

// CountUp component for animated number counting
const CountUp = ({ 
  end, 
  start = 0, 
  duration = 2, 
  decimals = 0 
}: { 
  end: number; 
  start?: number; 
  duration?: number; 
  decimals?: number;
}) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const inViewRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(inViewRef, { once: true });
  
  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const currentCount = progress * (end - start) + start;
        
        countRef.current = currentCount;
        setCount(currentCount);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };
      
      animationFrame = requestAnimationFrame(step);
      
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [inView, start, end, duration]);
  
  return (
    <span ref={inViewRef}>
      {count.toFixed(decimals)}
    </span>
  );
};

export default HomePage;