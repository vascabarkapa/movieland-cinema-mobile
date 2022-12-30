import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from "../constants";
import {Text} from "react-native";
import {Home} from "../screens";

const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        height: '10%',
    }
}

const Tabs = () => {
    return (
        <Tab.Navigator tabBarOptions={tabOptions} screenOptions={({route}) => ({
            tabBarIcon: ({focused}) => {
                const tintColor = focused ? COLORS.primary : COLORS.secondary;

                switch (route.name) {
                    case "Home":
                        return (
                            <Text>Home</Text>
                        )
                    case "Repertory":
                        return (
                            <Text>Repertory</Text>
                        )
                    case "About":
                        return (
                            <Text>About</Text>
                        )
                }
            }
        })}>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Repertory" component={Home}/>
            <Tab.Screen name="About" component={Home}/>
        </Tab.Navigator>
    )
}