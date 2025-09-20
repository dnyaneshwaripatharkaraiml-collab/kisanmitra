import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Send, Mic, Volume2 } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'नमस्ते! मैं किसान मित्र का AI असिस्टेंट हूँ। आप खेती के बारे में कुछ भी पूछ सकते हैं।',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('धान') || lowerInput.includes('rice')) {
      return 'धान की खेती के लिए अच्छी दोमट मिट्टी और पर्याप्त पानी की जरूरत होती है। बुआई जून-जुलाई में करें। प्रति एकड़ 20-25 किलो बीज का उपयोग करें।';
    }
    
    if (lowerInput.includes('खाद') || lowerInput.includes('fertilizer')) {
      return 'मिट्टी परीक्षण के आधार पर खाद डालें। नाइट्रोजन, फॉस्फोरस और पोटाश का संतुलित उपयोग करें। जैविक खाद का प्रयोग बेहतर है।';
    }
    
    if (lowerInput.includes('कीट') || lowerInput.includes('pest')) {
      return 'कीट प्रबंधन के लिए पहले प्राकृतिक तरीकों का उपयोग करें। नीम का तेल, जैविक कीटनाशक का प्रयोग करें। रासायनिक दवा अंतिम विकल्प है।';
    }
    
    if (lowerInput.includes('मौसम') || lowerInput.includes('weather')) {
      return 'आज का मौसम अच्छा है। तापमान 28°C, नमी 65%। अगले 3 दिन बारिश की संभावना है। खेत की तैयारी कर लें।';
    }
    
    return 'यह एक बहुत अच्छा सवाल है। मैं आपकी स्थितिAL में सर्वोत्तम समाधान सुझाऊंगा। क्या आप अपनी मिट्टी और खेत के बारे में और बताना चाहेंगे?';
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice input
      Alert.alert(
        'वॉइस इनपुट',
        'वॉइस सुविधा डेमो में उपलब्ध नहीं है। कृपया टेक्स्ट का उपयोग करें।',
        [{ text: 'ठीक है' }]
      );
    }
  };

  const handleTextToSpeech = (text: string) => {
    Alert.alert(
      'आवाज सुविधा',
      'टेक्स्ट-टू-स्पीच सुविधा डेमो में उपलब्ध नहीं है।',
      [{ text: 'ठीक है' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI असिस्टेंट</Text>
        <Text style={styles.headerSubtitle}>खेती की सलाह के लिए पूछें</Text>
      </View>

      <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageItem,
              message.isUser ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.botMessageText,
              ]}
            >
              {message.text}
            </Text>
            {!message.isUser && (
              <TouchableOpacity
                style={styles.speakButton}
                onPress={() => handleTextToSpeech(message.text)}
              >
                <Volume2 size={16} color="#22C55E" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="अपना सवाल यहाँ लिखें..."
          placeholderTextColor="#9CA3AF"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        
        <TouchableOpacity
          style={[styles.inputButton, styles.voiceButton]}
          onPress={handleVoiceInput}
          activeOpacity={0.7}
        >
          <Mic size={20} color={isListening ? '#EF4444' : '#6B7280'} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.inputButton, styles.sendButton]}
          onPress={sendMessage}
          activeOpacity={0.7}
          disabled={!inputText.trim()}
        >
          <Send size={20} color="#FFFFFF" />
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
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
  },
  messageItem: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    padding: 12,
    borderRadius: 12,
  },
  userMessageText: {
    backgroundColor: '#22C55E',
    color: '#FFFFFF',
  },
  botMessageText: {
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
  },
  speakButton: {
    marginTop: 8,
    padding: 8,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  inputButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  voiceButton: {
    backgroundColor: '#F3F4F6',
  },
  sendButton: {
    backgroundColor: '#22C55E',
  },
});