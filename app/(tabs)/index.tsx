import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import {
  Sprout,
  Search,
  MessageSquare,
  ChevronRight,
  MapPin,
  Droplets,
  Sun,
  TrendingUp,
} from 'lucide-react-native';
import { getStoredUserData } from '@/utils/storage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomeScreen() {
  const { t } = useLanguage();
  const [userName, setUserName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const userData = await getStoredUserData();
    if (userData) {
      setUserName(userData.name || 'Farmer');
      setLocation(userData.location || 'Your Area');
    }
  };

  const handleRecommendationPress = () => {
    router.push('/recommendation-details');
  };

  const handlePestDiseasePress = () => {
    router.push('/pest-disease');
  };

  const handleChatPress = () => {
    router.push('/(tabs)/chatbot');
  };

  const handleMarketPress = () => {
    router.push('/(tabs)/market');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#16A34A" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>{t('greeting')}, {userName}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#FFFFFF" />
              <Text style={styles.location}>{location}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>{t('smartFarmingPartner')}</Text>
            <Text style={styles.heroSubtitle}>{t('betterCropBetterFuture')}</Text>
          </View>
        </View>

        {/* Weather Info */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <Sun size={24} color="#F59E0B" />
            <Text style={styles.weatherTitle}>{t('todaysWeather')}</Text>
          </View>
          <View style={styles.weatherInfo}>
            <Text style={styles.temperature}>28°C</Text>
            <View style={styles.weatherDetails}>
              <View style={styles.weatherItem}>
                <Droplets size={16} color="#3B82F6" />
                <Text style={styles.weatherText}>{t('humidity')}: 65%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recommendation Card */}
        <TouchableOpacity
          style={styles.recommendationCard}
          onPress={handleRecommendationPress}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <Sprout size={24} color="#22C55E" />
            <Text style={styles.cardTitle}>{t('todaysRecommendation')}</Text>
            <ChevronRight size={20} color="#6B7280" />
          </View>
          <View style={styles.recommendationContent}>
            <Text style={styles.cropName}>धान (Rice)</Text>
            <Text style={styles.cropDescription}>
              आपकी मिट्टी और मौसम के अनुसार धान सबसे अच्छा विकल्प है
            </Text>
            <View style={styles.scoreIndicators}>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>{t('profitability')}</Text>
                <View style={styles.scoreBar}>
                  <View style={[styles.scoreFill, { width: '85%', backgroundColor: '#22C55E' }]} />
                </View>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>{t('waterSaving')}</Text>
                <View style={styles.scoreBar}>
                  <View style={[styles.scoreFill, { width: '70%', backgroundColor: '#3B82F6' }]} />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handlePestDiseasePress}
              activeOpacity={0.7}
            >
              <Search size={32} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>{t('pestDiseaseIdentification')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleChatPress}
              activeOpacity={0.7}
            >
              <MessageSquare size={32} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>{t('askAI')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleMarketPress}
              activeOpacity={0.7}
            >
              <TrendingUp size={32} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>{t('marketPrices')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>{t('recentActivity')}</Text>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Sprout size={16} color="#22C55E" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>धान की सिफारिश देखी</Text>
              <Text style={styles.activityTime}>2 घंटे पहले</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <MessageSquare size={16} color="#3B82F6" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>खाद के बारे में पूछा</Text>
              <Text style={styles.activityTime}>कल</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Search size={16} color="#F59E0B" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>पत्तियों का रोग जाँचा</Text>
              <Text style={styles.activityTime}>3 दिन पहले</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#16A34A',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#E5E7EB',
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#E5E7EB',
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  weatherTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  weatherDetails: {
    alignItems: 'flex-end',
  },
  weatherItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginLeft: 12,
  },
  recommendationContent: {
    padding: 20,
  },
  cropName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22C55E',
    marginBottom: 8,
  },
  cropDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  scoreIndicators: {
    gap: 12,
  },
  scoreItem: {
    gap: 6,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  scoreBar: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
  },
  scoreFill: {
    height: 6,
    borderRadius: 3,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#22C55E',
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  recentActivity: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
});