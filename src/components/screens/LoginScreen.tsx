import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type LoginScreenProps = {
    route: RouteProp<MainStackParamList, "Login">,
    navigation: FrameNavigationProp<MainStackParamList, "Login">,
};

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {
        if (email && password) {
            // TODO: Implement actual authentication
            navigation.navigate("Home");
        } else {
            Dialogs.alert("Please enter both email and password");
        }
    };

    return (
        <flexboxLayout className="h-full bg-blue-50 p-4">
            <stackLayout className="w-full">
                <label className="text-3xl font-bold text-center text-blue-600 mb-8">
                    Don't Park There
                </label>
                
                <label className="text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <textField
                    className="input text-black"
                    hint="Enter your email"
                    keyboardType="email"
                    text={email}
                    onTextChange={(args) => setEmail(args.value)}
                    style="color: black; background-color: white;"
                />

                <label className="text-sm font-medium text-gray-700 mb-1 mt-4">
                    Password
                </label>
                <textField
                    className="input text-black"
                    hint="Enter your password"
                    secure={true}
                    text={password}
                    onTextChange={(args) => setPassword(args.value)}
                    style="color: black; background-color: white;"
                />

                <button
                    className="bg-blue-600 text-white p-4 rounded-lg font-bold mt-6"
                    onTap={handleLogin}
                >
                    Login
                </button>
            </stackLayout>
        </flexboxLayout>
    );
}