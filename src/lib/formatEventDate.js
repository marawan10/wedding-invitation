/**
 * Formats a date string into Arabic format
 * @param {string} isoString - The ISO date string to format
 * @param {('full'|'short'|'time')} [format='full'] - The format type to use
 * @returns {string} The formatted date string in Arabic
 * 
 * @example
 * // returns "الاثنين، 1 يناير 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "full")
 * 
 * // returns "1 يناير 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "short")
 * 
 * // returns "00:00"
 * formatEventDate("2024-01-01T00:00:00.000Z", "time")
 */
export const formatEventDate = (isoString, format = 'full') => {
    const date = new Date(isoString);

    const formats = {
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Africa/Cairo'
        },
        short: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Africa/Cairo'
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Africa/Cairo'
        }
    };

    // Arabic month names mapping
    const monthsArabic = {
        'January': 'يناير',
        'February': 'فبراير',
        'March': 'مارس',
        'April': 'أبريل',
        'May': 'مايو',
        'June': 'يونيو',
        'July': 'يوليو',
        'August': 'أغسطس',
        'September': 'سبتمبر',
        'October': 'أكتوبر',
        'November': 'نوفمبر',
        'December': 'ديسمبر'
    };

    // Arabic day names mapping
    const daysArabic = {
        'Sunday': 'الأحد',
        'Monday': 'الاثنين',
        'Tuesday': 'الثلاثاء',
        'Wednesday': 'الأربعاء',
        'Thursday': 'الخميس',
        'Friday': 'الجمعة',
        'Saturday': 'السبت'
    };

    let formatted = date.toLocaleDateString('en-US', formats[format]);

    // Handle time format separately
    if (format === 'time') {
        return date.toLocaleTimeString('en-US', formats[format]);
    }

    // Replace English month and day names with Arabic ones
    Object.keys(monthsArabic).forEach(english => {
        formatted = formatted.replace(english, monthsArabic[english]);
    });

    Object.keys(daysArabic).forEach(english => {
        formatted = formatted.replace(english, daysArabic[english]);
    });

    // Format adjustment for full date
    if (format === 'full') {
        // Convert "Hari, Tanggal Bulan Tahun" format
        const parts = formatted.split(', ');
        if (parts.length === 2) {
            formatted = `${parts[0]}, ${parts[1]}`;
        }
    }

    return formatted;
};