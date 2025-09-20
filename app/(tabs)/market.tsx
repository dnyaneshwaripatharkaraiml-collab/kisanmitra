import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react-native';

interface MarketPrice {
  crop: string;
  cropHindi: string;
  price: number;
  change: number;
  unit: string;
  market: string;
}

export default function MarketScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  
  const marketData: MarketPrice[] = [
    { crop: 'Rice', cropHindi: 'धान', price: 2150, change: 5.2, unit: 'प्रति क्विंटल', market: 'मंडी मार्केट' },
    { crop: 'Wheat', cropHindi: 'गेहूं', price: 2300, change: -2.1, unit: 'प्रति क्विंटल', market: 'मंडी मार्केट' },
    { crop: 'Sugarcane', cropHindi: 'गन्ना', price: 350, change: 1.8, unit: 'प्रति क्विंटल', market: 'चीनी मिल' },
    { crop: 'Cotton', cropHindi: 'कपास', price: 6500, change: 8.3, unit: 'प्रति क्विंटल', market: 'कपास मंडी' },
    { crop: 'Onion', cropHindi: 'प्याज', price: 1200, change: -12.5, unit: 'प्रति क्विंटल', market: 'सब्जी मंडी' },
    { crop: 'Tomato', cropHindi: 'टमाटर', price: 800, change: 15.2, unit: 'प्रति क्विंटल', market: 'सब्जी मंडी' },
    { crop: 'Potato', cropHindi: 'आलू', price: 900, change: -3.7, unit: 'प्रति क्विंटल', market: 'सब्जी मंडी' },
    { crop: 'Maize', cropHindi: 'मक्का', price: 1850, change: 4.1, unit: 'प्रति क्विंटल', market: 'मंडी मार्केट' },
  ];

  const periods = [
    { id: 'today', label: 'आज' },
    { id: 'week', label: 'सप्ताह' },
    { id: 'month', label: 'महीना' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>बाजार भाव</Text>
        <Text style={styles.headerSubtitle}>आज के ताजा दाम</Text>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            style={[
              styles.periodButton,
              selectedPeriod === period.id && styles.activePeriodButton,
            ]}
            onPress={() => setSelectedPeriod(period.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === period.id && styles.activePeriodButtonText,
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Market Info */}
      <View style={styles.marketInfo}>
        <Calendar size={16} color="#6B7280" />
        <Text style={styles.marketInfoText}>
          अपडेट: आज, सुबह 10:30 बजे
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Price Cards */}
        <View style={styles.priceGrid}>
          {marketData.map((item, index) => (
            <View key={index} style={styles.priceCard}>
              <View style={styles.priceHeader}>
                <View>
                  <Text style={styles.cropName}>{item.cropHindi}</Text>
                  <Text style={styles.cropNameEng}>{item.crop}</Text>
                </View>
                <View style={styles.changeContainer}>
                  {item.change >= 0 ? (
                    <TrendingUp size={16} color="#22C55E" />
                  ) : (
                    <TrendingDown size={16} color="#EF4444" />
                  )}
                  <Text
                    style={[
                      styles.changeText,
                      { color: item.change >= 0 ? '#22C55E' : '#EF4444' },
                    ]}
                  >
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </Text>
                </View>
              </View>
              
              <View style={styles.priceDetails}>
                <Text style={styles.price}>₹{item.price}</Text>
                <Text style={styles.unit}>{item.unit}</Text>
              </View>
              
              <Text style={styles.market}>{item.market}</Text>
            </View>
          ))}
        </View>

        {/* Market Analysis */}
        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>बाजार विश्लेषण</Text>
          
          <View style={styles.analysisCard}>
            <Text style={styles.analysisTitle}>सप्ताह का सर्वश्रेष्ठ प्रदर्शन</Text>
            <View style={styles.topPerformer}>
              <View style={styles.performerIcon}>
                <TrendingUp size={20} color="#22C55E" />
              </View>
              <View style={styles.performerContent}>
                <Text style={styles.performerName}>टमाटर (Tomato)</Text>
                <Text style={styles.performerChange}>+15.2% की बढ़त</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.analysisCard}>
            <Text style={styles.analysisTitle}>सप्ताह का सबसे कम प्रदर्शन</Text>
            <View style={styles.topPerformer}>
              <View style={[styles.performerIcon, { backgroundColor: '#FEF2F2' }]}>
                <TrendingDown size={20} color="#EF4444" />
              </View>
              <View style={styles.performerContent}>
                <Text style={styles.performerName}>प्याज (Onion)</Text>
                <Text style={[styles.performerChange, { color: '#EF4444' }]}>-12.5% की गिरावट</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Market Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>बाजार सुझाव</Text>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>बेचने का सुझाव</Text>
            <Text style={styles.tipContent}>
              टमाटर और कपास के दाम बढ़ रहे हैं। अगर आपके पास स्टॉक है तो बेचने का अच्छा समय है।
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>खरीदने का सुझाव</Text>
            <Text style={styles.tipContent}>
              प्याज के दाम गिर रहे हैं। अगले महीने बढ़ने की संभावना है।
            </Text>
          </View>
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
  periodSelector: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activePeriodButton: {
    backgroundColor: '#22C55E',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activePeriodButtonText: {
    color: '#FFFFFF',
  },
  marketInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  marketInfoText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  priceGrid: {
    paddingHorizontal: 20,
    gap: 12,
  },
  priceCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cropNameEng: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceDetails: {
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22C55E',
  },
  unit: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  market: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  analysisSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  analysisCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  analysisTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
  },
  topPerformer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  performerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  performerContent: {
    flex: 1,
  },
  performerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  performerChange: {
    fontSize: 14,
    color: '#22C55E',
    marginTop: 2,
  },
  tipsSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  tipContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});