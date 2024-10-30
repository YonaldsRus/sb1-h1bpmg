import { Utils } from '@nativescript/core';

export interface Location {
    latitude: number;
    longitude: number;
    address?: string;
}

export class LocationService {
    private static instance: LocationService;
    private locationManager: any;
    private locationListeners: ((location: Location) => void)[] = [];

    private constructor() {
        if (global.isAndroid) {
            this.locationManager = Utils.android.getApplicationContext()
                .getSystemService(android.content.Context.LOCATION_SERVICE);
        }
    }

    public static getInstance(): LocationService {
        if (!LocationService.instance) {
            LocationService.instance = new LocationService();
        }
        return LocationService.instance;
    }

    public getCurrentLocation(): Promise<Location> {
        return new Promise((resolve, reject) => {
            if (global.isAndroid) {
                try {
                    const lastKnownLocation = this.locationManager
                        .getLastKnownLocation(android.location.LocationManager.GPS_PROVIDER);
                    
                    if (lastKnownLocation) {
                        const location: Location = {
                            latitude: lastKnownLocation.getLatitude(),
                            longitude: lastKnownLocation.getLongitude()
                        };
                        resolve(location);
                    } else {
                        reject(new Error('Location not available'));
                    }
                } catch (error) {
                    reject(error);
                }
            } else {
                reject(new Error('Platform not supported'));
            }
        });
    }

    public watchLocation(callback: (location: Location) => void): () => void {
        if (global.isAndroid) {
            const locationListener = new android.location.LocationListener({
                onLocationChanged: (location: any) => {
                    const newLocation: Location = {
                        latitude: location.getLatitude(),
                        longitude: location.getLongitude()
                    };
                    callback(newLocation);
                }
            });

            this.locationManager.requestLocationUpdates(
                android.location.LocationManager.GPS_PROVIDER,
                1000,
                10,
                locationListener
            );

            return () => {
                this.locationManager.removeUpdates(locationListener);
            };
        }
        return () => {};
    }
}