import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  User,
  MapPin,
  Globe,
  Bell,
  Info,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SettingsScreen() {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

  const languages = [
    { id: 'hindi', name: 'हिंदी', nameEng: 'Hindi' },
    { id: 'english', name: 'English', nameEng: 'English' },
    { id: 'marathi', name: 'मराठी', nameEng: 'Marathi' },
    { id: 'kannada', name: 'ಕನ್ನಡ', nameEng: 'Kannada' },
  ];

  const handleLanguageChange = async (languageId: string) => {
    await changeLanguage(languageId);
    setSelectedLanguage(languageId);
    Alert.alert(
      t('languageChanged'),
      t('languageChangedMessage'),
      [{ text: t('ok') }]
    );
  };

  const handleProfileEdit = () => {
    Alert.alert(
      'प्रोफाइल संपादन',
      'प्रोफाइल संपादन सुविधा जल्द ही आएगी।',
      [{ text: 'ठीक है' }]
    );
  };

  const handleLocationChange = () => {
    Alert.alert(
      'स्थान बदलें',
      'स्थान बदलने की सुविधा जल्द ही आएगी।',
      [{ text: 'ठीक है' }]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'किसान मित्र के बारे में',
      'संस्करण: 1.0.0\nविकसित: भारतीय कृषि के लिए\nसहायता: support@kisanmitra.com',
      [{ text: 'ठीक है' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'लॉगआउट करें',
      'क्या आप वाकई लॉगआउट करना चाहते हैं?',
      [
        { text: 'रद्द करें', style: 'cancel' },
        { text: 'हाँ', style: 'destructive' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settingsTitle')}</Text>
        <Text style={styles.headerSubtitle}>{t('settingsSubtitle')}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile')}</Text>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleProfileEdit}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <User size={20} color="#22C55E" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{t('editProfile')}</Text>
                <Text style={styles.settingDescription}>नाम और अन्य जानकारी बदलें</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleLocationChange}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <MapPin size={20} color="#22C55E" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{t('changeLocation')}</Text>
                <Text style={styles.settingDescription}>आपका वर्तमान स्थान</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('languageAndRegion')}</Text>
          
          <TouchableOpacity
            style={styles.settingItem}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Globe size={20} color="#22C55E" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{t('language')}</Text>
                <Text style={styles.settingDescription}>
                  {languages.find(l => l.id === selectedLanguage)?.name}
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* Language Options */}
          <View style={styles.languageOptions}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.languageOption,
                  selectedLanguage === language.id && styles.selectedLanguage,
                ]}
                onPress={() => handleLanguageChange(language.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.languageText,
                    selectedLanguage === language.id && styles.selectedLanguageText,
                  ]}
                >
                  {language.name}
                </Text>
                <Text
                  style={[
                    styles.languageSubtext,
                    selectedLanguage === language.id && styles.selectedLanguageSubtext,
                  ]}
                >
                  {language.nameEng}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('notifications')}</Text>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setNotificationsEnabled(!notificationsEnabled)}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Bell size={20} color="#22C55E" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{t('pushNotifications')}</Text>
                <Text style={styles.settingDescription}>
                  {notificationsEnabled ? t('enabled') : t('disabled')}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.toggle,
                notificationsEnabled && styles.toggleActive,
              ]}
            >
              <View
                style={[
                  styles.toggleHandle,
                  notificationsEnabled && styles.toggleHandleActive,
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('other')}</Text>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleAbout}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Info size={20} color="#22C55E" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{t('aboutApp')}</Text>
                <Text style={styles.settingDescription}>संस्करण और जानकारी</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, styles.logoutItem]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, styles.logoutIcon]}>
                <LogOut size={20} color="#EF4444" />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, styles.logoutText]}>{t('logout')}</Text>
                <Text style={styles.settingDescription}>{t('logoutFromApp')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E5E7EB',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 20,
    marginBottom: 12,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  languageOptions: {
    backgroundColor: '#FFFFFF',
    marginTop: 1,
  },
  languageOption: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginLeft: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectedLanguage: {
    backgroundColor: '#F0FDF4',
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  selectedLanguageText: {
    color: '#22C55E',
  },
  languageSubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  selectedLanguageSubtext: {
    color: '#16A34A',
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D1D5DB',
    padding: 3,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#22C55E',
  },
  toggleHandle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    transform: [{ translateX: 0 }],
  },
  toggleHandleActive: {
    transform: [{ translateX: 20 }],
  },
  logoutItem: {
    marginTop: 8,
  },
  logoutIcon: {
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    color: '#EF4444',
  },
});