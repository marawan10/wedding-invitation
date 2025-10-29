const config = {
  data: {
    // Main invitation title that appears on the page
    title: "زِفَافُ مُعْتَصِم وَ أَسْمَاء",
    // Opening message/description of the invitation
    description:
      "بإذن الله سنتزوج وندعوكم للاحتفال معنا بهذه اللحظة المميزة",
    // Groom's name
    groomName: "مُعْتَصِم",
    // Bride's name
    brideName: "أَسْمَاء",
    // Groom's parents names
    parentGroom: "والد العريس ووالدة العريس",
    // Bride's parents names
    parentBride: "والد العروس ووالدة العروس",
  // Wedding date (format: YYYY-MM-DD)
  date: "2025-11-05",
    // Google Maps link for location (short clickable link)
    maps_url: "https://maps.app.goo.gl/1i2g4KCwGATyKLE69",
    // Google Maps embed code to display map on website
    // How to get: open Google Maps → select location → Share → Embed → copy link
    maps_embed:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3521.572440265167!2d30.827974!3d28.037540999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDAyJzE1LjIiTiAzMMKwNDknNDAuNyJF!5e0!3m2!1sar!2seg!4v1759774679207!5m2!1sar!2seg",
    // Event time (free format, example: "10:00 - 12:00 WIB")
    time: "19:00 - 23:00",
    // Venue/building name
    location: "منزل العائلة",
    // Full address of the wedding venue
    address: "أمام المنزل",
    // Image that appears when link is shared on social media
    ogImage: "/images/og-image.jpg",
    // Icon that appears in browser tab
    favicon: "/images/favicon.ico",
    // List of event agenda/schedule
    agenda: [
      {
        // Event name
        title: "حفل الزفاف - منزل العريس",
  // Event date (format: YYYY-MM-DD)
  date: "2025-11-05",
        // Start time (format: HH:MM)
        startTime: "19:00",
        // End time (format: HH:MM)
        endTime: "23:00",
        // Event venue
        location: "منزل العائلة",
        // Full address
        address: "أمام المنزل",
        // Google Maps link
        maps_url: "https://maps.app.goo.gl/1i2g4KCwGATyKLE69",
        // Google Maps embed
        maps_embed: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3521.572440265167!2d30.827974!3d28.037540999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDAyJzE1LjIiTiAzMMKwNDknNDAuNyJF!5e0!3m2!1sar!2seg!4v1759774679207!5m2!1sar!2seg"
      },
      {
        // Event name
        title: "حفل الزفاف - منزل العروس",
  // Event date (format: YYYY-MM-DD)
  date: "2025-11-05",
        // Start time (format: HH:MM)
        startTime: "20:00",
        // End time (format: HH:MM) - 24:00 is invalid; use 00:00 next day or 23:59
        endTime: "23:59",
        // Event venue
        location: "منزل العروس",
        // Full address
        address: "بجانب مسجد الفتح",
        // Google Maps link
        maps_url: "https://maps.app.goo.gl/7phhCqFTkNqTtK1o7",
        // Google Maps embed
        maps_embed: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3521.439931734513!2d30.771668999999996!3d28.041589000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDAyJzI5LjciTiAzMMKwNDYnMTguMCJF!5e0!3m2!1sar!2seg!4v1759777637107!5m2!1sar!2seg"
      }
      // You can add more agenda items with the same format
    ],

    // Background music settings
    audio: {
      // Music file (choose one or replace with your own file)
      src: "/audio/fulfilling-humming.mp3", // or /audio/nature-sound.mp3
      // Music title to display
      title: "Fulfilling Humming", // or Nature Sound
      // Whether music plays automatically when website opens
      autoplay: true,
      // Whether music repeats continuously
      loop: true,
      // Toast duration in milliseconds
      toastDuration: 3000
    },

    // List of bank accounts for digital envelope/gifts
    banks: [
      {
        // Bank name
        bank: "Bank Central Asia",
        // Account number
        accountNumber: "1234567890",
        // Account holder name (all uppercase)
        accountName: "MOATASEM",
      },
      {
        bank: "Bank Mandiri",
        accountNumber: "0987654321",
        accountName: "ASMAA",
      }
      // You can add more banks with the same format
    ]
  }
};

export default config;