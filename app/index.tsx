import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { getStoredUserData } from '@/utils/storage';

export default function IndexScreen() {
  useEffect(() => {
    checkUserOnboarding();
  }, []);

  const checkUserOnboarding = async () => {
    try {
      const userData = await getStoredUserData();
      
      if (userData && userData.name) {
        // User has completed onboarding, go to main app
        router.replace('/(tabs)');
      } else {
        // User needs to complete onboarding
        router.replace('/onboarding');
      }
    } catch (error) {
      // If there's an error, default to onboarding
      router.replace('/onboarding');
    }
  };

  return (
    <View style={styles.container}>
      {/* Loading screen - will be replaced by navigation */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16A34A',
  },
});