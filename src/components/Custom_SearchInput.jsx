import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const {width, height} = Dimensions.get('window');

const CustomSearchInput = ({value, onChange, placeholder}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="search" size={20} color="#666" />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || 'Search...'}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: '#fff',
    width: width * 0.8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  iconContainer: {
    // marginLeft: 10,
  },
});

export default CustomSearchInput;
