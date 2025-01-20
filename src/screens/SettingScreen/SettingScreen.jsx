import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Feather from 'react-native-vector-icons/dist/Feather';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {InterFont} from '../../styles/CustomStyles';

const {width, height} = Dimensions.get('window');

const SettingScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleBackPress}>
              <AntDesign name="arrowleft" size={30} color="#fff" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity>
              <FontAwesome name="shopping-cart" size={30} color="#fff" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.main}>
          <View>
            <Text style={styles.heading}>Settings</Text>
          </View>

          <View style={styles.sectionContainer}>
            <View>
              <Text style={styles.sectionTitle}>Account</Text>
            </View>

            <View style={styles.cardContainer}>
              <TouchableOpacity style={styles.rowContainer}>
                <Feather name="user" size={22} />
                <Text style={styles.rowText}>Edit profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.rowContainer, styles.rowSpacing]}>
                <AntDesign name="bells" size={22} />
                <Text style={styles.rowText}>Notifications</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowContainer}>
                <AntDesign name="exclamationcircleo" size={22} />
                <Text style={styles.rowText}>Terms & Conditions</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <View>
              <Text style={styles.sectionTitle}>Actions</Text>
            </View>

            <View style={styles.cardContainer}>
              <TouchableOpacity style={styles.rowContainer}>
                <AntDesign name="delete" size={22} />
                <Text style={styles.rowText}>Delete Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.rowContainer, styles.rowSpacing]}>
                <MaterialIcons name="logout" size={22} />
                <Text style={styles.rowText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#ACE03A',
    height: height * 0.2,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  iconContainer: {
    top: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  main: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 24,
    fontFamily: InterFont.BoldFont,
  },
  sectionContainer: {
    marginTop: height * 0.04,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: InterFont.SemiBoldFont,
  },
  cardContainer: {
    backgroundColor: '#2427600D',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpacing: {
    marginVertical: 15,
  },
  rowText: {
    fontSize: 16,
    fontFamily: InterFont.SemiBoldFont,
    marginLeft: width * 0.1,
  },
});

export default SettingScreen;
