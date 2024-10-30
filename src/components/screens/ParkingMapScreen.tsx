import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { ParkingMap } from "../parking/ParkingMap";
import { MapLegend } from "../parking/MapLegend";
import { getSacramentoRestrictions } from "../../utils/mapUtils";
import { LocationService, Location } from "../../services/locationService";
import { LogService } from "../../services/logService";
import { AppLayout } from "../layout/AppLayout";
import { LoadingIndicator } from "../common/LoadingIndicator";

type ParkingMapScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "ParkingMap">,
};

export function ParkingMapScreen({ navigation }: ParkingMapScreenProps) {
    const [currentLocation, setCurrentLocation] = React.useState<Location | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const logger = LogService.getInstance();
    const locationService = LocationService.getInstance();

    React.useEffect(() => {
        initializeLocation();
    }, []);

    const initializeLocation = async () => {
        try {
            const location = await locationService.getCurrentLocation();
            setCurrentLocation(location);
            logger.info('Got current location', new Error(JSON.stringify(location)));
        } catch (error) {
            logger.error('Failed to get location', error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLocationSelected = (location: Location) => {
        setCurrentLocation(location);
        logger.info('Location selected', new Error(JSON.stringify(location)));
    };

    const renderMap = () => {
        if (isLoading) {
            return <LoadingIndicator message="Getting location..." />;
        }

        return (
            <ParkingMap
                onLocationSelected={handleLocationSelected}
                restrictions={getSacramentoRestrictions()}
                initialLocation={currentLocation}
            />
        );
    };

    return (
        <AppLayout>
            <gridLayout rows="*, auto, auto" className="h-full">
                {renderMap()}

                <stackLayout row={1} className="p-4">
                    <MapLegend />
                </stackLayout>

                <button
                    row={2}
                    className="bg-indigo-600 text-white p-4 m-4 rounded-lg"
                    onTap={() => navigation.goBack()}
                >
                    Back to Home
                </button>
            </gridLayout>
        </AppLayout>
    );
}