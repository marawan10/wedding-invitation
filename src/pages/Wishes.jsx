import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';
import {
    Calendar,
    Clock,
    ChevronDown,
    User,
    MessageCircle,
    Send,
    CheckCircle,
    XCircle,
    Loader2
} from 'lucide-react'
import Marquee from '@/components/ui/marquee'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import { fetchWishes, submitWish } from '@/lib/api'

export default function Wishes() {
    const [wishes, setWishes] = useState([]);
    const [filteredWishes, setFilteredWishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [showAllMessages, setShowAllMessages] = useState(false);

    const [newWish, setNewWish] = useState({
        name: "ضيف كريم",
        message: "",
        attending: "attending"
    });

    const [attendance, setAttendance] = useState("attending");
    const [isOpen, setIsOpen] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const options = [
        { value: "attending", label: "سأحضر" },
        { value: "not-attending", label: "لن أحضر" },
        { value: "maybe", label: "ربما" }
    ];

    // Load wishes on component mount
    useEffect(() => {
        loadWishes();
    }, []);

    const loadWishes = async () => {
        try {
            setLoading(true);
            setError(null);
            const wishesData = await fetchWishes();
            setWishes(wishesData);
            // Filter to show only specific messages by default
            const allowedNames = [
                'مصطفى مختار',
                'مروان مختار',
                'محمد مختار',
                'معتز عزام',
                'محمد شادي',
                'عمر فوزي',
                'محمود فوزي',
                'أم رنا',
                'أم حمزة'
            ];
            setFilteredWishes(wishesData.filter(wish => allowedNames.includes(wish.name)));
        } catch (err) {
            setError('Failed to load messages. Please try again later.');
            console.error('Error loading wishes:', err);
            // Set fallback wishes if API fails
            setWishes([
                {
                    id: 1,
                    name: "مروان مختار",
                    message: "بارك الله لكما وبارك عليكما وجمع بينكما في خير، وجعل أيامكما سعادةً ومودّة ورحمة.❤️🤍",
                    timestamp: "2025-10-05T20:30:00Z",
                    attending: "attending"
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitWish = async (e) => {
        e.preventDefault();
        if (!newWish.message.trim()) return;

        try {
            setSubmitting(true);
            setError(null);
            
            const wishData = {
                name: newWish.name || "ضيف كريم",
                message: newWish.message.trim(),
                attending: attendance
            };

            const response = await submitWish(wishData);
            
            // Add the new wish to the local state
            const updatedWishes = [response.wish, ...wishes];
            setWishes(updatedWishes);
            // Update filtered wishes - only show allowed names
            const allowedNames = [
                'مصطفى مختار',
                'مروان مختار',
                'محمد مختار',
                'معتز عزام',
                'محمد شادي',
                'عمر فوزي',
                'محمود فوزي',
                'أم رنا',
                'أم حمزة'
            ];
            setFilteredWishes(updatedWishes.filter(wish => allowedNames.includes(wish.name)));
            
            // Reset form
            setNewWish({ name: "ضيف كريم", message: "", attending: "attending" });
            setAttendance("attending");
            
            // Show success animation
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
            
        } catch (err) {
            setError(err.message || 'Failed to submit message. Please try again.');
            console.error('Error submitting wish:', err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={200}
                />
            )}

            <section id="wishes" className="min-h-screen relative overflow-hidden">
                {/* Animated Background */}
                <AnimatedBackground />
                
                <div className="container mx-auto px-4 py-20 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center space-y-4 mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="inline-block text-rose-500 font-medium"
                        >
                            أرسل تهانيك ودعواتك
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif text-gray-800"
                        >
                            الرسائل والدعوات
                        </motion.h2>

                        {/* Decorative Divider */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-4 pt-4"
                        >
                            <div className="h-[1px] w-12 bg-rose-200" />
                            <MessageCircle className="w-5 h-5 text-rose-400" />
                            <div className="h-[1px] w-12 bg-rose-200" />
                        </motion.div>
                    </motion.div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-2xl mx-auto mb-8"
                        >
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                                <p className="text-red-600 text-sm">{error}</p>
                                <button 
                                    onClick={loadWishes}
                                    className="mt-2 text-red-700 underline text-sm hover:text-red-800"
                                >
                                    Try Again
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Loading State */}
                    {loading ? (
                        <div className="w-full mx-auto space-y-6 mb-12 flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
                            <span className="text-gray-600 ml-2">Loading messages...</span>
                        </div>
                    ) : (
                        /* Scrolling Wishes using Marquee (original component) */
                        <div className="w-full mx-auto space-y-6 mb-12">
                            <Marquee pauseOnHover className="w-full py-5" speed={60} direction="left" repeat={3}>
                                {filteredWishes.map((wish, index) => (
                                <motion.div
                                    key={wish.id}
                                    className="relative w-80 flex-shrink-0 mx-4 wish-card group"
                                    whileHover={{ 
                                        scale: 1.05,
                                        y: -5,
                                        transition: { duration: 0.2 }
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ 
                                        opacity: 1, 
                                        y: 0,
                                        transition: { delay: index * 0.1 }
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-100/50 to-pink-100/50 rounded-xl transform scale-100 wish-card-bg group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow" />
                                    <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-pink-200/50 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                        <div className="flex items-start gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                                                {wish.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-800 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{wish.name}</h4>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(wish.timestamp).toLocaleDateString('ar-EG', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                {wish.attending === 'attending' && (
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                )}
                                                {wish.attending === 'not-attending' && (
                                                    <XCircle className="w-4 h-4 text-red-500" />
                                                )}
                                                {wish.attending === 'maybe' && (
                                                    <Clock className="w-4 h-4 text-yellow-500" />
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed mb-3 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                                            {wish.message}
                                        </p>
                                    </div>
                                </motion.div>
                                ))}
                            </Marquee>
                        </div>
                    )}

                    {/* Wishes Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-2xl mx-auto mt-12"
                    >
                        <form onSubmit={handleSubmitWish} className="relative">
                            <motion.div 
                                className="backdrop-blur-sm bg-white/90 p-6 rounded-2xl border border-rose-100/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="space-y-4">
                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            <User className="w-4 h-4 inline mr-2" />
                                            اسمك
                                        </label>
                                        <input
                                            type="text"
                                            value={newWish.name}
                                            onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors"
                                            placeholder="ادخل اسمك..."
                                        />
                                    </div>

                                    {/* Attendance Dropdown */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            <Calendar className="w-4 h-4 inline mr-2" />
                                            هل ستحضر؟
                                        </label>
                                        <motion.div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setIsOpen(!isOpen)}
                                                className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-white text-left flex items-center justify-between hover:border-rose-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors"
                                            >
                                                <span className="text-gray-700">
                                                    {options.find(opt => opt.value === attendance)?.label}
                                                </span>
                                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden"
                                                    >
                                                        {options.map((option) => (
                                                            <motion.button
                                                                key={option.value}
                                                                type="button"
                                                                onClick={() => {
                                                                    setAttendance(option.value);
                                                                    setIsOpen(false);
                                                                }}
                                                                whileHover={{ backgroundColor: 'rgb(255, 241, 242)' }}
                                                                className={`w-full px-4 py-2.5 text-left transition-colors
                                                                    ${attendance === option.value
                                                                        ? 'bg-rose-50 text-rose-600'
                                                                        : 'text-gray-700 hover:bg-rose-50'
                                                                    }`}
                                                            >
                                                                {option.label}
                                                            </motion.button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </div>

                                    {/* Message Textarea */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            <MessageCircle className="w-4 h-4 inline mr-2" />
                                            رسالتك
                                        </label>
                                        <textarea
                                            value={newWish.message}
                                            onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors resize-none"
                                            placeholder="اكتب تهانيك ودعواتك للعروسين..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={submitting || !newWish.message.trim()}
                                        whileHover={{ scale: submitting ? 1 : 1.02 }}
                                        whileTap={{ scale: submitting ? 1 : 0.98 }}
                                        className={`w-full py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                                            submitting || !newWish.message.trim()
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600'
                                        }`}
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                جارٍ الإرسال...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                إرسال التهنئة
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </section>

            <style>{`
                .wish-card-bg { transition: transform 0.3s ease; }
                .wish-card:hover .wish-card-bg { transform: scale(1.02); }
            `}</style>
        </>
    );
}
