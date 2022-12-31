import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, icons} from "../constants";
import {Image, View, StyleSheet} from "react-native";
import {About, Home, Repertory} from "../screens";

const Tab = createBottomTabNavigator();

const RepertoryButton = ({tintColor}) => {
    return (
        <View style={styles.repertoryButton}>
            <Image source={icons.movieland}
                   style={{height: 50, width: 50, tintColor: tintColor, top: -4}} resizeMode='contain'/>
        </View>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                height: '6%',
                backgroundColor: COLORS.default,
                borderTopWidth: 0
            },
            tabBarIcon: ({focused}) => {
                const tintColor = focused ? COLORS.secondary : COLORS.white;

                switch (route.name) {
                    case "Home":
                        return (
                            <Image source={icons.hut} resizeMode='contain'
                                   style={{tintColor: tintColor, width: 25, height: 25}}/>
                        )
                    case "Repertory":
                        return (
                            <RepertoryButton tintColor={tintColor}/>
                        )
                    case "About":
                        return (
                            <Image source={icons.info} resizeMode='contain'
                                   style={{tintColor: tintColor, width: 30, height: 30}}/>
                        )
                }
            }
        })}>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Repertory" component={Repertory}/>
            <Tab.Screen name="About" component={About}/>
        </Tab.Navigator>
    )
}

export default Tabs;

const styles = StyleSheet.create({
    repertoryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: COLORS.secondary,
        backgroundColor: COLORS.default,
        borderWidth: 2,
    }
})