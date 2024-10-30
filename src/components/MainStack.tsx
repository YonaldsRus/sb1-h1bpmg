import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "./screens/HomeScreen";

const Stack = stackNavigatorFactory();

export function MainStack() {
    return (
        <BaseNavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#4f46e5"
                    },
                    headerTintColor: "#ffffff"
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: "SafeSpot"
                    }}
                />
            </Stack.Navigator>
        </BaseNavigationContainer>
    );
}