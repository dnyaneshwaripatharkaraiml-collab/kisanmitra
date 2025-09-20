interface UserData {
  language: string;
  name: string;
  location: string;
}

export const storeUserData = async (userData: UserData): Promise<void> => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('kisanMitraUser', JSON.stringify(userData));
    }
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

export const getStoredUserData = async (): Promise<UserData | null> => {
  try {
    if (typeof localStorage !== 'undefined') {
      const storedData = localStorage.getItem('kisanMitraUser');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

export const clearUserData = async (): Promise<void> => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('kisanMitraUser');
    }
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};