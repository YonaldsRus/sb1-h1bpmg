export type ParkingRestriction = {
    id: string;
    area: {
        lat: number;
        lng: number;
        radius: number; // in meters
    };
    type: 'LEGAL' | 'ILLEGAL' | 'SOON_ILLEGAL';
    startTime?: string; // ISO string
    endTime?: string; // ISO string
    reason?: string;
};

export type MapRegion = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
};