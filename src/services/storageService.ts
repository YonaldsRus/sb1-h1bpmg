import { ApplicationSettings } from '@nativescript/core';

export class StorageService {
    private static instance: StorageService;

    private constructor() {}

    public static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    public setItem(key: string, value: any): void {
        try {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            ApplicationSettings.setString(key, stringValue);
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    public getItem<T>(key: string, defaultValue: T): T {
        try {
            const value = ApplicationSettings.getString(key);
            if (value === undefined || value === null) {
                return defaultValue;
            }
            return JSON.parse(value) as T;
        } catch (error) {
            console.error('Error reading from storage:', error);
            return defaultValue;
        }
    }

    public removeItem(key: string): void {
        try {
            ApplicationSettings.remove(key);
        } catch (error) {
            console.error('Error removing from storage:', error);
        }
    }

    public clear(): void {
        try {
            ApplicationSettings.clear();
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    }
}