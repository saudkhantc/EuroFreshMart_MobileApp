import { ScrollView, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import Img from '../../assets/images/XChuman.png';
import success from '../../assets/images/Success.png';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import CustomButton from '../../components/CustomButton';

const { height, width } = Dimensions.get('window');

const OrderDone = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
                <View>
                    <Image source={Img} style={styles.img} />
                </View>
                <View>
                    <Text style={styles.title}>Congratulations!</Text>
                    <Text style={styles.txt}>Your Order Has Been Placed</Text>
                </View>
                <View>
                    <Image source={success} style={styles.img2} />
                    {/* Optionally, you can display order ID here */}
                    {/* <Text style={styles.ordertext}>
                        Order id - <Text>231323</Text>
                    </Text> */}
                </View>
            </ScrollView>

            <View style={styles.footerContainer}>
                <CustomButton
                    text={'Continue Shopping'}
                    width={width * 0.6}
                    onPress={() => navigation.navigate('bottom-tabs')}
                    paddingVertical={10}
                    textColor={textcolor.color4}
                    bgColor={textcolor.color3}
                    fontFamily={InterFont.SemiBoldFont}
                    fontSize={16}
                />
            </View>
        </View>
    );
};

export default OrderDone;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    scrollview: {
        flexGrow: 1,
    },
    img: {
        width: '100%',
        height: height * 0.28,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    title: {
        fontSize: 20,
        color: textcolor.color3,
        fontFamily: InterFont.BoldFont,
        textAlign: 'center',
    },
    txt: {
        fontSize: 16,
        color: textcolor.color1,
        textAlign: 'center',
    },
    img2: {
        width: '100%',
        height: height * 0.18,
        resizeMode: 'contain',
        marginTop: height * 0.07,
    },
    ordertext: {
        fontSize: 16,
        color: textcolor.color8,
        textAlign: 'center',
        marginTop: 10,
    },
    footerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
});
