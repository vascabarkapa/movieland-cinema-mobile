import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { COLORS } from "../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimeHelper from '../../../shared/helpers/DateTimeHelper';
import TicketService from '../../../shared/services/ticket-service';
import { ActivityIndicator } from 'react-native';

const PurchaseForm = ({ route, navigation }) => {
    const { selectedRepertory } = route.params;
    const { numberOfTickets } = route.params;
    const [isLoading, setIsLoading] = useState(false);

    // Form
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const [cardType, setCardType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [ccvNumber, setCcvNumber] = useState('');

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

    const handleExpireDate = (input) => {
        if (input.length === 2 && expiryDate.length === 1) {
            input += '/';
        }

        setExpiryDate(input);
    }

    const purchase = () => {
        setIsLoading(true);

        if (firstName === '' || lastName === '' || email === '' || phoneNumber === '' || address === '' || city === '' || country === '' || cardType === '' || cardNumber === '' || expiryDate === '' || ccvNumber === '') {
            Alert.alert(
                'Error',
                'Please enter all fields to purchase tickets!',
                [
                    { text: 'Ok' },
                ],
                { cancelable: false }
            );
            setIsLoading(false);
            return;
        }

        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(email)) {
            Alert.alert(
                'Error',
                'The email is not valid! Check the format.',
                [
                    { text: 'Ok' },
                ],
                { cancelable: false }
            );
            setIsLoading(false);
            return;
        }

        const body = JSON.stringify({
            repertory: selectedRepertory?._id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,
            address: address,
            city: city,
            country: country,
            card_type: cardType,
            card_number: cardNumber,
            card_date_expiry: expiryDate,
            card_ccv: ccvNumber,
            number_of_tickets: numberOfTickets,
            sum_price: selectedRepertory?.price * numberOfTickets
        })

        TicketService.createTicket(body).then((response) => {
            if (response) {
                setIsLoading(false);
                Alert.alert(
                    'Successful Purchase',
                    'Movie ticket purchase is successful. The transaction will be completed shortly and you will receive an email with further information and printable tickets.\n' +
                    '\n' +
                    'Thank you for using our services!',
                    [
                        { text: 'Ok', onPress: () => navigation.navigate('Repertory') },
                    ],
                    { cancelable: false }
                );
            }
        })
    }

    const back = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <ScrollView>
                <Text style={styles.header}>Buy tickets</Text>
                <View style={styles.inline}>
                    <Text style={styles.title}>{selectedRepertory?.movie?.name}</Text>
                    <Text style={styles.numberOfTickets}>Number of tickets:&nbsp;{numberOfTickets}</Text>
                </View>

                <View style={styles.inline}>
                    <Text style={styles.dateTime}><Ionicons name="alarm" size={16}
                        color={COLORS.secondary} />&nbsp;{DateTimeHelper.convertToLocalFormat(selectedRepertory?.dateTime)}
                    </Text>
                    <Text style={styles.price}>Total
                        price:&nbsp;{(selectedRepertory?.price * numberOfTickets).toFixed(2)}&euro;</Text>
                </View>

                <Text style={styles.sector}>Personal data</Text>

                <Text style={styles.label}>First Name</Text>
                <TextInput style={styles.input} selectTextOnFocus={true} selectionColor={COLORS.secondary}
                    value={firstName} onChangeText={(firstName) => setFirstName(firstName)} />

                <Text style={styles.label}>Last Name</Text>
                <TextInput style={styles.input} selectTextOnFocus={true} selectionColor={COLORS.secondary}
                    value={lastName} onChangeText={(lastName) => setLastName(lastName)} />

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} selectTextOnFocus={true} selectionColor={COLORS.secondary}
                    keyboardType='email-address' value={email}
                    onChangeText={(email) => setEmail(email)} />

                <Text style={styles.label}>Phone number</Text>
                <TextInput style={styles.input} selectTextOnFocus={true} selectionColor={COLORS.secondary}
                    keyboardType='phone-pad' value={phoneNumber}
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)} />

                <Text style={styles.label}>Address</Text>
                <TextInput style={styles.input} selectTextOnFocus={true} selectionColor={COLORS.secondary}
                    value={address} onChangeText={(address) => setAddress(address)} />

                <Text style={styles.label}>City</Text>
                <TextInput style={styles.input} selectTextOnFocus={true} selectionColor={COLORS.secondary}
                    value={city} onChangeText={(city) => setCity(city)} />

                <Text style={styles.label}>Country</Text>
                <TextInput style={styles.input} selectTextOnFocus={true} selectionColor={COLORS.secondary}
                    value={country} onChangeText={(country) => setCountry(country)} />

                <Text style={styles.sector}>Card data</Text>

                <Text style={styles.label}>Card Type</Text>
                <TextInput style={styles.input} selectTextOnFocus={true} selectionColor={COLORS.secondary}
                    value={cardType} onChangeText={(cardType) => setCardType(cardType)} />

                <Text style={styles.label}>Card Number</Text>
                <TextInput style={styles.input} selectTextOnFocus={true} selectionColor={COLORS.secondary}
                    keyboardType='numeric' value={cardNumber}
                    onChangeText={(cardNumber) => setCardNumber(cardNumber)} />

                <Text style={styles.label}>Expiry Date</Text>
                <TextInput style={styles.input} selectTextOnFocus={true} selectionColor={COLORS.secondary}
                    keyboardType='numeric' value={expiryDate}
                    onChangeText={handleExpireDate} />

                <Text style={styles.label}>CCV number</Text>
                <TextInput style={styles.input} selectTextOnFocus={true} selectionColor={COLORS.secondary}
                    keyboardType='numeric' value={ccvNumber}
                    onChangeText={(ccvNumber) => setCcvNumber(ccvNumber)} />

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelButton} onPress={back} disabled={isLoading}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buyButton} onPress={purchase} disabled={isLoading}>
                        {!isLoading ? <Text style={styles.buttonText}>Buy</Text> : <ActivityIndicator color={COLORS.secondary} />}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: COLORS.white
    },
    header: {
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        fontSize: 25
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
        width: '40%',
        marginLeft: 20
    },
    numberOfTickets: {
        fontFamily: 'Poppins-Regular',
        marginRight: 20,
        marginTop: 5
    },
    dateTime: {
        fontFamily: 'Poppins-Bold',
        marginLeft: 20
    },
    price: {
        fontFamily: 'Poppins-Bold',
        marginRight: 20
    },
    sector: {
        fontFamily: 'Poppins-Bold',
        marginTop: 20,
        marginLeft: 20,
        fontSize: 18,
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
        backgroundColor: COLORS.white,
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