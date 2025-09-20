import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, MapPin, User } from 'lucide-react-native';
import { storeUserData } from '@/utils/storage';

interface UserData {
  language: string;
  name: string;
  location: string;
}

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    language: 'hindi',
    name: '',
    location: '',
  });

  const languages = [
    { id: 'hindi', name: 'हिंदी', nameEng: 'Hindi' },
    { id: 'english', name: 'English', nameEng: 'English' },
    { id: 'marathi', name: 'मराठी', nameEng: 'Marathi' },
    { id: 'kannada', name: 'ಕನ್ನಡ', nameEng: 'Kannada' },
  ];

  const handleLanguageSelect = (languageId: string) => {
    setUserData(prev => ({ ...prev, language: languageId }));
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!userData.name.trim()) {
        Alert.alert('त्रुटि', 'कृपया अपना नाम दर्ज करें');
        return;
      }
      if (!userData.location.trim()) {
        Alert.alert('त्रुटि', 'कृपया अपना स्थान दर्ज करें');
        return;
      }
      setCurrentStep(3);
    } else {
      // Save user data and navigate to main app
      await storeUserData(userData);
      router.replace('/(tabs)');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>भाषा चुनें</Text>
      <Text style={styles.stepDescription}>
        अपनी पसंदीदा भाषा चुनें
      </Text>
      
      <View style={styles.languageOptions}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.id}
            style={[
              styles.languageOption,
              userData.language === language.id && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageSelect(language.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.languageText,
                userData.language === language.id && styles.selectedLanguageText,
              ]}
            >
              {language.name}
            </Text>
            <Text
              style={[
                styles.languageSubtext,
                userData.language === language.id && styles.selectedLanguageSubtext,
              ]}
            >
              {language.nameEng}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>व्यक्तिगत जानकारी</Text>
      <Text style={styles.stepDescription}>
        हमें आपके बारे में बताएं
      </Text>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <View style={styles.inputIcon}>
            <User size={20} color="#22C55E" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="आपका नाम"
            placeholderTextColor="#9CA3AF"
            value={userData.name}
            onChangeText={(text) => setUserData(prev => ({ ...prev, name: text }))}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <View style={styles.inputIcon}>
            <MapPin size={20} color="#22C55E" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="आपका गाँव/शहर"
            placeholderTextColor="#9CA3AF"
            value={userData.location}
            onChangeText={(text) => setUserData(prev => ({ ...prev, location: text }))}
          />
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>किसान मित्र में आपका स्वागत है!</Text>
      <Text style={styles.stepDescription}>
        स्मार्त खेती के लिए तैयार हैं?
      </Text>
      
      <Image
        source={{ uri: 'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=600' }}
        style={styles.tutorialImage}
      />
      
      <View style={styles.featureList}>
        <View style={styles.featureItem}>
          <View style={styles.featureBullet} />
          <Text style={styles.featureText}>AI से फसल की सिफारिश</Text>
        </View>
        
        <View style={styles.featureItem}>
          <View style={styles.featureBullet} />
          <Text style={styles.featureText}>कीट/रोग की तुरंत पहचान</Text>
        </View>
        
        <View style={styles.featureItem}>
          <View style={styles.featureBullet} />
          <Text style={styles.featureText}>लाइव बाजार के दाम</Text>
        </View>
        
        <View style={styles.featureItem}>
          <View style={styles.featureBullet} />
          <Text style={styles.featureText}>24/7 AI सहायक</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.stepIndicator}>
          {[1, 2, 3].map((step) => (
            <View
              key={step}
              style={[
                styles.stepDot,
                currentStep >= step && styles.activeStepDot,
              ]}
            />
          ))}
        </View>
        
        <Text style={styles.stepCounter}>{currentStep} / 3</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        {currentStep > 1 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>पीछे</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === 3 ? 'शुरू करें' : 'आगे'}
          </Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepIndicator: {
    flexDirection: 'row',
    gap: 8,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D1D5DB',
  },
  activeStepDot: {
    backgroundColor: '#22C55E',
  },
  stepCounter: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  languageOptions: {
    gap: 12,
  },
  languageOption: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  selectedLanguage: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  languageText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  selectedLanguageText: {
    color: '#22C55E',
  },
  languageSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedLanguageSubtext: {
    color: '#16A34A',
  },
  inputContainer: {
    gap: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  tutorialImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 32,
  },
  featureList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  navigation: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
    gap: 12,
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22C55E',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});