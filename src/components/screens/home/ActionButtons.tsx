import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../../NavigationParamList";
import { LogService } from "../../../services/logService";

type ActionButtonsProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Home">;
};

export function ActionButtons({ navigation }: ActionButtonsProps) {
    const logger = LogService.getInstance();

    const handleMapPress = () => {
        try {
            navigation.navigate("ParkingMap");
        } catch (error) {
            logger.error('Failed to navigate to map:', error as Error);
        }
    };

    const handleDebugPress = () => {
        try {
            logger.debug('Opening debug screen');
            navigation.navigate("Debug");
        } catch (error) {
            logger.error('Failed to navigate to debug:', error as Error);
        }
    };

    return (
        <scrollView>
            <stackLayout className="p-4">
                <button
                    className="bg-indigo-600 text-white p-4 rounded-lg mb-4"
                    onTap={handleMapPress}
                >
                    View Parking Map
                </button>
                <button
                    className="bg-indigo-600 text-white p-4 rounded-lg mb-4"
                    onTap={handleDebugPress}
                >
                    Open Debug Console
                </button>
            </stackLayout>
        </scrollView>
    );
}