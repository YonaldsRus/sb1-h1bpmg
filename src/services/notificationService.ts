import { Utils } from '@nativescript/core';

declare const android: any;

export class NotificationService {
    private static instance: NotificationService;
    private notificationManager: any;
    private static CHANNEL_ID = "safespot_notifications";

    private constructor() {
        if (global.isAndroid) {
            this.notificationManager = Utils.android.getApplicationContext()
                .getSystemService(android.content.Context.NOTIFICATION_SERVICE);
            this.createNotificationChannel();
        }
    }

    public static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    private createNotificationChannel(): void {
        if (global.isAndroid && android.os.Build.VERSION.SDK_INT >= 26) {
            const channel = new android.app.NotificationChannel(
                NotificationService.CHANNEL_ID,
                "SafeSpot Notifications",
                android.app.NotificationManager.IMPORTANCE_DEFAULT
            );
            channel.setDescription("Parking alerts and notifications");
            this.notificationManager.createNotificationChannel(channel);
        }
    }

    public showNotification(title: string, message: string, id: number = Math.random()): void {
        if (global.isAndroid) {
            const context = Utils.android.getApplicationContext();
            const builder = new android.app.Notification.Builder(context, NotificationService.CHANNEL_ID)
                .setContentTitle(title)
                .setContentText(message)
                .setSmallIcon(android.R.drawable.ic_dialog_alert)
                .setAutoCancel(true);

            this.notificationManager.notify(id, builder.build());
        }
    }

    public cancelNotification(id: number): void {
        if (global.isAndroid) {
            this.notificationManager.cancel(id);
        }
    }

    public cancelAllNotifications(): void {
        if (global.isAndroid) {
            this.notificationManager.cancelAll();
        }
    }
}