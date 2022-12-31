import React from 'react';
import {ImageBackground, Text, View} from "react-native";
import {COLORS, images} from "../../constants";

const Home = () => {
    return (
        <View style={{flex: 1}}>
            <ImageBackground source={images.cinema} resizeMode='cover' style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: COLORS.white, fontSize: 30, fontWeight: 'bold', textAlign: 'center', top: -20}}>Welcome
                    to our cinema</Text>
                <Text style={{color: COLORS.white, textAlign: 'center', marginTop: 250}}>Following the modern times and
                    adapting the
                    film industry to today's
                    digital devices,
                    Movieland Cinema offers you unforgettable film experiences.</Text>
            </ImageBackground>
        </View>
    )
}

export default Home;