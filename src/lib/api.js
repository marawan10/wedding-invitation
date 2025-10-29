// API utility functions for wishes

// Determine if we're in development or production
const isDevelopment = import.meta.env.DEV;

// In development, we'll use fallback data since there's no backend
// In production on Vercel, use relative URLs to hit the serverless functions
const API_BASE_URL = isDevelopment ? null : '';

// Store all wishes in memory (in a real app, this would be a database)
let allWishes = [
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

// Fetch all wishes
export async function fetchWishes() {
  // In development, return fallback data immediately
  if (isDevelopment) {
    console.log('Development mode: Using fallback wishes data');
    return allWishes;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/wishes`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.wishes || [];
  } catch (error) {
    console.error('Error fetching wishes:', error);
    // Return fallback data if API fails
    return allWishes;
  }
}

// Submit a new wish
export async function submitWish(wishData) {
  // Create the new wish object
  const newWish = {
    id: Date.now(),
    name: wishData.name,
    message: wishData.message,
    timestamp: new Date().toISOString(),
    attending: wishData.attending || 'attending'
  };

  // In development, just add to local storage and return
  if (isDevelopment) {
    console.log('Development mode: Adding wish to local storage');
    allWishes = [newWish, ...allWishes];
    return { wish: newWish };
  }

  // In production, try to submit to API
  try {
    const response = await fetch(`${API_BASE_URL}/api/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wishData),
    });
    
    // First check if response is ok
    if (!response.ok) {
      let errorMessage = 'Failed to submit wish';
      try {
        // Try to parse error response as JSON
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.errors?.join(', ') || errorMessage;
      } catch (e) {
        // If we can't parse JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    // If response is ok, parse the JSON
    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      // If we can't parse JSON, use the newWish we created
      allWishes = [newWish, ...allWishes];
      return { wish: newWish };
    }
    
    // If we got a valid response with a wish, use it
    if (data.wish) {
      allWishes = [data.wish, ...allWishes];
      return data;
    }
    
    // Otherwise use the newWish we created
    allWishes = [newWish, ...allWishes];
    return { wish: newWish };
    
  } catch (error) {
    console.error('Error submitting wish:', error);
    // In production, if API fails, still add to local storage as fallback
    allWishes = [newWish, ...allWishes];
    console.warn('API submission failed, wish added to local storage only');
    return { wish: newWish };
  }
}

// Get all messages (including those not shown by default)
export async function getAllWishes() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/wishes`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.wishes || [];
  } catch (error) {
    console.error('Error fetching all wishes:', error);
    return allWishes;
  }
}

// Get API URL for the current environment
export function getApiUrl() {
  return API_BASE_URL;
}
