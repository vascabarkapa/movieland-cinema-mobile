import React, {useCallback, useState} from 'react';
import repertoryDB from "../../../repertoryDB";
import {Alert, Image, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import {COLORS} from "../../../constants";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from "@expo/vector-icons/Ionicons";

SplashScreen.preventAutoHideAsync();

const MovieDetails = ({route, navigation}) => {
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const {movieId} = route.params;
    const selectedMovie = repertoryDB.find(movies => movies.id === movieId);

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
        let price = selectedMovie.price * ticketQuantity;
        Alert.alert(`Your cost is ${price}`);
        navigation.navigate('Home');
    }

    const back = () => {
        navigation.navigate('Repertory');
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Image style={styles.image} source={selectedMovie.image}/>
            <View style={styles.secondContainer}>
                <View style={styles.mainRow}>
                    <Text style={styles.title}>
                        {selectedMovie.name}
                    </Text>
                    <Text style={styles.duration}>
                        {selectedMovie.duration}
                    </Text>
                </View>
                <View style={styles.mainRow}>
                    <Text style={styles.genre}>
                        {selectedMovie.genre}
                    </Text>
                    <Text style={styles.rating}>
                        <Ionicons name="star" size={14}
                                  color={COLORS.secondary}/>&nbsp;{selectedMovie.rating.toFixed(1)}
                    </Text>
                </View>
                <View style={styles.secondaryRow}>
                    <Text style={styles.direction}>
                        <Text style={styles.boldText}>Direction:&nbsp;</Text><Text>{selectedMovie.direction}</Text>
                    </Text>
                    <Text style={styles.actors}>
                        <Text style={styles.boldText}>Actors:&nbsp;</Text><Text>{selectedMovie.actors}</Text>
                    </Text>
                </View>
                <Text style={styles.description}>
                    {selectedMovie.description}
                </Text>
                <View style={styles.descriptionContainer}></View>
                <View style={styles.purchaseRow}>
                    <View style={styles.rowDirection}>
                        <Text style={styles.quantity}>Number of tickets: </Text>
                        <TextInput style={styles.quantityInput} onChangeText={quantity => setTicketQuantity(quantity)}
                                   value={ticketQuantity.toString()} selectTextOnFocus={true} keyboardType='numeric'/>
                    </View>
                    <Text style={styles.price}>
                        Total Price: ${(selectedMovie.price * ticketQuantity).toFixed(2)}
                    </Text>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={back} style={styles.buttonBack}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={purchase} style={styles.buttonBuy}>
                        <Text style={styles.buttonText}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    boldText: {
        fontFamily: 'Poppins-Bold'
    },
    container: {
        flexDirection: 'column',
        paddingTop: 10
    },
    secondContainer: {
        backgroundColor: COLORS.white,
        width: '100%',
        paddingTop: 10,
        top: -20,
        borderRadius: 20,
        paddingBottom: 2000
    },
    mainRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    secondaryRow: {
        marginLeft: 15
    },
    purchaseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom:20
    },
    rowDirection: {
        flexDirection: 'row',
    },
    title: {
        marginLeft: 15,
        fontFamily: 'Poppins-Bold',
        textTransform: 'uppercase',
        fontSize: 20,
        justifyContent: 'flex-start'
    },
    duration: {
        marginRight: 15,
        fontFamily: 'Poppins-Regular',
    },
    image: {
        width: '100%',
        height: 360,
    },
    genre: {
        marginLeft: 15,
        fontFamily: 'Poppins-Regular',
    },
    rating: {
        marginRight: 15,
        fontFamily: 'Poppins-Bold',
    },
    direction: {
        fontFamily: 'Poppins-Regular',
    },
    actors: {
        fontFamily: 'Poppins-Regular',
    },
    descriptionContainer: {
        borderBottomWidth: 2,
        borderColor: COLORS.secondary,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    description: {
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'center',
        marginTop: 20,
        textAlign: 'justify',
        fontWeight: '600',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
    },
    price: {
        paddingTop: 5,
        paddingBottom: 10,
        fontFamily: 'Poppins-Bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBuy: {
        backgroundColor: COLORS.secondary,
        width: '30%',
        borderRadius: 20,
        marginLeft: 10,
    },
    buttonBack: {
        backgroundColor: COLORS.primary,
        width: '30%',
        borderRadius: 20,
        marginRight: 10,
    },
    buttonText: {
        fontFamily: 'Poppins-Bold',
        color: COLORS.white,
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: 5,
    },
    quantity: {
        fontFamily: 'Poppins-Regular',
        paddingTop: 5,
        paddingBottom: 10,
    },
    quantityInput: {
        fontFamily: 'Poppins-Regular',
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 10,
        height: 32,
        width: 80,
        paddingLeft: 10,
        paddingTop: 2
    }
})

export default MovieDetails;