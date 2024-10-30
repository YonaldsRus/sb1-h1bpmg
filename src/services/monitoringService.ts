import { LogService } from './logService';
import { ErrorBoundary } from './errorBoundary';
import { PreviewService } from './previewService';

export class MonitoringService {
  private static instance: MonitoringService;
  private logger: LogService;
  private errorBoundary: ErrorBoundary;
  private previewService: PreviewService;
  private isMonitoring: boolean = false;
  private performanceMetrics: Map<string, number> = new Map();

  private constructor() {
    this.logger = LogService.getInstance();
    this.errorBoundary = ErrorBoundary.getInstance();
    this.previewService = PreviewService.getInstance();
  }

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  public async startMonitoring(): Promise<void> {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    await this.logger.info('System monitoring started');

    // Monitor app performance
    this.startPerformanceMonitoring();

    // Monitor preview generation
    this.monitorPreviewGeneration();

    // Monitor system resources
    this.monitorSystemResources();
  }

  private startPerformanceMonitoring(): void {
    setInterval(async () => {
      try {
        const metrics = await this.gatherPerformanceMetrics();
        await this.logger.debug('Performance metrics', new Error(JSON.stringify(metrics)));
      } catch (error) {
        await this.errorBoundary.captureError(error as Error, undefined, { context: 'performance_monitoring' });
      }
    }, 30000); // Every 30 seconds
  }

  private async gatherPerformanceMetrics(): Promise<Record<string, any>> {
    const metrics: Record<string, any> = {};

    if (global.isAndroid) {
      const runtime = java.lang.Runtime.getRuntime();
      metrics.memory = {
        free: runtime.freeMemory(),
        total: runtime.totalMemory(),
        max: runtime.maxMemory()
      };
    }

    return metrics;
  }

  private monitorPreviewGeneration(): void {
    this.previewService.monitorPreviewGeneration()
      .catch(async error => {
        await this.errorBoundary.captureError(error, undefined, { context: 'preview_generation' });
      });
  }

  private monitorSystemResources(): void {
    if (global.isAndroid) {
      setInterval(async () => {
        try {
          const runtime = java.lang.Runtime.getRuntime();
          const usedMemory = runtime.totalMemory() - runtime.freeMemory();
          const memoryUsagePercent = (usedMemory / runtime.maxMemory()) * 100;

          if (memoryUsagePercent > 80) {
            await this.logger.warn('High memory usage detected', new Error(`Memory usage: ${memoryUsagePercent.toFixed(2)}%`));
          }
        } catch (error) {
          await this.errorBoundary.captureError(error as Error, undefined, { context: 'resource_monitoring' });
        }
      }, 60000); // Every minute
    }
  }

  public async stopMonitoring(): Promise<void> {
    this.isMonitoring = false;
    await this.logger.info('System monitoring stopped');
  }

  public isActive(): boolean {
    return this.isMonitoring;
  }

  public async getMonitoringStatus(): Promise<Record<string, any>> {
    return {
      isActive: this.isMonitoring,
      performanceMetrics: Object.fromEntries(this.performanceMetrics),
      previewStatus: this.previewService.getPreviewStatus(),
      timestamp: new Date().toISOString()
    };
  }
}