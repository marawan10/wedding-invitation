import config from "@/config/config";
import { Clock, MapPin, CalendarCheck, ExternalLink, Users, Heart } from 'lucide-react'
import { motion } from 'framer-motion';
import { formatEventDate } from "@/lib/formatEventDate";
import AnimatedBackground from '@/components/ui/AnimatedBackground';

export default function Location() {
    return (<>
        {/* Location section */}
        <section id="location" className="min-h-screen relative overflow-hidden">
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
                        موقع الحفل
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif text-gray-800"
                    >
                        مواقع الحفل
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
                        <MapPin className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200" />
                    </motion.div>
                </motion.div>

                {/* Location Content */}
                <div className="max-w-6xl mx-auto space-y-16">
                    {config.data.agenda.map((event, index) => (
                        <motion.div
                            key={event.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                        >
                            {/* Venue Details */}
                            <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                    {/* Header with Icon */}
                                    <div className="flex items-center gap-3 mb-6">
                                        {event.title.includes('العريس') ? (
                                            <Users className="w-6 h-6 text-blue-500" />
                                        ) : (
                                            <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                                        )}
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block">
                                                {event.title.includes('العريس') ? 'منزل العريس' : 'منزل العروس'}
                                            </span>
                                            <h3 className="text-2xl font-serif text-gray-800">{event.location}</h3>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-4">
                                            <MapPin className="w-5 h-5 text-rose-500 mt-1" />
                                            <p className="text-gray-600 flex-1">{event.address}</p>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <CalendarCheck className="w-5 h-5 text-rose-500" />
                                            <p className="text-gray-600">{formatEventDate(event.date)}</p>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <Clock className="w-5 h-5 text-rose-500" />
                                            <p className="text-gray-600">{event.startTime} - {event.endTime}</p>
                                        </div>

                                        {/* Action Button */}
                                        <div className="pt-4">
                                            <motion.a
                                                href={event.maps_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full flex items-center justify-center gap-1.5 bg-rose-500 text-white px-4 py-3 rounded-lg hover:bg-rose-600 transition-colors text-sm font-medium"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                <span>عرض الخريطة</span>
                                            </motion.a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Container - Hidden on mobile, visible on desktop */}
                            <div className={`hidden md:block ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border-8 border-white"
                                >
                                    <iframe
                                        src={event.maps_embed}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="w-full h-full"
                                    ></iframe>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    </>)
}
