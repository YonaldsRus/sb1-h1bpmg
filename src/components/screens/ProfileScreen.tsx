import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type ProfileScreenProps = {
    route: RouteProp<MainStackParamList, "Profile">,
    navigation: FrameNavigationProp<MainStackParamList, "Profile">,
};

export function ProfileScreen({ navigation }: ProfileScreenProps) {
    return (
        <scrollView className="h-full bg-gray-50">
            <stackLayout className="p-4">
                <stackLayout className="bg-white rounded-lg p-4 mb-4">
                    <label className="text-2xl font-bold text-center text-gray-800 mb-2">
                        John Doe
                    </label>
                    <label className="text-gray-500 text-center mb-4">
                        john.doe@example.com
                    </label>
                </stackLayout>

                <stackLayout className="bg-white rounded-lg p-4 mb-4">
                    <label className="text-xl font-bold text-gray-800 mb-4">
                        Vehicle Information
                    </label>
                    
                    <gridLayout columns="auto, *" className="mb-2">
                        <label col="0" className="text-gray-500 mr-2">License Plate:</label>
                        <label col="1" className="text-gray-700">ABC123</label>
                    </gridLayout>
                    
                    <gridLayout columns="auto, *" className="mb-2">
                        <label col="0" className="text-gray-500 mr-2">Make:</label>
                        <label col="1" className="text-gray-700">Toyota</label>
                    </gridLayout>
                    
                    <gridLayout columns="auto, *" className="mb-2">
                        <label col="0" className="text-gray-500 mr-2">Model:</label>
                        <label col="1" className="text-gray-700">Camry</label>
                    </gridLayout>
                    
                    <gridLayout columns="auto, *" className="mb-2">
                        <label col="0" className="text-gray-500 mr-2">Year:</label>
                        <label col="1" className="text-gray-700">2020</label>
                    </gridLayout>
                </stackLayout>

                <button
                    className="bg-blue-600 text-white p-4 rounded-lg"
                    onTap={() => Dialogs.alert("Edit profile coming soon...")}
                >
                    Edit Profile
                </button>
            </stackLayout>
        </scrollView>
    );
}