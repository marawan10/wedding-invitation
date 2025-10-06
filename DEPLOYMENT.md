# Deployment Guide for Wedding Website

## Vercel Deployment Steps

### 1. Prepare for Deployment
1. Make sure all files are committed to your Git repository
2. Update the API URL in `src/lib/api.js` with your actual Vercel domain

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect it's a React/Vite project
5. Click "Deploy"

### 3. Update API URL
After deployment, update the API_BASE_URL in `src/lib/api.js`:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://YOUR-PROJECT-NAME.vercel.app' // Replace with your actual URL
  : 'http://localhost:3000';
```

### 4. Test the Messages Feature
1. Visit your deployed site
2. Try submitting a message
3. Refresh the page to see if the message appears

## How the Messages System Works

### Backend (Serverless Functions)
- **API Endpoint**: `/api/wishes.js`
- **Storage**: JSON file in `/data/wishes.json`
- **Methods**: 
  - `GET /api/wishes` - Fetch all messages
  - `POST /api/wishes` - Submit new message

### Frontend
- **Real-time Updates**: New messages appear immediately after submission
- **Loading States**: Shows spinner while loading/submitting
- **Error Handling**: Displays error messages if API fails
- **Validation**: Client and server-side validation

### Features
- ✅ Real visitor messages
- ✅ Automatic storage
- ✅ Message validation
- ✅ Basic profanity filter
- ✅ Attendance tracking
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

## Troubleshooting

### Messages Not Saving
1. Check browser console for errors
2. Verify API URL is correct
3. Check Vercel function logs

### API Errors
1. Ensure `/data` directory exists
2. Check file permissions
3. Verify JSON format in wishes.json

### Local Development
```bash
npm run dev
# API will be available at http://localhost:3000/api/wishes
```

## Security Notes
- Messages are stored in a JSON file (suitable for small-medium traffic)
- Basic validation and profanity filtering included
- Consider adding rate limiting for production use
- For high traffic, consider using a database instead

## Customization
- Add more validation rules in `api/wishes.js`
- Modify message display in `src/pages/Wishes.jsx`
- Add moderation features if needed
- Customize styling and animations
