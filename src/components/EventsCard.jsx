import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  X,
  Chrome,
  Apple,
  Calendar as CalendarIcon,
  ExternalLink,
  Users,
  Heart
} from 'lucide-react';
import { formatEventDate } from '@/lib/formatEventDate';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CalendarButton = ({ icon: Icon, label, onClick, className = "" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors ${className}`}
    >
      <Icon />
      <span className="text-gray-700 font-medium">{label}</span>
    </motion.button>
  );
};

const EventCard = ({ eventData }) => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const googleCalendarLink = () => {
    const startDate = new Date(`${eventData.date}T${eventData.startTime}:00`);
    const endDate = new Date(`${eventData.date}T${eventData.endTime}:00`);
    
    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventData.title,
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
      details: eventData.description || '',
      location: eventData.location,
      trp: false
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const downloadICSFile = () => {
    const startDate = new Date(`${eventData.date}T${eventData.startTime}:00`);
    const endDate = new Date(`${eventData.date}T${eventData.endTime}:00`);
    
    const formatICSDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding//Wedding Event//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@wedding.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${eventData.title}`,
      `DESCRIPTION:${eventData.description || ''}`,
      `LOCATION:${eventData.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${eventData.title.toLowerCase().replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {eventData.title.includes('العريس') ? (
                <Users className="w-4 h-4 text-blue-500" />
              ) : (
                <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
              )}
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {eventData.title.includes('العريس') ? 'منزل العريس' : 'منزل العروس'}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {eventData.title.split(' - ')[0]}
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-rose-500 hover:text-rose-600 transition-colors"
            onClick={() => setShowCalendarModal(true)}
          >
            <CalendarPlus className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-rose-500" />
            <span>{formatEventDate(eventData.date)}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-rose-500" />
            <span>{eventData.startTime} - {eventData.endTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-rose-500" />
              <span>{eventData.location}</span>
            </div>
            {eventData.maps_url && (
              <motion.a
                href={eventData.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 text-rose-500 hover:text-rose-600 text-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>خريطة</span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>

      <Modal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      >
        <div className="space-y-6 p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Add to Calendar</h3>
            <button
              onClick={() => setShowCalendarModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <CalendarButton
              icon={(props) => <Chrome {...props} className="w-5 h-5 text-rose-500" />}
              label="Google Calendar"
              onClick={() => window.open(googleCalendarLink(), '_blank')}
            />

            <CalendarButton
              icon={(props) => <Apple {...props} className="w-5 h-5 text-gray-900" />}
              label="Apple Calendar"
              onClick={downloadICSFile}
            />

            <CalendarButton
              icon={(props) => <CalendarIcon {...props} className="w-5 h-5 text-blue-600" />}
              label="Outlook Calendar"
              onClick={downloadICSFile}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default function EventsCard({ events }) {
  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <EventCard key={event.title} eventData={event} />
      ))}
    </div>
  );
}
