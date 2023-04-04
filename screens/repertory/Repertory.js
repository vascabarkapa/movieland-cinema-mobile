import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from "@expo/vector-icons/Ionicons";
import RepertoryService from '../../shared/services/repertory-service';
import { images } from "../../constants";
import DateTimeHelper from '../../shared/helpers/DateTimeHelper';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native';

SplashScreen.preventAutoHideAsync();

const Repertory = () => {
    const navigation = useNavigation();
    const [isLoaded, setIsLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [repertory, setRepertory] = useState([]);
    const [repertoryLength, setRepertoryLength] = useState();
    /* 
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
        } */

    const onRefresh = () => {
        setRefreshing(true);

        RepertoryService.getMoviesFromRepertory().then((response) => {
            if (response) {
                setRepertory(response?.data);
                setRepertoryLength(response?.data?.length);
                setIsLoaded(true);
            }
        });

        setRefreshing(false);
    };

    const movies = ({ item }) => {
        return (
            <View style={styles.movies} /* onLayout={onLayoutRootView} */>
                <View style={styles.imageContainer}>
                    <Image style={styles.movieImage} source={images.testMovie} />
                </View>
                <View>
                    <View style={styles.headerRow}>
                        <Text style={styles.movieTitle}>
                            {item?.movie?.name}
                        </Text>
                        <Text style={styles.movieRating}>
                            <Ionicons name="star" size={18} color={COLORS.secondary} />&nbsp;{item?.movie?.rating.toFixed(1)}
                        </Text>
                    </View>
                    <Text style={styles.movieDescription} numberOfLines={2} ellipsizeMode='tail'>
                        {item?.movie?.description}
                    </Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.moviePrice}>
                            <Ionicons name="alarm" size={16} color={COLORS.secondary} />&nbsp;{DateTimeHelper.convertToLocalFormat(item?.dateTime)}
                        </Text>
                        <Text style={styles.moviePrice}>
                            Price: {item?.price.toFixed(2)}&nbsp;&euro;
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('MovieDetails', { selectedRepertory: item });
                    }}>
                        <Text style={styles.movieButton}>
                            MORE DETAILS
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    useEffect(() => {
        RepertoryService.getMoviesFromRepertory().then((response) => {
            if (response) {
                setRepertory(response?.data);
                setRepertoryLength(response?.data?.length);
                setIsLoaded(true);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>This week in the repertory</Text>
            {isLoaded ? (repertoryLength > 0 ? <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={repertory}
                renderItem={movies}
                keyExtractor={(item) => item?._id}
            /> :
                <ScrollView style={styles.noInfoView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Text style={styles.noInfo}>There are no movies available in cinema this week. Visit us again soon!</Text>
                </ScrollView>
            ) : <View style={[styles.activityHorizontal]}>
                <ActivityIndicator color={COLORS.secondary} size="large" />
            </View>}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: COLORS.gray
    },
    activityHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
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
        width: '80%',
        textTransform: 'uppercase'
    },
    noInfoView: {
        paddingTop: '80%',
    },
    noInfo: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        fontSize: 18,
    },
    movieRating: {
        fontFamily: 'Poppins-Bold',
        textAlign: 'left',
        marginLeft: -10,
        fontSize: 18,
        width: '20%',
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
        marginLeft: 10,
        marginRight: 10,
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
        paddingTop: 3,
        paddingBottom: 3,
        color: COLORS.white,
        backgroundColor: COLORS.secondary,
    },
});

export default Repertory;