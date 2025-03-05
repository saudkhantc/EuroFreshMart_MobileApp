import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../redux/categorySlice'; // Import setSelectedCategory action

const { width, height } = Dimensions.get('window');

const CustomSearchInput = ({ placeholder, selectedCategory, onCategorySelect }) => {
  const [query, setQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const state = useSelector((state) => state.categories); // Your categories state
  const dispatch = useDispatch();

  // Handle input change and filtering
  const handleSearchInput = (inputValue) => {
    setQuery(inputValue);

    if (inputValue) {
      setIsDropdownVisible(true);
      const filtered = state.items.filter((category) =>
        category.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setIsDropdownVisible(false);
      setFilteredCategories([]);
    }
  };

  useEffect(() => {
    if (!query) {
      setFilteredCategories([]);
    }
  }, [query]);

  const handleCategoryClick = (category) => {
    // Dispatch the selected category to Redux
    dispatch(setSelectedCategory(category));
    onCategorySelect(category);  // Update the selected category in the parent component
    setIsDropdownVisible(false);
    setQuery(category.name); // Set search query to selected category name
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="search" size={20} color="#666" />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleSearchInput}
        placeholder={placeholder || 'Search...'}
        placeholderTextColor="#999"
      />

      {/* Dropdown for filtered categories */}
      {isDropdownVisible && filteredCategories.length > 0 && (
        <View style={styles.dropdownContainer}>
          <ScrollView contentContainerStyle={styles.dropdownContent}>
            {filteredCategories.map((category) => (
              <TouchableOpacity
                key={category._id}
                onPress={() => handleCategoryClick(category)} // Dispatch the selected category
              >
                <Text
                  style={[
                    styles.dropdownItem,
                    category._id === selectedCategory?._id && styles.selectedDropdownItem,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
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
    height: 50,
    position: 'relative', // Make sure the dropdown is positioned relative to this container
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  iconContainer: {
    marginRight: 10,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 50,  // This will place the dropdown right below the input field
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    maxHeight: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 1,
    elevation: 5,
  },
  dropdownContent: {
    paddingVertical: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: '#333',
  },
  selectedDropdownItem: {
    backgroundColor: '#ACE03A',  // Highlight selected item in dropdown
    color: '#fff',
  },
});

export default CustomSearchInput;
