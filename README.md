# BarangayNav 🏛️

A transparent platform for Barangay services navigation powered by AI assistance and real-time tracking for good governance.

## 🌟 Features

- **🤖 AI-Powered Assistance**: Gemini AI chatbot for instant help with barangay services
- **🔍 Transparent Services**: Clear information about requirements, fees, and processing times
- **📱 Mobile-Responsive**: Works seamlessly on all devices
- **🌙 Modern Dark Theme**: Eye-friendly interface with glassmorphism design
- **⚡ Real-time Support**: 24/7 AI assistance for citizens
- **🛡️ Secure**: Environment-based configuration for API keys

## 🚀 Quick Start

### Prerequisites

- Modern web browser with ES6 module support
- Internet connection for CDN resources
- Firebase project (optional, for advanced features)
- Gemini AI API key

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/barangaynav.git
   cd barangaynav
   ```

2. **Configure Environment Variables**

   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env with your actual API keys
   # Get Gemini API key from: https://makersuite.google.com/app/apikey
   # Get Firebase config from: https://console.firebase.google.com
   ```

3. **Update .env file**

   ```env
   # Your actual API keys
   FIREBASE_API_KEY=your_actual_firebase_api_key
   GEMINI_API_KEY=your_actual_gemini_api_key
   # ... other variables
   ```

4. **Serve the application**

   ```bash
   # Using Python (if installed)
   python -m http.server 8000

   # Using Node.js http-server
   npx http-server

   # Or simply open index.html in your browser
   ```

5. **Access the application**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
barangaynav/
├── index.html              # Main landing page
├── src/
│   ├── auth/
│   │   └── register.html   # Barangay registration page
│   ├── js/
│   │   └── config.js       # Configuration and API keys
│   ├── chatbot/
│   │   └── chatbot.js      # Chatbot implementation
│   └── index.html          # Angular version (if applicable)
├── .env                    # Environment variables (create from .env.example)
├── .env.example            # Environment variables template
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables

The application uses environment variables for secure configuration:

| Variable              | Description              | Required |
| --------------------- | ------------------------ | -------- |
| `GEMINI_API_KEY`      | Google Gemini AI API key | Yes      |
| `FIREBASE_API_KEY`    | Firebase API key         | Optional |
| `FIREBASE_PROJECT_ID` | Firebase project ID      | Optional |

### Getting API Keys

1. **Gemini API Key**:

   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add to your `.env` file

2. **Firebase Config** (Optional):
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project or use existing
   - Get configuration from Project Settings

## 🎨 Features Overview

### AI Chatbot

- **Intelligent Responses**: Powered by Google Gemini AI
- **Local Knowledge Base**: Quick responses for common queries
- **Bilingual Support**: Tagalog and English
- **24/7 Availability**: Always ready to help citizens

### Services Supported

- Barangay Clearance (₱50)
- Barangay ID (₱30)
- Business Permits (₱150+)
- Complaint Filing (Free)
- Certificate of Indigency (Free)

### Modern UI/UX

- Dark theme with glassmorphism effects
- Smooth animations and transitions
- Mobile-first responsive design
- Accessibility-focused interface

## 🛠️ Development

### Local Development

1. Make sure to set up environment variables
2. Use a local server (not file:// protocol) for modules to work
3. Check browser console for any API-related issues

### Adding New Features

- Follow the existing dark theme color scheme
- Maintain responsive design principles
- Test chatbot functionality with various queries
- Update documentation for new environment variables

## 🚀 Deployment

### Before Deployment

1. ✅ Remove all hardcoded API keys
2. ✅ Add `.env` to `.gitignore`
3. ✅ Test with production API keys
4. ✅ Verify all imports work correctly

### Environment Setup

The application automatically loads configuration from `src/js/config.js` which uses environment variables for security.

## 🔒 Security

- **Never commit `.env` files** to version control
- **Use environment variables** for all sensitive data
- **Regularly rotate API keys**
- **Monitor API usage** to detect unauthorized access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- 📧 Email: support@barangaynav.com
- 📞 Phone: +63 912 345 6789
- 💬 Use the AI chatbot for instant help

## 🌟 Acknowledgments

- **Google Gemini AI** for intelligent chatbot responses
- **Firebase** for backend services
- **Bootstrap** for responsive framework
- **Font Awesome** for beautiful icons

---

**Built with ❤️ for transparent governance and better citizen services**
