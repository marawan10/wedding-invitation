// API endpoint for handling wishes/messages
// Using in-memory storage for Vercel serverless environment

// In-memory storage (resets on each deployment)
let wishesStore = [
  {
    id: 1,
    name: "مروان مختار",
    message: "بارك الله لكما وبارك عليكما وجمع بينكما في خير، وجعل أيامكما سعادةً ومودّة ورحمة.❤️🤍",
    timestamp: "2025-10-05T20:30:00Z",
    attending: "attending"
  },
  {
    id: 2,
    name: "فاطمة أحمد",
    message: "ألف مبروك للعروسين الحبيبين! أسأل الله أن يبارك لكما ويجمع بينكما في خير وسعادة دائمة 💕✨",
    timestamp: "2025-10-04T18:45:00Z",
    attending: "attending"
  },
  {
    id: 3,
    name: "أحمد محمد",
    message: "مبروك للعروسين! أتمنى لكما حياة مليئة بالحب والسعادة والأطفال الصالحين 🎉💖",
    timestamp: "2025-10-03T15:20:00Z",
    attending: "attending"
  }
];

// Read wishes from memory
async function readWishes() {
  return wishesStore;
}

// Write wishes to memory
async function writeWishes(wishes) {
  wishesStore = wishes;
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
      const { name, message, attending } = req.body;
      
      // Validate input
      const wishData = {
        name: name?.trim() || '',
        message: message?.trim() || '',
        attending: attending || 'attending'
      };
      
      const validationErrors = validateWish(wishData);
      if (validationErrors.length > 0) {
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
