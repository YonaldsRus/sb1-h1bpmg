import { LogService } from './logService';
import { DebugService } from './debugService';

export class PreviewService {
    private static instance: PreviewService;
    private logger: LogService;
    private debugService: DebugService;
    private lastQRData: string | null = null;
    private previewStatus: 'generating' | 'ready' | 'failed' | null = null;
    private checkInterval: any = null;

    private constructor() {
        this.logger = LogService.getInstance();
        this.debugService = DebugService.getInstance();
    }

    public static getInstance(): PreviewService {
        if (!PreviewService.instance) {
            PreviewService.instance = new PreviewService();
        }
        return PreviewService.instance;
    }

    public async monitorPreviewGeneration(): Promise<void> {
        this.previewStatus = 'generating';
        this.logger.info('Starting preview generation monitoring');

        try {
            // Clear any existing interval
            if (this.checkInterval) {
                clearInterval(this.checkInterval);
            }

            // Monitor the preview process
            this.checkInterval = setInterval(() => {
                if (this.debugService.isDebugEnabled()) {
                    this.logger.debug('Checking preview status...');
                }

                // Check if QR element exists in DOM
                if (global.document) {
                    const qrElement = document.querySelector('img[alt="QR Code"]');
                    if (qrElement) {
                        this.previewStatus = 'ready';
                        this.lastQRData = (qrElement as any).src;
                        this.logger.info('QR Code generated successfully');
                        clearInterval(this.checkInterval);
                    }
                }
            }, 1000);

            // Set timeout to prevent infinite monitoring
            setTimeout(() => {
                if (this.previewStatus === 'generating') {
                    this.previewStatus = 'failed';
                    this.logger.error('Preview generation timed out');
                    if (this.checkInterval) {
                        clearInterval(this.checkInterval);
                    }
                }
            }, 30000); // 30 second timeout

        } catch (error) {
            this.previewStatus = 'failed';
            this.logger.error('Preview generation failed', error as Error);
        }
    }

    public getPreviewStatus(): string {
        return this.previewStatus || 'unknown';
    }

    public async debugPreview(): Promise<void> {
        const debugInfo = {
            status: this.previewStatus,
            hasQRData: !!this.lastQRData,
            timestamp: new Date().toISOString(),
            platform: global.isAndroid ? 'Android' : 'Unknown'
        };

        this.logger.debug('Preview Debug Info:', new Error(JSON.stringify(debugInfo, null, 2)));
    }
}