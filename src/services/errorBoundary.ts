import { LogService } from './logService';
import { StorageService } from './storageService';

interface ErrorReport {
  timestamp: string;
  error: string;
  stackTrace?: string;
  componentStack?: string;
  metadata?: Record<string, any>;
}

export class ErrorBoundary {
  private static instance: ErrorBoundary;
  private logger: LogService;
  private storage: StorageService;
  private readonly ERROR_STORAGE_KEY = 'error_reports';
  private readonly MAX_STORED_ERRORS = 50;

  private constructor() {
    this.logger = LogService.getInstance();
    this.storage = StorageService.getInstance();
  }

  public static getInstance(): ErrorBoundary {
    if (!ErrorBoundary.instance) {
      ErrorBoundary.instance = new ErrorBoundary();
    }
    return ErrorBoundary.instance;
  }

  public async captureError(error: Error, componentStack?: string, metadata?: Record<string, any>): Promise<void> {
    const errorReport: ErrorReport = {
      timestamp: new Date().toISOString(),
      error: error.message,
      stackTrace: error.stack,
      componentStack,
      metadata
    };

    // Log the error
    await this.logger.error('Application error captured', error);

    // Store the error report
    await this.storeErrorReport(errorReport);

    // Check if we should trigger crash reporting
    if (this.shouldTriggerCrashReporting(error)) {
      await this.handleCriticalError(errorReport);
    }
  }

  private async storeErrorReport(report: ErrorReport): Promise<void> {
    try {
      const storedReports = this.storage.getItem<ErrorReport[]>(this.ERROR_STORAGE_KEY, []);
      
      // Add new report and maintain max size
      storedReports.unshift(report);
      if (storedReports.length > this.MAX_STORED_ERRORS) {
        storedReports.pop();
      }

      this.storage.setItem(this.ERROR_STORAGE_KEY, storedReports);
    } catch (error) {
      await this.logger.error('Failed to store error report', error as Error);
    }
  }

  private shouldTriggerCrashReporting(error: Error): boolean {
    // Add logic to determine if error is critical
    const criticalErrors = [
      'OutOfMemoryError',
      'SecurityException',
      'NullPointerException'
    ];
    
    return criticalErrors.some(errorType => error.name.includes(errorType));
  }

  private async handleCriticalError(report: ErrorReport): Promise<void> {
    try {
      await this.logger.error('Critical error occurred', new Error(JSON.stringify(report)));
      
      // Force app to safe state
      this.storage.setItem('app_state', 'recovery');
      
      // Clear any sensitive data
      this.storage.removeItem('user_session');
      
      // Log system state
      const systemInfo = await this.getSystemInfo();
      await this.logger.error('System state at crash', new Error(JSON.stringify(systemInfo)));
    } catch (error) {
      console.error('Failed to handle critical error:', error);
    }
  }

  private async getSystemInfo(): Promise<Record<string, any>> {
    if (global.isAndroid) {
      return {
        platform: 'Android',
        apiLevel: android.os.Build.VERSION.SDK_INT,
        device: `${android.os.Build.MANUFACTURER} ${android.os.Build.MODEL}`,
        version: android.os.Build.VERSION.RELEASE,
        freeMemory: java.lang.Runtime.getRuntime().freeMemory(),
        totalMemory: java.lang.Runtime.getRuntime().totalMemory()
      };
    }
    return {
      platform: 'Unknown',
      timestamp: new Date().toISOString()
    };
  }

  public async getStoredErrors(): Promise<ErrorReport[]> {
    return this.storage.getItem<ErrorReport[]>(this.ERROR_STORAGE_KEY, []);
  }

  public async clearStoredErrors(): Promise<void> {
    this.storage.removeItem(this.ERROR_STORAGE_KEY);
  }
}