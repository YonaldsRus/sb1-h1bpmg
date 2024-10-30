import { ParkingRestriction } from '../types/parking';

// Key Sacramento neighborhoods and districts
export const SACRAMENTO_REGIONS = {
    downtown: {
        lat: 38.5816,
        lng: -121.4944,
        name: "Downtown Sacramento"
    },
    midtown: {
        lat: 38.5722,
        lng: -121.4686,
        name: "Midtown"
    },
    oldSacramento: {
        lat: 38.5839,
        lng: -121.5042,
        name: "Old Sacramento"
    },
    eastSacramento: {
        lat: 38.5671,
        lng: -121.4506,
        name: "East Sacramento"
    },
    capitalArea: {
        lat: 38.5766,
        lng: -121.4934,
        name: "Capitol Area"
    }
};

// Sacramento parking rules based on real city ordinances
export const PARKING_RULES = {
    streetCleaning: {
        description: "Street cleaning parking restriction",
        duration: "2 hours",
        fine: "$52"
    },
    rushHour: {
        description: "Rush hour no parking",
        duration: "7am-9am, 4pm-6pm",
        fine: "$76"
    },
    residential: {
        description: "Residential permit required",
        duration: "24/7",
        fine: "$52"
    },
    eventParking: {
        description: "Event parking restrictions",
        duration: "Varies",
        fine: "$52"
    }
};