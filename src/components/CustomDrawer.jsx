import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import Logo from '../assets/images/apnadookan.png';
import { InterFont } from '../styles/CustomStyles';

const {width, height} = Dimensions.get('window');

const CustomDrawer = ({visible, onClose, children}) => {
  const translateX = new Animated.Value(-width);

  React.useEffect(() => {
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      {/* Overlay */}
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* Drawer Content */}
      <Animated.View style={[styles.drawer, {transform: [{translateX}]}]}>
        <Image source={Logo} style={styles.Logo} />
        {children}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: width * 0.5,
    backgroundColor: '#ACE03A',
    padding: 20,
    paddingTop: height * 0.05,
  },
  drawerTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontFamily:InterFont.BoldFont
  },
  Logo: {
    width: width * 0.22,
    height: height * 0.1,
  },
});

export default CustomDrawer;
