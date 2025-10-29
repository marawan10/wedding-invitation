// API endpoint for handling wishes/messages
// Using Redis (Marketplace) for permanent storage via REDIS_URL

import { createClient } from 'redis';

// Default wishes to initialize the database
const defaultWishes = [
  {
    id: 1,
    name: "مصطفى مختار",
    message: "بارك الله لكما وبارك عليكما وجمع بينكما في خير، وجعل أيامكما سعادةً ومودّة ورحمة.❤️🤍",
    timestamp: "2025-10-29T14:30:00Z",
    attending: "attending"
  },
  {
    id: 2,
    name: "مروان مختار",
    message: "تهانينا لكم بمناسبة الزواج، أسأل الله أن يبارك لكم في زواجكم، وأن يجمع بينكما في خير. مبارك لكم! 🎉",
    timestamp: "2025-10-30T16:20:00Z",
    attending: "attending"
  },
  {
    id: 3,
    name: "محمد مختار",
    message: "ألف مبروك للعروسين! أسأل الله أن يبارك لكما ويجمع بينكما في خير وسعادة دائمة 💕✨",
    timestamp: "2025-10-31T10:45:00Z",
    attending: "attending"
  },
  {
    id: 4,
    name: "معتز عزام",
    message: "مبروك يا معتصم وأسماء! ربنا يتمم لكم على خير ويجعل حياتكم مليئة بالحب والسعادة 🎊💖",
    timestamp: "2025-11-01T18:15:00Z",
    attending: "attending"
  },
  {
    id: 5,
    name: "محمد شادي",
    message: "ألف مبروك! أتمنى لكم حياة سعيدة مليئة بالحب والرحمة والبركة 🌹❤️",
    timestamp: "2025-11-01T21:30:00Z",
    attending: "attending"
  },
  {
    id: 6,
    name: "عمر فوزي",
    message: "مبروك للعروسين الحبيبين! ربنا يبارك لكم ويجعل أيامكم كلها فرح وسعادة 🎉💐",
    timestamp: "2025-11-02T12:00:00Z",
    attending: "attending"
  },
  {
    id: 7,
    name: "محمود فوزي",
    message: "ألف مبروك! أسأل الله أن يجمع بينكما في خير ويرزقكم الذرية الصالحة 🤲💕",
    timestamp: "2025-11-02T15:45:00Z",
    attending: "attending"
  },
  {
    id: 8,
    name: "أم رنا",
    message: "مبروك يا حبايبي! ربنا يتمم لكم على خير ويجعل حياتكم سعيدة ومباركة 🌸💖",
    timestamp: "2025-10-28T19:20:00Z",
    attending: "attending"
  },
  {
    id: 9,
    name: "أم حمزة",
    message: "ألف مبروك للعروسين! ربنا يبارك لكم ويجعل بيتكم عامر بالحب والسعادة 🏡❤️",
    timestamp: "2025-10-29T11:10:00Z",
    attending: "attending"
  }
];

// --- Redis Client (singleton across invocations) ---
let redisClient;
let redisReady = false;

async function getRedis() {
  if (redisReady && redisClient) return redisClient;
  const url = process.env.STORAGE_URL || process.env.REDIS_URL;
  if (!url) {
    throw new Error('STORAGE_URL is not set. Connect your Redis database to the Vercel project.');
  }
  redisClient = createClient({ url });
  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  if (!redisReady) {
    await redisClient.connect();
    redisReady = true;
  }
  return redisClient;
}

// Read wishes from Redis
async function readWishes() {
  try {
    const redis = await getRedis();
    const raw = await redis.get('wedding-wishes');
    if (!raw) {
      // initialize with defaults
      await redis.set('wedding-wishes', JSON.stringify(defaultWishes));
      return defaultWishes;
    }
    const wishes = JSON.parse(raw);
    return Array.isArray(wishes) ? wishes : defaultWishes;
  } catch (error) {
    console.error('Error reading from Redis:', error);
    return defaultWishes;
  }
}

// Write wishes to Redis
async function writeWishes(wishes) {
  try {
    const redis = await getRedis();
    await redis.set('wedding-wishes', JSON.stringify(wishes));
    return true;
  } catch (error) {
    console.error('Error writing to Redis:', error);
    return false;
  }
}

// Validate wish data
function validateWish(wish) {
  const errors = [];
  if (!wish.name || wish.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!wish.message || wish.message.trim().length < 5) {
    errors.push('Message must be at least 5 characters long');
  }
  
  if (!['attending', 'not-attending', 'maybe'].includes(wish.attending)) {
    errors.push('Invalid attendance status');
  }
  
  // Basic profanity filter (you can expand this)
  const profanityWords = ['spam', 'test123']; // Add more as needed
  const messageText = wish.message.toLowerCase();
  if (profanityWords.some(word => messageText.includes(word))) {
    errors.push('Message contains inappropriate content');
  }
  
  return errors;
}

export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    if (req.method === 'GET') {
      // Get all wishes
      const wishes = await readWishes();
      return res.status(200).json({
        success: true,
        wishes: wishes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      });
    }
    
    if (req.method === 'POST') {
      // Add new wish
      console.log('Request body:', req.body); // Debug log
      const { name, message, attending } = req.body || {};
      
      // Validate input
      const wishData = {
        name: name?.trim() || 'ضيف كريم',
        message: message?.trim() || '',
        attending: attending || 'attending'
      };
      
      console.log('Wish data:', wishData); // Debug log
      
      const validationErrors = validateWish(wishData);
      if (validationErrors.length > 0) {
        console.log('Validation errors:', validationErrors); // Debug log
        return res.status(400).json({
          success: false,
          errors: validationErrors
        });
      }
      
      // Create new wish
      const wishes = await readWishes();
      const newWish = {
        id: Date.now(),
        name: wishData.name,
        message: wishData.message,
        timestamp: new Date().toISOString(),
        attending: wishData.attending,
        approved: true // You can add manual approval later if needed
      };
      
      wishes.unshift(newWish); // Add to beginning
      
      // Limit to last 100 wishes to prevent file from getting too large
      if (wishes.length > 100) {
        wishes.splice(100);
      }
      
      await writeWishes(wishes);
      
      return res.status(201).json({
        success: true,
        message: 'Wish added successfully',
        wish: newWish
      });
    }
    
    // Method not allowed
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
