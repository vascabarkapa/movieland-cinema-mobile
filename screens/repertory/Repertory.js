import React, {useCallback} from 'react';
import {Text, View, StyleSheet, Image, FlatList, TouchableOpacity, StatusBar} from "react-native";
import {COLORS} from "../../constants";
import repertoryDB from "../../repertoryDB";
import {useNavigation} from "@react-navigation/native";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from "@expo/vector-icons/Ionicons";

SplashScreen.preventAutoHideAsync();

const Repertory = () => {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('./../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./../../assets/fonts/Poppins-Bold.ttf')
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const movies = ({item}) => {
        return (
            <View style={styles.movies} onLayout={onLayoutRootView}>
                <View style={styles.imageContainer}>
                    <Image style={styles.movieImage} source={item.image}/>
                </View>
                <View>
                    <View style={styles.headerRow}>
                        <Text style={styles.movieTitle}>
                            {item.name}
                        </Text>
                        <Text style={styles.movieRating}>
                            <Ionicons name="star" size={18} color={COLORS.secondary}/>&nbsp;{item.rating}
                        </Text>
                    </View>
                    <Text style={styles.movieDescription} numberOfLines={2} ellipsizeMode='tail'>
                        {item.description}
                    </Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.moviePrice}>
                            <Ionicons name="alarm" size={16} color={COLORS.secondary}/>&nbsp;{item.dateTime}
                        </Text>
                        <Text style={styles.moviePrice}>
                            Price: {item.price.toFixed(2)}&nbsp;&euro;
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('MovieDetails', {movieId: item.id});
                    }}>
                        <Text style={styles.movieButton}>
                            MORE DETAILS
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    return (
        <>
            <StatusBar backgroundColor={COLORS.gray}/>
            <View style={styles.container}>
                <Text style={styles.header}>This week in the repertory</Text>
                <FlatList data={repertoryDB} renderItem={movies} keyExtractor={(item) => item.id}/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: COLORS.gray
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold'
    },
    movies: {
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: COLORS.white
    },
    imageContainer: {
        margin: 10
    },
    movieImage: {
        height: 180,
        width: '100%',
        borderRadius: 20
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    movieTitle: {
        fontFamily: 'Poppins-Bold',
        textAlign: 'left',
        marginLeft: 20,
        fontSize: 18,
        textTransform: 'uppercase'
    },
    movieRating: {
        fontFamily: 'Poppins-Bold',
        textAlign: 'right',
        marginRight: 20,
        fontSize: 18,
        textTransform: 'uppercase'
    },
    movieDescription: {
        textAlign: 'justify',
        marginLeft: 10,
        marginRight: 10,
        fontFamily: 'Poppins-Regular',
        paddingTop: 5,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:10,
        marginRight:10,
    },
    moviePrice: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        paddingTop: 5,
    },
    movieButton: {
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 20,
        marginLeft: 110,
        marginRight: 110,
        paddingTop:3,
        paddingBottom:3,
        color: COLORS.white,
        backgroundColor: COLORS.secondary,
    },
});

export default Repertory;