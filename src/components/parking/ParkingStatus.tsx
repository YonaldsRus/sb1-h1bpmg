import * as React from "react";
import { ActivityIndicator } from "@nativescript/core";
import { Location } from "../../services/locationService";
import { LogService } from "../../services/logService";

type ParkingStatusProps = {
    isParked: boolean;
    location: Location | null;
    startTime: Date | null;
    row?: number | string;
    isLoading?: boolean;
};

export function ParkingStatus({ 
    isParked, 
    location, 
    startTime, 
    row,
    isLoading = false 
}: ParkingStatusProps) {
    const logger = LogService.getInstance();

    const formatDuration = (start: Date) => {
        try {
            const diff = Math.floor((new Date().getTime() - start.getTime()) / 1000);
            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            return `${hours}h ${minutes}m`;
        } catch (error) {
            logger.error('Failed to format duration:', error as Error);
            return '0h 0m';
        }
    };

    if (isLoading) {
        return (
            <stackLayout row={row} className="p-4 bg-white border-b border-gray-200">
                <gridLayout columns="auto, *" className="items-center">
                    <activityIndicator
                        col={0}
                        busy={true}
                        className="mr-2"
                    />
                    <label col={1} className="text-gray-600">
                        Getting location...
                    </label>
                </gridLayout>
            </stackLayout>
        );
    }

    return (
        <stackLayout row={row} className="p-4 bg-white border-b border-gray-200">
            <label className={`text-lg font-bold ${isParked ? 'text-indigo-600' : 'text-gray-600'}`}>
                {isParked ? 'Currently Parked' : 'Not Parked'}
            </label>
            
            {isParked && location && (
                <>
                    <label className="text-sm text-gray-500 mt-1">
                        Location: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    </label>
                    {startTime && (
                        <label className="text-sm text-gray-500">
                            Duration: {formatDuration(startTime)}
                        </label>
                    )}
                </>
            )}
            
            {!isParked && (
                <label className="text-sm text-gray-500">
                    Tap the parking button to start tracking your location
                </label>
            )}
        </stackLayout>
    );
}