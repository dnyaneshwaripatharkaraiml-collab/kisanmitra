import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Camera, Upload, Search } from 'lucide-react-native';

export default function PestDiseaseScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleTakePhoto = () => {
    Alert.alert(
      'कैमरा',
      'कैमरा सुविधा डेमो में उपलब्ध नहीं है।',
      [{ text: 'ठीक है' }]
    );
  };

  const handleUploadPhoto = () => {
    // Simulate image selection
    setSelectedImage('https://images.pexels.com/photos/4992822/pexels-photo-4992822.jpeg?auto=compress&cs=tinysrgb&w=400');
    setTimeout(() => {
      analyzeImage();
    }, 1000);
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      Alert.alert(
        'रोग पहचान परिणाम',
        'पत्तियों में ब्लास्ट रोग (Blast Disease) की पहचान हुई है।\n\nउपचार:\n• कॉपर सल्फेट का छिड़काव करें\n• प्रभावित पत्तियों को हटा दें\n• खेत में जल निकासी सुनिश्चित करें',
        [
          {
            text: 'विस्तार से जानें',
            onPress: () => showDetailedSolution(),
          },
          { text: 'ठीक है' }
        ]
      );
    }, 3000);
  };

  const showDetailedSolution = () => {
    Alert.alert(
      'विस्तृत समाधान',
      'ब्लास्ट रोग एक फंगल इंफेक्शन है जो नमी और गर्मी में बढ़ता है।\n\nतुरंत करने योग्य:\n1. कॉपर सल्फेट (2 ग्राम प्रति लीटर)\n2. प्रभावित पत्तियों को जलाएं\n3. खेत में हवा का प्रवाह बढ़ाएं\n\nरोकथाम:\n• बीज उपचार करें\n• संतुलित खाद डालें\n• फसल चक्र अपनाएं',
      [{ text: 'समझ गया' }]
    );
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
          <Text style={styles.headerTitle}>कीट/रोग पहचान</Text>
          <Text style={styles.headerSubtitle}>फोटो से तुरंत पहचान करें</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Instructions */}
        <View style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>कैसे करें उपयोग?</Text>
          <Text style={styles.instructionText}>
            1. पत्ती या पौधे के प्रभावित हिस्से की स्पष्ट फोटो लें{'\n'}
            2. फोटो अपलोड करें या कैमरे से खींचें{'\n'}
            3. AI तुरंत रोग की पहचान करके उपचार बताएगा
          </Text>
        </View>

        {/* Image Preview */}
        {selectedImage && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            {isAnalyzing && (
              <View style={styles.analyzingOverlay}>
                <Text style={styles.analyzingText}>विश्लेषण हो रहा है...</Text>
                <Text style={styles.analyzingSubtext}>कृपया प्रतीक्षा करें</Text>
              </View>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleTakePhoto}
            activeOpacity={0.7}
          >
            <Camera size={32} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>कैमरे से फोटो लें</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleUploadPhoto}
            activeOpacity={0.7}
          >
            <Upload size={32} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>गैलरी से चुनें</Text>
          </TouchableOpacity>
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>बेहतर परिणाम के लिए सुझाव</Text>
          
          <View style={styles.tip}>
            <View style={styles.tipIcon}>
              <Search size={16} color="#22C55E" />
            </View>
            <Text style={styles.tipText}>फोटो साफ और स्पष्ट होनी चाहिए</Text>
          </View>
          
          <View style={styles.tip}>
            <View style={styles.tipIcon}>
              <Camera size={16} color="#22C55E" />
            </View>
            <Text style={styles.tipText}>प्रभावित हिस्से को पास से दिखाएं</Text>
          </View>
          
          <View style={styles.tip}>
            <View style={styles.tipIcon}>
              <Upload size={16} color="#22C55E" />
            </View>
            <Text style={styles.tipText}>अच्छी रोशनी में फोटो लें</Text>
          </View>
        </View>

        {/* Common Issues */}
        <View style={styles.commonIssues}>
          <Text style={styles.sectionTitle}>आम समस्याएं</Text>
          
          <TouchableOpacity style={styles.issueCard} activeOpacity={0.7}>
            <Text style={styles.issueTitle}>पत्ती धब्बा रोग</Text>
            <Text style={styles.issueDescription}>भूरे धब्बे, पत्तियों का सूखना</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.issueCard} activeOpacity={0.7}>
            <Text style={styles.issueTitle}>ब्लास्ट रोग</Text>
            <Text style={styles.issueDescription}>पत्तियों पर सफेद धब्बे</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.issueCard} activeOpacity={0.7}>
            <Text style={styles.issueTitle}>कीट प्रकोप</Text>
            <Text style={styles.issueDescription}>पत्तियों में छेद, कीड़े दिखना</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
  },
  instructionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6B7280',
  },
  imagePreview: {
    position: 'relative',
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  analyzingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyzingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  analyzingSubtext: {
    fontSize: 14,
    color: '#E5E7EB',
  },
  actionButtons: {
    gap: 16,
    marginBottom: 32,
  },
  actionButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  tipsSection: {
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  commonIssues: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  issueCard: {
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
  issueTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  issueDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});