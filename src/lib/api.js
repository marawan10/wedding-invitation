// API utility functions for wishes

const API_BASE_URL = typeof window !== 'undefined' 
  ? window.location.origin // Use current domain in browser
  : 'https://wedding-invitation-khaki-nine.vercel.app'; // Fallback for server-side

// Fetch all wishes
export async function fetchWishes() {
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
    return [
      {
        id: 1,
        name: "مروان مختار",
        message: "بارك الله لكما وبارك عليكما وجمع بينكما في خير، وجعل أيامكما سعادةً ومودّة ورحمة.❤️🤍",
        timestamp: "2025-10-05T20:30:00Z",
        attending: "attending"
      }
    ];
  }
}

// Submit a new wish
export async function submitWish(wishData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wishData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.errors ? data.errors.join(', ') : 'Failed to submit wish');
    }
    
    return data;
  } catch (error) {
    console.error('Error submitting wish:', error);
    throw error;
  }
}

// Get API URL for the current environment
export function getApiUrl() {
  return API_BASE_URL;
}
