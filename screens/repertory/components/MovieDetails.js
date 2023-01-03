import React, {useCallback, useState} from 'react';
import repertoryDB from "../../../repertoryDB";
import {Alert, Image, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import {COLORS} from "../../../constants";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

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

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Text style={styles.title}>
                {selectedMovie.name}
            </Text>
            <Image style={styles.image} source={selectedMovie.image}/>
            <Text style={styles.description}>
                {selectedMovie.description}
            </Text>
            <View style={styles.purchaseRow}>
                <Text style={styles.description}>Quantity: </Text>
                <TextInput style={styles.quantityInput} onChangeText={quantity => setTicketQuantity(quantity)}
                           value={ticketQuantity.toString()} selectTextOnFocus={true} keyboardType='numeric'/>
            </View>
            <Text style={styles.price}>
                Total Price: ${selectedMovie.price * ticketQuantity}
            </Text>
            <TouchableOpacity onPress={purchase} style={styles.button}>
                <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10
    },
    purchaseRow: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: COLORS.secondary,
        width: '40%',
        borderRadius: 20,
    },
    title: {
        marginTop: 30,
        fontFamily: 'Poppins-Bold',
        paddingTop: 10,
    },
    image: {
        width: '100%',
        height: 360,
    },
    description: {
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'center',
        paddingTop: 5,
        textAlign: 'left',
        fontWeight: '600',
        padding: 10
    },
    price: {
        paddingTop: 5,
        paddingBottom: 10,
        fontFamily: 'Poppins-Bold',
    },
    buttonText: {
        fontFamily: 'Poppins-Bold',
        color: COLORS.white,
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: 5,
    },
    quantityInput: {
        fontFamily: 'Poppins-Regular',
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 10,
        height: 32,
        width: 80,
        marginLeft: 25,
        paddingLeft:10,
        paddingTop:2
    }
})

export default MovieDetails;