import React from 'react';
import {Text, View, StyleSheet, Image, FlatList, StatusBar, TouchableOpacity} from "react-native";
import {images} from "../../constants";
import repertoryDB from "../../repertoryDB";
import {useNavigation} from "@react-navigation/native";

const Repertory = () => {
    const navigation = useNavigation();

    const movies = ({item}) => {
        return (
            <View style={styles.movies}>
                <View>
                    <Image style={styles.movieImage} source={images.cinema}/>
                </View>
                <View>
                    <Text style={styles.movieTitle}>
                        {item.name}
                    </Text>
                    <Text style={styles.movieDescription} numberOfLines={2} ellipsizeMode='tail'>
                        {item.description}
                    </Text>
                    <Text style={styles.moviePrice}>
                        Price: {item.price}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('MovieDetails', {movieId: item.id});
                    }}>
                        <Text style={styles.movieButton}>
                            DETAILS
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <Text>Ove sedmice na repertoaru:</Text>
            <FlatList data={repertoryDB} renderItem={movies} keyExtractor={(item) => item.id}/>
            {/*<StatusBar*/}
            {/*    animated={true}*/}
            {/*    backgroundColor="#61dafb"*/}
            {/*/>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    movies: {
        flexDirection: 'column',
    },
    movieImage: {
        height: 180,
        width: '100%',
    },
    movieTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    movieDescription: {
        textAlign: 'center',
        fontWeight: '600',
        paddingTop: 5,
    },
    moviePrice: {
        textAlign: 'center',
        fontWeight: '600',
        paddingTop: 5,
    },
    movieButton: {
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 15,
        paddingTop: 5,
    },
});

export default Repertory;