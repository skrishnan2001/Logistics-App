import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const Stack = createStackNavigator();
const HomeStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="Signup" component={SignUp} />
    </Stack.Navigator>
);

export default HomeStackNavigator;