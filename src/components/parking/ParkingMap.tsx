import * as React from "react";
import { MapView, Marker, Circle } from "@nativescript/google-maps";
import { LocationService, Location } from "../../services/locationService";
import { ParkingRestriction } from "../../types/parking";
import { getRestrictionColor } from "../../utils/mapUtils";
import { LogService } from "../../services/logService";

interface ParkingMapProps {
    onLocationSelected?: (location: Location) => void;
    restrictions?: ParkingRestriction[];
    initialLocation?: Location | null;
    row?: number | string;
}

export function ParkingMap({ 
    onLocationSelected,
    restrictions = [],
    initialLocation,
    row
}: ParkingMapProps) {
    const mapViewRef = React.useRef<MapView>();
    const locationService = LocationService.getInstance();
    const logger = LogService.getInstance();
    const [currentLocation, setCurrentLocation] = React.useState<Location | null>(null);
    const isMounted = React.useRef(true);

    React.useEffect(() => {
        const cleanup = locationService.watchLocation((location) => {
            if (isMounted.current) {
                setCurrentLocation(location);
                logger.debug('Location updated', new Error(JSON.stringify(location)));
            }
        });

        return () => {
            isMounted.current = false;
            cleanup();
        };
    }, []);

    const handleMapReady = (args: any) => {
        try {
            const mapView = args.object;
            mapViewRef.current = mapView;

            const location = initialLocation || currentLocation;
            if (location) {
                mapView.latitude = location.latitude;
                mapView.longitude = location.longitude;
                mapView.zoom = 15;
            }

            // Add markers for restrictions
            restrictions.forEach((restriction, index) => {
                try {
                    const color = getRestrictionColor(restriction.type);
                    
                    mapView.addCircle({
                        center: {
                            lat: restriction.area.lat,
                            lng: restriction.area.lng
                        },
                        radius: restriction.area.radius,
                        strokeWidth: 2,
                        strokeColor: color.hex,
                        fillColor: color.hex + '4D', // 30% opacity
                        id: `restriction-${index}`
                    });
                } catch (error) {
                    logger.error(`Failed to add restriction circle ${index}:`, error as Error);
                }
            });
        } catch (error) {
            logger.error('Failed to initialize map:', error as Error);
        }
    };

    const handleMapTap = (args: any) => {
        try {
            if (onLocationSelected && args.position) {
                const position = args.position;
                const location = {
                    latitude: position.latitude,
                    longitude: position.longitude
                };
                onLocationSelected(location);
                logger.debug('Map location selected', new Error(JSON.stringify(location)));
            }
        } catch (error) {
            logger.error('Failed to handle map tap:', error as Error);
        }
    };

    return (
        <mapView
            row={row}
            onMapReady={handleMapReady}
            onCoordinateTapped={handleMapTap}
            className="w-full h-full"
        />
    );
}