import Hero from '@/pages/Hero'
import Events from '@/pages/Events'
import Location from '@/pages/Location';
import Wishes from '@/pages/Wishes';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

// Main Invitation Content
export default function MainContent() {
    return (
        <>
            <Hero />
            <Events />
            <Location />
            <Wishes />
            
            {/* Thank You Section */}
            <section className="py-20 relative overflow-hidden">
                {/* Animated Background */}
                <AnimatedBackground />
                
                <div className="absolute inset-0 bg-gradient-to-b from-rose-50/30 to-white/80" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <div className="space-y-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center justify-center gap-3"
                            >
                                <div className="h-px w-12 bg-rose-200/50" />
                                <Heart className="w-6 h-6 text-rose-400" fill="currentColor" />
                                <div className="h-px w-12 bg-rose-200/50" />
                            </motion.div>
                            
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-700 text-lg sm:text-xl leading-relaxed font-arabic"
                                style={{ fontFamily: "'Amiri', 'Arabic Typesetting', serif" }}
                            >
                                نشكركم على مشاركتنا فرحتنا، ونسأل الله أن يرزقكم مثلها سعادةً وبركة.
                            </motion.p>
                            
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center justify-center gap-3"
                            >
                                <div className="h-px w-8 bg-rose-200/50" />
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                                <div className="h-px w-8 bg-rose-200/50" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}