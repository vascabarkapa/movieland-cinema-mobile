import React, {useCallback} from 'react';
import {Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity} from "react-native";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {COLORS} from "../../../constants";
import {useNavigation} from "@react-navigation/native";

const PurchaseForm = () => {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('./../../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./../../../assets/fonts/Poppins-Bold.ttf')
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const purchase = () => {
        navigation.navigate('PurchaseForm');
    }

    const back = () => {
        navigation.navigate('MovieDetails');
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <ScrollView>
                <View style={styles.inline}>
                    <Text style={styles.title}>Ime filma</Text>
                    <Text style={styles.numberOfTickets}>Number of tickets:&nbsp;3</Text>
                </View>

                <Text style={styles.price}>Ukupna cijena:&nbsp;15.00&euro;</Text>

                <Text style={styles.sector}>Personal data</Text>

                <Text style={styles.label}>First Name</Text>
                <TextInput style={styles.input} selectTextOnFocus={true}/>

                <Text style={styles.label}>Last Name</Text>
                <TextInput style={styles.input} selectTextOnFocus={true}/>

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} selectTextOnFocus={true}/>

                <Text style={styles.label}>Phone number</Text>
                <TextInput style={styles.input} selectTextOnFocus={true}/>

                <Text style={styles.label}>Address</Text>
                <TextInput style={styles.input} selectTextOnFocus={true}/>

                <Text style={styles.label}>City</Text>
                <TextInput style={styles.input} selectTextOnFocus={true}/>

                <Text style={styles.label}>Country</Text>
                <TextInput style={styles.input} selectTextOnFocus={true}/>

                <Text style={styles.sector}>Card data</Text>

                <Text style={styles.label}>Card Type</Text>
                <TextInput style={styles.input} selectTextOnFocus={true}/>

                <Text style={styles.label}>Card Number</Text>
                <TextInput style={styles.input} selectTextOnFocus={true}/>

                <Text style={styles.label}>Expiry Date</Text>
                <TextInput style={styles.input} selectTextOnFocus={true}/>

                <Text style={styles.label}>CCV number</Text>
                <TextInput style={styles.input} selectTextOnFocus={true}/>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelButton}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buyButton}>
                        <Text style={styles.buttonText}>Buy</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: COLORS.white
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'Poppins-Bold',
        textTransform: 'uppercase',
        fontSize: 20,
        marginLeft: 20
    },
    numberOfTickets: {
        fontFamily: 'Poppins-Regular',
        marginRight: 20
    },
    price: {
        fontFamily: 'Poppins-Bold',
        textAlign: 'center'
    },
    sector: {
        fontFamily: 'Poppins-Bold',
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
        marginBottom: -10,
    },
    label: {
        fontFamily: 'Poppins-Regular',
        marginTop: 10,
        marginLeft: 20
    },
    input: {
        fontFamily: 'Poppins-Regular',
        borderWidth: 1,
        backgroundColor: COLORS.gray,
        borderColor: COLORS.secondary,
        borderRadius: 10,
        height: 35,
        width: '90%',
        paddingLeft: 10,
        paddingTop: 2,
        marginLeft: 18
    },
    buttonRow: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        fontFamily: 'Poppins-Bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: COLORS.white
    },
    cancelButton: {
        backgroundColor: COLORS.primary,
        width: '40%',
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginRight: 10
    },
    buyButton: {
        backgroundColor: COLORS.secondary,
        width: '40%',
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 10
    }
});

export default PurchaseForm;