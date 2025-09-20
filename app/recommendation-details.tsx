import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  TrendingUp,
  Droplets,
  Sprout,
  Star,
  Calendar,
  MapPin,
} from 'lucide-react-native';

export default function RecommendationDetailsScreen() {
  const cropData = {
    name: 'धान',
    nameEng: 'Rice',
    variety: 'बासमती 370',
    season: 'खरीफ 2024',
    profitabilityScore: 85,
    waterSustainabilityScore: 70,
    soilHealthScore: 78,
    expectedYield: '45-50 क्विंटल प्रति एकड़',
    marketPrice: '₹2,150 प्रति क्विंटल',
    investmentRequired: '₹25,000-30,000 प्रति एकड़',
    harvestTime: '120-130 दिन',
  };

  const handleGoBack = () => {
    router.back();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22C55E';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'उत्कृष्ट';
    if (score >= 60) return 'अच्छा';
    return 'सुधार की आवश्यकता';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>फसल की सिफारिश</Text>
          <Text style={styles.headerSubtitle}>विस्तृत विश्लेषण</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Crop Header */}
        <View style={styles.cropHeader}>
          <View style={styles.cropInfo}>
            <Text style={styles.cropName}>{cropData.name}</Text>
            <Text style={styles.cropVariety}>{cropData.variety}</Text>
            <View style={styles.seasonInfo}>
              <Calendar size={16} color="#6B7280" />
              <Text style={styles.seasonText}>{cropData.season}</Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Star size={20} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>सिफारिशित</Text>
          </View>
        </View>

        {/* Score Cards */}
        <View style={styles.scoreSection}>
          <Text style={styles.sectionTitle}>मुख्य स्कोर</Text>
          
          <View style={styles.scoreCards}>
            {/* Profitability Card */}
            <View style={styles.scoreCard}>
              <View style={styles.scoreCardHeader}>
                <View style={styles.scoreIcon}>
                  <TrendingUp size={24} color="#22C55E" />
                </View>
                <Text style={styles.scoreCardTitle}>लाभप्रदता</Text>
              </View>
              <View style={styles.scoreDisplay}>
                <Text
                  style={[
                    styles.scoreValue,
                    { color: getScoreColor(cropData.profitabilityScore) },
                  ]}
                >
                  {cropData.profitabilityScore}%
                </Text>
                <Text style={styles.scoreLabel}>
                  {getScoreLabel(cropData.profitabilityScore)}
                </Text>
              </View>
              <View style={styles.scoreBar}>
                <View
                  style={[
                    styles.scoreBarFill,
                    {
                      width: `${cropData.profitabilityScore}%`,
                      backgroundColor: getScoreColor(cropData.profitabilityScore),
                    },
                  ]}
                />
              </View>
            </View>

            {/* Water Sustainability Card */}
            <View style={styles.scoreCard}>
              <View style={styles.scoreCardHeader}>
                <View style={styles.scoreIcon}>
                  <Droplets size={24} color="#3B82F6" />
                </View>
                <Text style={styles.scoreCardTitle}>पानी की बचत</Text>
              </View>
              <View style={styles.scoreDisplay}>
                <Text
                  style={[
                    styles.scoreValue,
                    { color: getScoreColor(cropData.waterSustainabilityScore) },
                  ]}
                >
                  {cropData.waterSustainabilityScore}%
                </Text>
                <Text style={styles.scoreLabel}>
                  {getScoreLabel(cropData.waterSustainabilityScore)}
                </Text>
              </View>
              <View style={styles.scoreBar}>
                <View
                  style={[
                    styles.scoreBarFill,
                    {
                      width: `${cropData.waterSustainabilityScore}%`,
                      backgroundColor: getScoreColor(cropData.waterSustainabilityScore),
                    },
                  ]}
                />
              </View>
            </View>

            {/* Soil Health Card */}
            <View style={styles.scoreCard}>
              <View style={styles.scoreCardHeader}>
                <View style={styles.scoreIcon}>
                  <Sprout size={24} color="#84CC16" />
                </View>
                <Text style={styles.scoreCardTitle}>मिट्टी का स्वास्थ्य</Text>
              </View>
              <View style={styles.scoreDisplay}>
                <Text
                  style={[
                    styles.scoreValue,
                    { color: getScoreColor(cropData.soilHealthScore) },
                  ]}
                >
                  {cropData.soilHealthScore}%
                </Text>
                <Text style={styles.scoreLabel}>
                  {getScoreLabel(cropData.soilHealthScore)}
                </Text>
              </View>
              <View style={styles.scoreBar}>
                <View
                  style={[
                    styles.scoreBarFill,
                    {
                      width: `${cropData.soilHealthScore}%`,
                      backgroundColor: getScoreColor(cropData.soilHealthScore),
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        {/* AI Analysis */}
        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>AI विश्लेषण और सिफारिश</Text>
          <View style={styles.analysisCard}>
            <Text style={styles.analysisText}>
              आपकी मिट्टी की जांच और मौसम के आधार पर, धान (बासमती 370) आपके लिए सबसे उपयुक्त फसल है। 
              इस किस्म की खासियत यह है कि यह कम पानी में भी अच्छी पैदावार देती है और बाजार में इसकी 
              अच्छी कीमत मिलती है।
            </Text>
            <Text style={styles.analysisText}>
              वर्तमान मौसम की स्थिति धान की बुआई के लिए अनुकूल है। आपके क्षेत्र में अगले सप्ताह बारिश 
              की संभावना है जो बुआई के लिए बेहद फायदेमंद होगी। मिट्टी का pH स्तर (6.5) धान के लिए 
              आदर्श है।
            </Text>
            <Text style={styles.analysisText}>
              बाजार विश्लेषण के अनुसार, बासमती धान की मांग निरंतर बढ़ रही है। निर्यात की संभावनाओं 
              के कारण इसकी कीमतें स्थिर रहने की उम्मीद है। पिछले वर्ष की तुलना में 8-10% बेहतर 
              रिटर्न की संभावना है।
            </Text>
          </View>
        </View>

        {/* Key Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>मुख्य जानकारी</Text>
          
          <View style={styles.detailGrid}>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>अपेक्षित उत्पादन</Text>
              <Text style={styles.detailValue}>{cropData.expectedYield}</Text>
            </View>
            
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>बाजार भाव</Text>
              <Text style={styles.detailValue}>{cropData.marketPrice}</Text>
            </View>
            
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>निवेश</Text>
              <Text style={styles.detailValue}>{cropData.investmentRequired}</Text>
            </View>
            
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>कटाई का समय</Text>
              <Text style={styles.detailValue}>{cropData.harvestTime}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.7}
          >
            <Text style={styles.primaryButtonText}>इस फसल को चुनें</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>अन्य विकल्प देखें</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E5E7EB',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  cropHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22C55E',
    marginBottom: 4,
  },
  cropVariety: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  seasonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seasonText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 12,
    color: '#92400E',
    marginLeft: 4,
    fontWeight: '600',
  },
  scoreSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  scoreCards: {
    gap: 16,
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scoreCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreIcon: {
    marginRight: 12,
  },
  scoreCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  scoreBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  scoreBarFill: {
    height: 8,
    borderRadius: 4,
  },
  analysisSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  analysisCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analysisText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 16,
  },
  detailsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  secondaryButtonText: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: '600',
  },
});