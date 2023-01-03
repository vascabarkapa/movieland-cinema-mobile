import React, {useState} from 'react';
import repertoryDB from "../../../repertoryDB";
import {Alert, Image, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import {images} from "../../../constants";

const MovieDetails = ({route, navigation}) => {
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const {movieId} = route.params;
    const selectedMovie = repertoryDB.find(movies => movies.id === movieId);

    const purchase = () => {
        let price = selectedMovie.price * ticketQuantity;
        Alert.alert(`Your cost is ${price}`);
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{selectedMovie.name}</Text>
            <Image style={styles.image} source={images.cinema}/>
            <Text style={styles.description}>{selectedMovie.description}</Text>
            <View style={styles.purchaseRow}>
                <Text style={styles.description}>Quantity: </Text>
                <TextInput style={styles.quantityInput} onChangeText={quantity => setTicketQuantity(quantity)}
                           value={ticketQuantity} selectTextOnFocus={true} keyboardType='numeric'/>
            </View>
            <Text style={styles.price}>
                Total Price: ${selectedMovie.price * ticketQuantity}
            </Text>
            <TouchableOpacity onPress={purchase} style={styles.button}>
                <Text style={buttonText}>Buy Now</Text>
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
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: '60%'
    },
    title: {
        fontWeight: 'bold',
        paddingTop: 10,
    },
    image: {
        width: '100%',
        height: 180,
    },
    description: {
        textAlignVertical: 'center',
        paddingTop: 5,
        textAlign: 'left',
        fontWeight: '600',
        padding: 10
    },
    price: {
        paddingTop: 5,
        paddingBottom: 10,
    },
    buttonText: {
        textAlign: 'center',
        padding: 5,
    },
    quantityInput: {
        borderWidth: 1,
        height: 38,
        width: 40,
        marginLeft: 25
    }
})

export default MovieDetails;