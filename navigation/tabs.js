import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from "../constants";
import {Text, View} from "react-native";
import {About, Home, Repertory} from "../screens";

const Tab = createBottomTabNavigator();

const RepertoryButton = () => {
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: COLORS.secondary
        }}>
            <Text>A</Text>
        </View>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarShowLabel: false,
            tabBarStyle: {
                height: '7%',
            },
            tabBarIcon: ({focused}) => {
                const tintColor = focused ? COLORS.secondary : COLORS.primary;

                switch (route.name) {
                    case "Home":
                        return (
                            <Text style={{color: tintColor}}>Home</Text>
                        )
                    case "Repertory":
                        return (
                            <RepertoryButton/>
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