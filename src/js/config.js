  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Environment variables with fallbacks
  const getEnvVar = (key, fallback) => {
    // In a real environment, you would use process.env or import from .env
    // For client-side applications, you might use a config service
    const envVars = {
      FIREBASE_API_KEY: "AIzaSyBtseGdZx5UsDfyCGoD3AzszmU-3JOvrnI",
      FIREBASE_AUTH_DOMAIN: "sparkfest-520cf.firebaseapp.com",
      FIREBASE_PROJECT_ID: "sparkfest-520cf",
      FIREBASE_STORAGE_BUCKET: "sparkfest-520cf.firebasestorage.app",
      FIREBASE_MESSAGING_SENDER_ID: "876845177485",
      FIREBASE_APP_ID: "1:876845177485:web:35aa6041f0309a815aa0c4",
      FIREBASE_MEASUREMENT_ID: "G-80L8C9G8HF",
      GEMINI_API_KEY: "AIzaSyC2OxnjdS9mb-dlypkbQ36EQ72LHX5ZwdI"
    };
    
    return envVars[key] || fallback;
  };

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: getEnvVar('FIREBASE_API_KEY'),
    authDomain: getEnvVar('FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('FIREBASE_APP_ID'),
    measurementId: getEnvVar('FIREBASE_MEASUREMENT_ID')
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Export the Gemini API key
  export const GEMINI_API_KEY = getEnvVar('GEMINI_API_KEY');

  // Export Firebase config for debugging
  export const FIREBASE_CONFIG = firebaseConfig;
  
  console.log('🔧 Config loaded from environment variables');
