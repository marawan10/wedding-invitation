import { Calendar, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { safeBase64 } from '@/lib/base64';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

export default function Hero() {
    const [guestName, setGuestName] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get('guest');

        if (guestParam) {
            try {
                const decodedName = safeBase64.decode(guestParam);
                setGuestName(decodedName);
            } catch (error) {
                console.error('Error decoding guest name:', error);
                setGuestName('');
            }
        }
    }, []);

    const CountdownTimer = ({ targetDate }) => {
        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
        
        // Arabic labels for countdown
        const arabicLabels = {
            days: 'أيام',
            hours: 'ساعات',
            minutes: 'دقائق',
            seconds: 'ثواني'
        };
        
        function calculateTimeLeft() {
            const difference = +new Date(targetDate) - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            } else {
                // When the target time has passed, show zeros for all units.
                timeLeft = {
                    days: '00',
                    hours: '00',
                    minutes: '00',
                    seconds: '00'
                };
            }
            return timeLeft;
        }
        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
            return () => clearInterval(timer);
        }, [targetDate]);

        return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {Object.keys(timeLeft).map((interval) => (
                    <motion.div
                        key={interval}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100"
                    >
                        <span className="text-xl sm:text-2xl font-bold text-rose-600">
                            {timeLeft[interval]}
                        </span>
                        <span className="text-sm sm:text-base text-gray-500 font-arabic">{arabicLabels[interval]}</span>
                    </motion.div>
                ))}
            </div>
        );
    };

    const FloatingHearts = () => {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1, 1, 0.5],
                            x: Math.random() * window.innerWidth,
                            y: -100
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeOut"
                        }}
                        className="absolute"
                    >
                        <Heart
                            className={`w-${Math.floor(Math.random() * 2) + 8} h-${Math.floor(Math.random() * 2) + 8} ${i % 3 === 0 ? 'text-rose-400' :
                                i % 3 === 1 ? 'text-pink-400' :
                                    'text-red-400'
                                }`}
                            fill="currentColor"
                        />
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <>
            <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 text-center relative overflow-hidden">
                {/* Animated Background */}
                <AnimatedBackground />
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 relative z-10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mx-auto"
                    >
                        <span className="px-4 py-1 text-sm bg-rose-50 text-rose-600 rounded-full border border-rose-200">
                            احفظ هذا التاريخ المهم
                        </span>
                    </motion.div>

                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4 max-w-2xl mx-auto mb-6"
                        >
                            <p className="text-gray-700 font-arabic text-lg sm:text-xl leading-relaxed text-center">
                                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                <div className="h-px w-8 bg-rose-200/50" />
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                                <div className="h-px w-8 bg-rose-200/50" />
                            </div>
                            <p className="text-rose-600 font-medium text-base sm:text-lg text-center">
                                بارك الله لنا وبارك علينا وجمع بيننا في خير
                            </p>
                        </motion.div>
                        {/* Couple Photos and Names */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col items-center space-y-6"
                        >
                            {/* Photos Row */}
                            <div className="flex items-center justify-center gap-6 sm:gap-8">
                                {/* Groom Photo */}
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="relative group cursor-pointer"
                                >
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white/60 shadow-md group-hover:shadow-lg transition-all duration-300">
                                        <img 
                                            src="/Wedding-Persons/Moatasem.jpg" 
                                            alt="العريس"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                </motion.div>

                                {/* Heart in the middle */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.0 }}
                                    className="mx-4"
                                >
                                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500" fill="currentColor" />
                                </motion.div>

                                {/* Bride Photo */}
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="relative group cursor-pointer"
                                >
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white/60 shadow-md group-hover:shadow-lg transition-all duration-300">
                                        <img 
                                            src="/Wedding-Persons/Asmaa.jpg" 
                                            alt="العروسة"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Names Row */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="flex items-center justify-center gap-4 sm:gap-6"
                            >
                                <h2 className="text-2xl sm:text-4xl font-arabic font-bold text-rose-600 px-4"
                                    style={{ 
                                        fontFamily: "'Amiri', 'Arabic Typesetting', serif",
                                        textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                    }}
                                >
                                    {config.data.groomName}
                                </h2>
                                
                                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mx-2" fill="currentColor" />
                                
                                <h2 className="text-2xl sm:text-4xl font-arabic font-bold text-rose-600 px-4"
                                    style={{ 
                                        fontFamily: "'Amiri', 'Arabic Typesetting', serif",
                                        textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                    }}
                                >
                                    {config.data.brideName}
                                </h2>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="relative max-w-md mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 to-white/50 backdrop-blur-md rounded-2xl" />

                        <div className="relative px-4 sm:px-8 py-8 sm:py-10 rounded-2xl border border-rose-100/50">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
                                <div className="w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
                            </div>

                            <div className="space-y-6 text-center">
                                <div className="space-y-3">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                        className="flex items-center justify-center space-x-2"
                                    >
                                        <Calendar className="w-4 h-4 text-rose-400" />
                                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                                            {formatEventDate(config.data.date, "full")}
                                        </span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="flex items-center justify-center space-x-2"
                                    >
                                        <Clock className="w-4 h-4 text-rose-400" />
                                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                                            {config.data.time}
                                        </span>
                                    </motion.div>
                                </div>

                                <div className="flex items-center justify-center gap-3">
                                    <div className="h-px w-8 sm:w-12 bg-rose-200/50" />
                                    <div className="w-2 h-2 rounded-full bg-rose-200" />
                                    <div className="h-px w-8 sm:w-12 bg-rose-200/50" />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                    className="space-y-3 text-center"
                                >
                                    <p className="text-gray-600 font-arabic text-base sm:text-lg font-medium"
                                       style={{ fontFamily: "'Amiri', 'Arabic Typesetting', serif" }}>
                                        إلى الأهل والأصدقاء والمقربين
                                    </p>
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="h-px w-6 bg-rose-200/50" />
                                        <div className="w-1 h-1 rounded-full bg-rose-300" />
                                        <div className="h-px w-6 bg-rose-200/50" />
                                    </div>
                                    <p className="text-rose-500 font-semibold text-base sm:text-lg leading-relaxed"
                                       style={{ fontFamily: "'Amiri', 'Arabic Typesetting', serif" }}>
                                        {guestName ? guestName : "نسعد بلقائكم ودعواتكم المباركة لحضور حفل زفافنا"}
                                    </p>
                                </motion.div>
                            </div>

                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px">
                                <div className="w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
                            </div>
                        </div>

                        <div className="absolute -top-2 -right-2 w-16 sm:w-24 h-16 sm:h-24 bg-rose-100/20 rounded-full blur-xl" />
                        <div className="absolute -bottom-2 -left-2 w-16 sm:w-24 h-16 sm:h-24 bg-rose-100/20 rounded-full blur-xl" />
                    </motion.div>

                    <CountdownTimer targetDate={config.data.date} />

                    <div className="pt-6 relative">
                        <FloatingHearts />
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Heart className="w-10 sm:w-12 h-10 sm:h-12 text-rose-500 mx-auto" fill="currentColor" />
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </>
    )
}
