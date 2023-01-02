import React from 'react';
import {Text, View, StyleSheet, Image} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {COLORS, icons} from "../../constants";
import Ionicons from '@expo/vector-icons/Ionicons';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from "expo-app-loading";

SplashScreen.preventAutoHideAsync();

const MAP_REGION = {
    latitude: 43.736956,
    longitude: 18.568404,
    latitudeDelta: 0.0042,
    longitudeDelta: 0.0021,
}

const marker_LAT = 43.737070;
const marker_LNG = 18.568478;

const About = () => {
    const [fontLoaded] = useFonts({
        'Poppins-Regular': require('./../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./../../assets/fonts/Poppins-Bold.ttf')
    });

    if (!fontLoaded) {
        return <AppLoading/>
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     initialRegion={MAP_REGION}
            >
                <Marker
                    coordinate={{latitude: marker_LAT, longitude: marker_LNG}}
                    title='Movieland Cinema'
                />
            </MapView>
            <View style={styles.information}>
                <View style={styles.movContainer}>
                    <Image source={icons.movieland} style={styles.movLogo}/>
                </View>
                <Text style={styles.header}>Movieland Cinema</Text>
                <Text style={styles.locationDescription}><Ionicons name="location" size={20} color={COLORS.secondary}/>Olimpijska
                    bb,{'\n'}Jahorina, Bosnia and
                    Herzegovina</Text>
                <Text style={styles.contactDescription}><Ionicons name="mail" size={16}
                                                                  color={COLORS.secondary}/>info@movieland.com&nbsp;&nbsp;
                    <Ionicons
                        name="call" size={16} color={COLORS.secondary}/>+38757000111</Text>
                <Text style={styles.workTimeHeader}><Ionicons name="alarm" size={18} color={COLORS.secondary}/>Work
                    time</Text>
                <Text style={styles.workTimeDescription}>Monday - Thursday: 18:00 - 22:00</Text>
                <Text style={styles.workTimeDescription}>Friday - Sunday: 18:00 - 23:00</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    map: {
        width: '100%',
        height: '55%'
    },
    information: {
        borderRadius: 25,
        top: -30,
        backgroundColor: COLORS.white
    },
    movContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    movLogo: {
        height: 120,
        width: 120,
        marginTop: 20
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        marginBottom: -10
    },
    locationDescription: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    },
    contactDescription: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 10,
        borderColor: COLORS.secondary,
        marginBottom: 15
    },
    workTimeHeader: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    },
    workTimeDescription: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    }
});

export default About;