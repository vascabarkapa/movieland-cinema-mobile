import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {COLORS} from "../../constants";

const Repertory = () => {
    return (
        <View style={styles.container}>
            <Text>This is Repertory Page!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.gray
    }
})

export default Repertory;