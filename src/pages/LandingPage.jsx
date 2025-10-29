// src/pages/LandingPage.jsx
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { motion } from 'framer-motion';
import { Calendar, Clock, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const LandingPage = ({ onOpenInvitation }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(config.data.date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen relative overflow-hidden"
  >
    {/* Animated Background */}
    <AnimatedBackground />
    
    {/* Additional Decorative Background */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-rose-50/20 to-white/80" />
    <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-rose-100/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-pink-100/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

    {/* Main Content */}
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ 
          scale: 1.02,
          y: -5,
          transition: { duration: 0.2 }
        }}
        className="w-full max-w-md"
      >
        {/* Card Container */}
        <div className="backdrop-blur-sm bg-white/60 p-6 sm:p-8 md:p-10 rounded-2xl border border-rose-100/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          {/* Top Decorative Line */}
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <div className="h-px w-12 sm:w-16 bg-rose-200/50" />
            <div className="w-2 h-2 rounded-full bg-rose-300" />
            <div className="h-px w-12 sm:w-16 bg-rose-200/50" />
          </div>

          {/* Date and Time */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4 mb-6 sm:mb-8 items-center"
          >
            <div className="inline-flex flex-col items-center space-y-1 bg-white/80 px-4 sm:px-6 py-2 sm:py-3 rounded-xl">
              <Calendar className="w-5 h-5 text-rose-400" />
              <p className="text-gray-700 font-medium">
                {formatEventDate(config.data.date)}
              </p>
            </div>

            <div className="inline-flex flex-col items-center space-y-1 bg-white/80 px-4 sm:px-6 py-2 sm:py-3 rounded-xl">
              <Clock className="w-5 h-5 text-rose-400" />
              <p className="text-gray-700 font-medium">
                {config.data.time}
              </p>
            </div>
          </motion.div>

          {/* Couple Names */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-4"
          >
            <div className="space-y-2">
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl font-arabic font-bold text-gray-800 leading-relaxed px-4"
                style={{ 
                  fontFamily: "'Amiri', 'Arabic Typesetting', serif",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <span className="text-rose-600">{config.data.groomName}</span>
                <Heart className="inline w-6 h-6 sm:w-8 sm:h-8 text-rose-500 mx-3 sm:mx-4" fill="currentColor" />
                <span className="text-rose-600">{config.data.brideName}</span>
              </h1>
              <div className="h-px w-16 sm:w-24 mx-auto bg-rose-200" />
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6"
          >
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {Object.keys(timeLeft).map((interval) => (
                <div
                  key={interval}
                  className="flex flex-col items-center p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100"
                >
                  <span className="text-lg sm:text-2xl font-bold text-rose-600">
                    {timeLeft[interval]}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {interval === 'days' ? 'يوم' : 
                     interval === 'hours' ? 'ساعة' : 
                     interval === 'minutes' ? 'دقيقة' : 'ثانية'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Open Invitation Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 sm:mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenInvitation}
              className="group relative w-full bg-rose-500 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-xl font-medium shadow-lg hover:bg-rose-600 transition-all duration-200"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>افتح الدعوة</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </motion.div>
  );
};

export default LandingPage;
