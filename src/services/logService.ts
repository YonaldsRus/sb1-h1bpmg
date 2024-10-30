import { knownFolders, File, Folder } from '@nativescript/core';
import { formatDate } from '../utils/dateUtils';

export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR'
}

export class LogService {
    private static instance: LogService;
    private logFile: File;
    private readonly MAX_LOG_SIZE = 5 * 1024 * 1024; // 5MB
    private readonly LOG_FOLDER = 'logs';
    private readonly CURRENT_LOG_FILE = 'app.log';

    private constructor() {
        const documentsFolder = knownFolders.documents();
        const logFolder = documentsFolder.getFolder(this.LOG_FOLDER);
        this.logFile = logFolder.getFile(this.CURRENT_LOG_FILE);
        this.initializeLogFile();
    }

    public static getInstance(): LogService {
        if (!LogService.instance) {
            LogService.instance = new LogService();
        }
        return LogService.instance;
    }

    private async initializeLogFile() {
        try {
            if (!await this.logFile.exists()) {
                await this.logFile.writeText('');
            }
            await this.rotateLogsIfNeeded();
        } catch (error) {
            console.error('Failed to initialize log file:', error);
        }
    }

    private async rotateLogsIfNeeded() {
        try {
            const stats = await this.logFile.getSize();
            if (stats > this.MAX_LOG_SIZE) {
                const oldLogFile = this.logFile.parent.getFile(
                    `app_${formatDate(new Date(), 'YYYY-MM-DD_HH-mm')}.log`
                );
                await this.logFile.rename(oldLogFile.path);
                await this.logFile.writeText('');
            }
        } catch (error) {
            console.error('Failed to rotate logs:', error);
        }
    }

    public async log(level: LogLevel, message: string, error?: Error) {
        const timestamp = new Date().toISOString();
        let logMessage = `[${timestamp}] ${level}: ${message}`;
        
        if (error) {
            logMessage += `\nError: ${error.message}\nStack: ${error.stack}`;
        }
        
        logMessage += '\n';

        try {
            const currentContent = await this.logFile.readText();
            await this.logFile.writeText(logMessage + currentContent);
            
            // Also log to console for development
            if (__DEV__) {
                console.log(logMessage);
            }
        } catch (error) {
            console.error('Failed to write to log file:', error);
        }
    }

    public async getLogs(): Promise<string> {
        try {
            return await this.logFile.readText();
        } catch (error) {
            console.error('Failed to read logs:', error);
            return '';
        }
    }

    public async clearLogs(): Promise<void> {
        try {
            await this.logFile.writeText('');
        } catch (error) {
            console.error('Failed to clear logs:', error);
        }
    }

    // Convenience methods for different log levels
    public async debug(message: string, error?: Error) {
        await this.log(LogLevel.DEBUG, message, error);
    }

    public async info(message: string, error?: Error) {
        await this.log(LogLevel.INFO, message, error);
    }

    public async warn(message: string, error?: Error) {
        await this.log(LogLevel.WARN, message, error);
    }

    public async error(message: string, error?: Error) {
        await this.log(LogLevel.ERROR, message, error);
    }
}