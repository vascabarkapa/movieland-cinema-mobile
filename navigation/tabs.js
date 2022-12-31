import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from "../constants";
import {Image, Text, View} from "react-native";
import {About, Home, Repertory} from "../screens";

const Tab = createBottomTabNavigator();

const RepertoryButton = ({tintColor}) => {
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            borderRadius: 50,
            borderColor: COLORS.secondary,
            borderWidth: 2,
            backgroundColor: COLORS.default,
            shadowColor: COLORS.secondary,
            shadowOffset: {
                width: 100,
                height: 100,
            },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 25,
        }}>
            <Image source={require('../assets/icons/movieland_icon.png')}
                   style={{height: 50, width: 50, tintColor: tintColor}} resizeMode='contain'/>
        </View>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarShowLabel: false,
            tabBarStyle: {
                height: '7%',
                backgroundColor: COLORS.default
            },
            tabBarIcon: ({focused}) => {
                const tintColor = focused ? COLORS.secondary : COLORS.white;

                switch (route.name) {
                    case "Home":
                        return (
                            <Text style={{color: tintColor}}>Home</Text>
                        )
                    case "Repertory":
                        return (
                            <RepertoryButton tintColor={tintColor}/>
                        )
                    case "About":
                        return (
                            <Text style={{color: tintColor}}>About</Text>
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