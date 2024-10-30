import { Color } from '@nativescript/core';
import { ParkingRestriction } from '../types/parking';
import { SACRAMENTO_REGIONS, PARKING_RULES } from './sacramentoData';

export const getRestrictionColor = (type: ParkingRestriction['type']): Color => {
    switch (type) {
        case 'LEGAL':
            return new Color('#22c55e'); // green-500
        case 'ILLEGAL':
            return new Color('#ef4444'); // red-500
        case 'SOON_ILLEGAL':
            return new Color('#eab308'); // yellow-500
        default:
            return new Color('#6b7280'); // gray-500
    }
};

export const getSacramentoRestrictions = (): ParkingRestriction[] => {
    const currentTime = new Date();
    const isWeekday = currentTime.getDay() >= 1 && currentTime.getDay() <= 5;
    const currentHour = currentTime.getHours();
    
    // Array to store all parking restrictions
    const restrictions: ParkingRestriction[] = [];

    // Downtown restrictions
    restrictions.push({
        id: 'downtown-1',
        area: {
            lat: SACRAMENTO_REGIONS.downtown.lat,
            lng: SACRAMENTO_REGIONS.downtown.lng,
            radius: 300
        },
        type: isWeekday && (currentHour >= 7 && currentHour <= 9) ? 'ILLEGAL' : 'LEGAL',
        reason: PARKING_RULES.rushHour.description,
        startTime: isWeekday ? new Date(currentTime.setHours(7, 0, 0, 0)).toISOString() : undefined,
        endTime: isWeekday ? new Date(currentTime.setHours(9, 0, 0, 0)).toISOString() : undefined
    });

    // Midtown residential restrictions
    restrictions.push({
        id: 'midtown-1',
        area: {
            lat: SACRAMENTO_REGIONS.midtown.lat,
            lng: SACRAMENTO_REGIONS.midtown.lng,
            radius: 250
        },
        type: 'SOON_ILLEGAL',
        reason: PARKING_RULES.streetCleaning.description,
        startTime: new Date(currentTime.getTime() + 3600000).toISOString(), // 1 hour from now
        endTime: new Date(currentTime.getTime() + 7200000).toISOString() // 2 hours from now
    });

    // Capitol Area restrictions
    restrictions.push({
        id: 'capitol-1',
        area: {
            lat: SACRAMENTO_REGIONS.capitalArea.lat,
            lng: SACRAMENTO_REGIONS.capitalArea.lng,
            radius: 400
        },
        type: 'ILLEGAL',
        reason: PARKING_RULES.residential.description
    });

    // Old Sacramento event parking
    restrictions.push({
        id: 'oldsac-1',
        area: {
            lat: SACRAMENTO_REGIONS.oldSacramento.lat,
            lng: SACRAMENTO_REGIONS.oldSacramento.lng,
            radius: 200
        },
        type: 'LEGAL',
        reason: 'Historic district parking available'
    });

    // East Sacramento street cleaning
    restrictions.push({
        id: 'eastsac-1',
        area: {
            lat: SACRAMENTO_REGIONS.eastSacramento.lat,
            lng: SACRAMENTO_REGIONS.eastSacramento.lng,
            radius: 300
        },
        type: 'SOON_ILLEGAL',
        reason: PARKING_RULES.streetCleaning.description,
        startTime: new Date(currentTime.getTime() + 7200000).toISOString(), // 2 hours from now
        endTime: new Date(currentTime.getTime() + 14400000).toISOString() // 4 hours from now
    });

    return restrictions;
};