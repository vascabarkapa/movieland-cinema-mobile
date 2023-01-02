import React from 'react';
import {ImageBackground, Text, View, StyleSheet} from "react-native";
import {COLORS, images} from "../../constants";

const Home = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={images.welcomeScreen} resizeMode='cover'
                             style={styles.imageBackground}>
                <Text style={styles.welcomeHeader}>Welcome
                    to{'\n'}our cinema</Text>
                <Text style={styles.welcomeInfo}>Following
                    the
                    modern times and
                    adapting the
                    film industry to today's
                    digital devices,
                    Movieland Cinema offers you unforgettable film experiences.</Text>
                <Text style={styles.welcomeCards}>Search
                    available movies at the cinema and buy tickets online quickly and easily!</Text>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBackground: {
        flex: 2
    },
    welcomeHeader: {
        color: COLORS.white,
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 200
    },
    welcomeInfo: {
        color: COLORS.white,
        textAlign: 'right',
        width: '60%',
        marginTop: 20,
        fontSize: 20
    },
    welcomeCards: {
        color: COLORS.white,
        textAlign: 'center',
        marginTop: 25,
        fontSize: 10,
        fontStyle: 'italic'
    }
})

export default Home;