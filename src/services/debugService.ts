import { LogService, LogLevel } from './logService';
import { StorageService } from './storageService';

export class DebugService {
    private static instance: DebugService;
    private logger: LogService;
    private storage: StorageService;
    private isDebugMode: boolean = false;

    private constructor() {
        this.logger = LogService.getInstance();
        this.storage = StorageService.getInstance();
        this.isDebugMode = this.storage.getItem('debug_mode', false);
    }

    public static getInstance(): DebugService {
        if (!DebugService.instance) {
            DebugService.instance = new DebugService();
        }
        return DebugService.instance;
    }

    public enableDebugMode(): void {
        this.isDebugMode = true;
        this.storage.setItem('debug_mode', true);
        this.logger.info('Debug mode enabled');
    }

    public disableDebugMode(): void {
        this.isDebugMode = false;
        this.storage.setItem('debug_mode', false);
        this.logger.info('Debug mode disabled');
    }

    public isDebugEnabled(): boolean {
        return this.isDebugMode;
    }

    public async getSystemInfo(): Promise<string> {
        if (global.isAndroid) {
            return `
Platform: Android
API Level: ${android.os.Build.VERSION.SDK_INT}
Device: ${android.os.Build.MANUFACTURER} ${android.os.Build.MODEL}
Version: ${android.os.Build.VERSION.RELEASE}
            `.trim();
        }
        return 'Platform info not available';
    }

    public async logSystemState(): Promise<void> {
        const systemInfo = await this.getSystemInfo();
        await this.logger.info('System State:', new Error(systemInfo));
    }
}