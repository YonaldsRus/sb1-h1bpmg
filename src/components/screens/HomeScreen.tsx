import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type HomeScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <gridLayout rows="auto, *" className="h-full bg-gray-50">
            <stackLayout row="0" className="bg-indigo-600 p-4">
                <label className="text-2xl font-bold text-white text-center">
                    SafeSpot
                </label>
            </stackLayout>

            <stackLayout row="1" className="p-4">
                <label className="text-lg text-center">
                    Welcome to SafeSpot
                </label>
            </stackLayout>
        </gridLayout>
    );
}