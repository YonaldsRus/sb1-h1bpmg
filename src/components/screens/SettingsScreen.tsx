import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type SettingsScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Settings">,
};

export function SettingsScreen({ navigation }: SettingsScreenProps) {
    return (
        <scrollView className="h-full bg-gray-50">
            <stackLayout className="p-4">
                <label className="text-xl font-bold text-gray-800 mb-4">
                    Settings
                </label>

                <stackLayout className="bg-white rounded-lg p-4 mb-4">
                    <gridLayout columns="*, auto" className="mb-2">
                        <label col="0" className="text-gray-700">Show Notifications</label>
                        <switch col="1" checked={true} />
                    </gridLayout>
                </stackLayout>

                <button
                    className="bg-blue-600 text-white p-4 rounded-lg"
                    onTap={() => navigation.goBack()}
                >
                    Back to Home
                </button>
            </stackLayout>
        </scrollView>
    );
}