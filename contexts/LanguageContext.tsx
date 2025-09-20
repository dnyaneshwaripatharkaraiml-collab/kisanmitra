import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (languageId: string) => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  hindi: {
    // Home Screen
    greeting: 'नमस्ते',
    yourArea: 'आपका क्षेत्र',
    smartFarmingPartner: 'स्मार्त खेती के लिए आपका साथी',
    betterCropBetterFuture: 'बेहतर फसल, बेहतर भविष्य',
    todaysWeather: 'आज का मौसम',
    humidity: 'नमी',
    todaysRecommendation: 'आज की सिफारिश',
    profitability: 'लाभप्रदता',
    waterSaving: 'पानी की बचत',
    quickActions: 'त्वरित कार्य',
    pestDiseaseIdentification: 'कीट/रोग पहचान',
    askAI: 'AI से पूछें',
    marketPrices: 'बाजार भाव',
    recentActivity: 'हाल की गतिविधि',
    
    // Tabs
    home: 'होम',
    aiAssistant: 'AI असिस्टेंट',
    market: 'मार्केट',
    settings: 'सेटिंग्स',
    
    // Settings Screen
    settingsTitle: 'सेटिंग्स',
    settingsSubtitle: 'अपनी पसंद के अनुसार सेट करें',
    profile: 'प्रोफाइल',
    editProfile: 'प्रोफाइल संपादित करें',
    changeLocation: 'स्थान बदलें',
    languageAndRegion: 'भाषा और क्षेत्र',
    language: 'भाषा',
    notifications: 'सूचनाएं',
    pushNotifications: 'पुश नोटिफिकेशन',
    enabled: 'चालू है',
    disabled: 'बंद है',
    other: 'अन्य',
    aboutApp: 'ऐप के बारे में',
    logout: 'लॉगआउट',
    logoutFromApp: 'ऐप से बाहर निकलें',
    languageChanged: 'भाषा बदली गई',
    languageChangedMessage: 'आपकी भाषा सफलतापूर्वक बदल दी गई है।',
    ok: 'ठीक है',
    
    // Chatbot Screen
    chatbotTitle: 'AI असिस्टेंट',
    chatbotSubtitle: 'खेती की सलाह के लिए पूछें',
    askQuestion: 'अपना सवाल यहाँ लिखें...',
    
    // Market Screen
    marketTitle: 'बाजार भाव',
    marketSubtitle: 'आज के ताजा दाम',
    today: 'आज',
    week: 'सप्ताह',
    month: 'महीना',
    updated: 'अपडेट',
    marketAnalysis: 'बाजार विश्लेषण',
    
    // Pest Disease Screen
    pestDiseaseTitle: 'कीट/रोग पहचान',
    pestDiseaseSubtitle: 'फोटो से तुरंत पहचान करें',
    howToUse: 'कैसे करें उपयोग?',
    takePhoto: 'कैमरे से फोटो लें',
    selectFromGallery: 'गैलरी से चुनें',
    
    // Common
    back: 'पीछे',
    next: 'आगे',
    start: 'शुरू करें',
    cancel: 'रद्द करें',
    yes: 'हाँ',
    no: 'नहीं',
  },
  english: {
    // Home Screen
    greeting: 'Hello',
    yourArea: 'Your Area',
    smartFarmingPartner: 'Your Smart Farming Partner',
    betterCropBetterFuture: 'Better Crop, Better Future',
    todaysWeather: 'Today\'s Weather',
    humidity: 'Humidity',
    todaysRecommendation: 'Today\'s Recommendation',
    profitability: 'Profitability',
    waterSaving: 'Water Saving',
    quickActions: 'Quick Actions',
    pestDiseaseIdentification: 'Pest/Disease ID',
    askAI: 'Ask AI',
    marketPrices: 'Market Prices',
    recentActivity: 'Recent Activity',
    
    // Tabs
    home: 'Home',
    aiAssistant: 'AI Assistant',
    market: 'Market',
    settings: 'Settings',
    
    // Settings Screen
    settingsTitle: 'Settings',
    settingsSubtitle: 'Customize your preferences',
    profile: 'Profile',
    editProfile: 'Edit Profile',
    changeLocation: 'Change Location',
    languageAndRegion: 'Language & Region',
    language: 'Language',
    notifications: 'Notifications',
    pushNotifications: 'Push Notifications',
    enabled: 'Enabled',
    disabled: 'Disabled',
    other: 'Other',
    aboutApp: 'About App',
    logout: 'Logout',
    logoutFromApp: 'Exit from app',
    languageChanged: 'Language Changed',
    languageChangedMessage: 'Your language has been successfully changed.',
    ok: 'OK',
    
    // Chatbot Screen
    chatbotTitle: 'AI Assistant',
    chatbotSubtitle: 'Ask for farming advice',
    askQuestion: 'Type your question here...',
    
    // Market Screen
    marketTitle: 'Market Prices',
    marketSubtitle: 'Today\'s fresh prices',
    today: 'Today',
    week: 'Week',
    month: 'Month',
    updated: 'Updated',
    marketAnalysis: 'Market Analysis',
    
    // Pest Disease Screen
    pestDiseaseTitle: 'Pest/Disease ID',
    pestDiseaseSubtitle: 'Instant identification from photo',
    howToUse: 'How to use?',
    takePhoto: 'Take Photo',
    selectFromGallery: 'Select from Gallery',
    
    // Common
    back: 'Back',
    next: 'Next',
    start: 'Start',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
  },
  marathi: {
    // Home Screen
    greeting: 'नमस्कार',
    yourArea: 'तुमचा परिसर',
    smartFarmingPartner: 'स्मार्ट शेतीसाठी तुमचा साथी',
    betterCropBetterFuture: 'चांगले पीक, चांगले भविष्य',
    todaysWeather: 'आजचे हवामान',
    humidity: 'आर्द्रता',
    todaysRecommendation: 'आजची शिफारस',
    profitability: 'नफा',
    waterSaving: 'पाणी बचत',
    quickActions: 'त्वरित कृती',
    pestDiseaseIdentification: 'कीड/रोग ओळख',
    askAI: 'AI ला विचारा',
    marketPrices: 'बाजार भाव',
    recentActivity: 'अलीकडील क्रियाकलाप',
    
    // Tabs
    home: 'होम',
    aiAssistant: 'AI सहाय्यक',
    market: 'मार्केट',
    settings: 'सेटिंग्ज',
    
    // Settings Screen
    settingsTitle: 'सेटिंग्ज',
    settingsSubtitle: 'तुमच्या आवडीनुसार सेट करा',
    profile: 'प्रोफाइल',
    editProfile: 'प्रोफाइल संपादित करा',
    changeLocation: 'स्थान बदला',
    languageAndRegion: 'भाषा आणि प्रदेश',
    language: 'भाषा',
    notifications: 'सूचना',
    pushNotifications: 'पुश नोटिफिकेशन',
    enabled: 'चालू आहे',
    disabled: 'बंद आहे',
    other: 'इतर',
    aboutApp: 'अॅपबद्दल',
    logout: 'लॉगआउट',
    logoutFromApp: 'अॅपमधून बाहेर पडा',
    languageChanged: 'भाषा बदलली',
    languageChangedMessage: 'तुमची भाषा यशस्वीरित्या बदलली आहे.',
    ok: 'ठीक आहे',
    
    // Chatbot Screen
    chatbotTitle: 'AI सहाय्यक',
    chatbotSubtitle: 'शेतीच्या सल्ल्यासाठी विचारा',
    askQuestion: 'तुमचा प्रश्न येथे लिहा...',
    
    // Market Screen
    marketTitle: 'बाजार भाव',
    marketSubtitle: 'आजचे ताजे दर',
    today: 'आज',
    week: 'आठवडा',
    month: 'महिना',
    updated: 'अपडेट',
    marketAnalysis: 'बाजार विश्लेषण',
    
    // Pest Disease Screen
    pestDiseaseTitle: 'कीड/रोग ओळख',
    pestDiseaseSubtitle: 'फोटोवरून तत्काळ ओळख',
    howToUse: 'कसे वापरावे?',
    takePhoto: 'फोटो काढा',
    selectFromGallery: 'गॅलरीतून निवडा',
    
    // Common
    back: 'मागे',
    next: 'पुढे',
    start: 'सुरू करा',
    cancel: 'रद्द करा',
    yes: 'होय',
    no: 'नाही',
  },
  kannada: {
    // Home Screen
    greeting: 'ನಮಸ್ಕಾರ',
    yourArea: 'ನಿಮ್ಮ ಪ್ರದೇಶ',
    smartFarmingPartner: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿಗಾಗಿ ನಿಮ್ಮ ಸಹಾಯಕ',
    betterCropBetterFuture: 'ಉತ್ತಮ ಬೆಳೆ, ಉತ್ತಮ ಭವಿಷ್ಯ',
    todaysWeather: 'ಇಂದಿನ ಹವಾಮಾನ',
    humidity: 'ಆರ್ದ್ರತೆ',
    todaysRecommendation: 'ಇಂದಿನ ಶಿಫಾರಸು',
    profitability: 'ಲಾಭದಾಯಕತೆ',
    waterSaving: 'ನೀರಿನ ಉಳಿತಾಯ',
    quickActions: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು',
    pestDiseaseIdentification: 'ಕೀಟ/ರೋಗ ಗುರುತಿಸುವಿಕೆ',
    askAI: 'AI ಯನ್ನು ಕೇಳಿ',
    marketPrices: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು',
    recentActivity: 'ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ',
    
    // Tabs
    home: 'ಮನೆ',
    aiAssistant: 'AI ಸಹಾಯಕ',
    market: 'ಮಾರುಕಟ್ಟೆ',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    
    // Settings Screen
    settingsTitle: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    settingsSubtitle: 'ನಿಮ್ಮ ಆದ್ಯತೆಗಳನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ',
    profile: 'ಪ್ರೊಫೈಲ್',
    editProfile: 'ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ',
    changeLocation: 'ಸ್ಥಳ ಬದಲಾಯಿಸಿ',
    languageAndRegion: 'ಭಾಷೆ ಮತ್ತು ಪ್ರದೇಶ',
    language: 'ಭಾಷೆ',
    notifications: 'ಅಧಿಸೂಚನೆಗಳು',
    pushNotifications: 'ಪುಶ್ ಅಧಿಸೂಚನೆಗಳು',
    enabled: 'ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ',
    disabled: 'ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ',
    other: 'ಇತರೆ',
    aboutApp: 'ಅಪ್ಲಿಕೇಶನ್ ಬಗ್ಗೆ',
    logout: 'ಲಾಗ್‌ಔಟ್',
    logoutFromApp: 'ಅಪ್ಲಿಕೇಶನ್‌ನಿಂದ ನಿರ್ಗಮಿಸಿ',
    languageChanged: 'ಭಾಷೆ ಬದಲಾಯಿಸಲಾಗಿದೆ',
    languageChangedMessage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾಯಿಸಲಾಗಿದೆ.',
    ok: 'ಸರಿ',
    
    // Chatbot Screen
    chatbotTitle: 'AI ಸಹಾಯಕ',
    chatbotSubtitle: 'ಕೃಷಿ ಸಲಹೆಗಾಗಿ ಕೇಳಿ',
    askQuestion: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...',
    
    // Market Screen
    marketTitle: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು',
    marketSubtitle: 'ಇಂದಿನ ತಾಜಾ ಬೆಲೆಗಳು',
    today: 'ಇಂದು',
    week: 'ವಾರ',
    month: 'ತಿಂಗಳು',
    updated: 'ನವೀಕರಿಸಲಾಗಿದೆ',
    marketAnalysis: 'ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ',
    
    // Pest Disease Screen
    pestDiseaseTitle: 'ಕೀಟ/ರೋಗ ಗುರುತಿಸುವಿಕೆ',
    pestDiseaseSubtitle: 'ಫೋಟೋದಿಂದ ತ್ವರಿತ ಗುರುತಿಸುವಿಕೆ',
    howToUse: 'ಹೇಗೆ ಬಳಸುವುದು?',
    takePhoto: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
    selectFromGallery: 'ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ',
    
    // Common
    back: 'ಹಿಂದೆ',
    next: 'ಮುಂದೆ',
    start: 'ಪ್ರಾರಂಭಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    yes: 'ಹೌದು',
    no: 'ಇಲ್ಲ',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('hindi');

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      if (typeof localStorage !== 'undefined') {
        const savedLanguage = localStorage.getItem('kisanMitraLanguage');
        if (savedLanguage && translations[savedLanguage as keyof typeof translations]) {
          setCurrentLanguage(savedLanguage);
        }
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    }
  };

  const changeLanguage = async (languageId: string) => {
    try {
      if (translations[languageId as keyof typeof translations]) {
        setCurrentLanguage(languageId);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('kisanMitraLanguage', languageId);
        }
      }
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    const languageTranslations = translations[currentLanguage as keyof typeof translations];
    return languageTranslations?.[key as keyof typeof languageTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};