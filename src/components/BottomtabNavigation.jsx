// import {View, TouchableOpacity, StyleSheet} from 'react-native';
// import React from 'react';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const BottomtabNavigation = ({state, descriptors, navigation}) => {
//   const icons = [
//     {name: 'home', component: Entypo},
//     {name: 'shopping-cart', component: FontAwesome},
//     {name: 'heart', component: FontAwesome},
//     {name: 'user-circle-o', component: FontAwesome},
//   ];

//   return (
//     <View style={styles.main}>
//       {state.routes.map((route, index) => {
//         const isFocused = state.index === index;

//         const onPress = () => {
//           if (!isFocused) {
//             navigation.navigate(route.name);
//           }
//         };

//         const IconComponent = icons[index].component;
//         const iconName = icons[index].name;

//         return (
//           <TouchableOpacity
//             key={route.key}
//             onPress={onPress}
//             style={{alignItems: 'center',}}>
//             <IconComponent
//               name={iconName}
//               size={28}
//               color={isFocused ? '#EEF9D8' : '#ACE03A'}
//             />
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     backgroundColor: '#F4F9F3',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     // borderTopRightRadius: 20,
//     // borderTopLeftRadius: 20,
    
 
//   },
// });

// export default BottomtabNavigation;


import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BottomtabNavigation = ({state, descriptors, navigation}) => {
  const icons = [
    {name: 'home', component: Entypo},
    {name: 'shopping-cart', component: FontAwesome},
    {name: 'heart', component: FontAwesome},
    {name: 'user-circle-o', component: FontAwesome},
  ];

  return (
    <View style={styles.main}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        const IconComponent = icons[index].component;
        const iconName = icons[index].name;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{alignItems: 'center'}}>
            <IconComponent
              name={iconName}
              size={28}
              color={isFocused ? '#EEF9D8' : '#ACE03A'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFFFFF', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20, 
    shadowColor: '#000', 
    shadowOffset: {width: 0, height: 2}, 
    shadowOpacity: 0.2, 
    shadowRadius: 4,
    elevation: 5, 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
  },
});

export default BottomtabNavigation;
