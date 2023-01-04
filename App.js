import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MovieDetails from "./screens/repertory/components/MovieDetails";
import Tabs from './navigation/tabs';
import PurchaseForm from "./screens/repertory/components/PurchaseForm";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Home"}>
                <Stack.Screen name='Tab' component={Tabs}/>
                <Stack.Screen name='MovieDetails' component={MovieDetails}/>
                <Stack.Screen name='PurchaseForm' component={PurchaseForm}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default () => {
    return <App/>;
}