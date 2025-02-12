// import AsyncStorage from '@react-native-async-storage/async-storage';

// class StorageManager {
//   static async get(key) {
//     try {
//       const value = await AsyncStorage.getItem(key);
//       if (value !== null) {
//         return JSON.parse(value); // Returning parsed value
//       }
//       return null;
//     } catch (error) {
//       console.error(`Error getting value for key ${key}:`, error);
//       return null;
//     }
//   }

//   static async set(key, value) {
//     try {
//       await AsyncStorage.setItem(key, JSON.stringify(value)); // Store the value as a string
//     } catch (error) {
//       console.error(`Error setting value for key ${key}:`, error);
//     }
//   }

//   static async remove(key) {
//     try {
//       await AsyncStorage.removeItem(key); // Remove the item from AsyncStorage
//     } catch (error) {
//       console.error(`Error removing value for key ${key}:`, error);
//     }
//   }
// }

// export default StorageManager;
import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageManager {
  // Get item from AsyncStorage
  static async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // Try to parse the value if it's in JSON format
        try {
          return JSON.parse(value); // If it's a valid JSON string, return the parsed object
        } catch (parseError) {
          console.warn(`Stored value for key "${key}" is not JSON. Returning raw value.`);
          return value; // If it's not JSON, just return the raw value
        }
      }
      return null; // Return null if no value found for the key
    } catch (error) {
      console.error(`Error getting value for key "${key}":`, error.message || error);
      return null; // Return null if there was an error
    }
  }

  // Set item in AsyncStorage
  static async set(key, value) {
    try {
      // Store everything as JSON (except null or undefined values)
      const valueToStore = (value !== null && value !== undefined && typeof value === 'object')
        ? JSON.stringify(value)  // If it's an object, convert to JSON
        : String(value);         // Otherwise, convert to string

      await AsyncStorage.setItem(key, valueToStore); // Store the value
    } catch (error) {
      console.error(`Error setting value for key "${key}":`, error.message || error);
    }
  }

  // Remove item from AsyncStorage
  static async remove(key) {
    try {
      await AsyncStorage.removeItem(key); // Remove item
    } catch (error) {
      console.error(`Error removing value for key "${key}":`, error.message || error);
    }
  }
}

export default StorageManager;
