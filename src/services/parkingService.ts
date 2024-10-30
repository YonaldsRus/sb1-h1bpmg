import { Application, Utils } from '@nativescript/core';

declare const android: any;

export class ParkingService {
    private static instance: ParkingService;
    private notificationManager: any;
    private isServiceRunning = false;
    private static NOTIFICATION_ID = 1;
    private static CHANNEL_ID = "safespot_service_channel";

    private constructor() {
        if (global.isAndroid) {
            this.notificationManager = Utils.android.getApplicationContext()
                .getSystemService(android.content.Context.NOTIFICATION_SERVICE);
            this.createNotificationChannel();
        }
    }

    public static getInstance(): ParkingService {
        if (!ParkingService.instance) {
            ParkingService.instance = new ParkingService();
        }
        return ParkingService.instance;
    }

    private createNotificationChannel(): void {
        if (global.isAndroid && android.os.Build.VERSION.SDK_INT >= 26) {
            const channel = new android.app.NotificationChannel(
                ParkingService.CHANNEL_ID,
                "SafeSpot Service",
                android.app.NotificationManager.IMPORTANCE_LOW
            );
            channel.setDescription("Shows when parking tracking is active");
            this.notificationManager.createNotificationChannel(channel);
        }
    }

    public startService(parkingLocation: string): void {
        if (this.isServiceRunning) return;

        if (global.isAndroid) {
            const context = Utils.android.getApplicationContext();
            const builder = new android.app.Notification.Builder(context, ParkingService.CHANNEL_ID)
                .setContentTitle("SafeSpot Active")
                .setContentText(`Parked at: ${parkingLocation}`)
                .setSmallIcon(android.R.drawable.ic_menu_mylocation)
                .setOngoing(true)
                .setAutoCancel(false);

            this.notificationManager.notify(ParkingService.NOTIFICATION_ID, builder.build());
            this.isServiceRunning = true;
        }
    }

    public stopService(): void {
        if (!this.isServiceRunning) return;

        if (global.isAndroid) {
            this.notificationManager.cancel(ParkingService.NOTIFICATION_ID);
            this.isServiceRunning = false;
        }
    }

    public isRunning(): boolean {
        return this.isServiceRunning;
    }
}