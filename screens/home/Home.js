import React from 'react';
import {ImageBackground, Text, View, StyleSheet} from "react-native";
import {COLORS, images} from "../../constants";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from "expo-app-loading";

SplashScreen.preventAutoHideAsync();

const Home = () => {
    const [fontLoaded] = useFonts({
        'Poppins-Regular': require('./../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./../../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Italic': require('./../../assets/fonts/Poppins-Italic.ttf')
    });

    if (!fontLoaded) {
        return <AppLoading/>
    }

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
        textAlign: 'center',
        lineHeight: 50,
        marginTop: 230,
        fontFamily: 'Poppins-Bold'
    },
    welcomeInfo: {
        color: COLORS.white,
        textAlign: 'right',
        width: '60%',
        marginTop: 12,
        fontSize: 18,
        fontFamily: 'Poppins-Regular'
    },
    welcomeCards: {
        color: COLORS.white,
        textAlign: 'center',
        marginTop: 20,
        fontSize: 8,
        fontFamily: 'Poppins-Italic'
    }
})

export default Home;