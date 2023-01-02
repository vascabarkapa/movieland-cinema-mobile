import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Tabs from './navigation/tabs';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Home"}>
                <Stack.Screen name='Tab' component={Tabs}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default () => {
    return <App/>;
}