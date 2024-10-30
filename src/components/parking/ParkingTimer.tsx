import * as React from "react";
import { LogService } from '../../services/logService';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

type ParkingTimerProps = {
    onTimerComplete: () => void;
    initialTime?: number;
    className?: string;
};

export function ParkingTimer({ 
    onTimerComplete, 
    initialTime = 0,
    className = ''
}: ParkingTimerProps) {
    const [isActive, setIsActive] = React.useState(false);
    const [time, setTime] = React.useState(initialTime);
    const intervalRef = React.useRef<any>(null);
    const isMounted = React.useRef(true);
    const logger = LogService.getInstance();

    React.useEffect(() => {
        return () => {
            isMounted.current = false;
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const startTimer = () => {
        try {
            setIsActive(true);
            intervalRef.current = setInterval(() => {
                if (isMounted.current) {
                    setTime(prev => prev + 1);
                }
            }, 1000);
            logger.info('Timer started');
        } catch (error) {
            logger.error('Failed to start timer:', error as Error);
        }
    };

    const stopTimer = () => {
        try {
            setIsActive(false);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setTime(0);
            onTimerComplete();
            logger.info('Timer stopped');
        } catch (error) {
            logger.error('Failed to stop timer:', error as Error);
        }
    };

    const resetTimer = () => {
        try {
            setTime(0);
            logger.info('Timer reset');
        } catch (error) {
            logger.error('Failed to reset timer:', error as Error);
        }
    };

    const formatTime = (seconds: number): string => {
        try {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        } catch (error) {
            logger.error('Failed to format time:', error as Error);
            return '00:00:00';
        }
    };

    return (
        <Card className={`mb-4 ${className}`}>
            <label className="text-2xl font-bold text-center text-gray-800 mb-4">
                {formatTime(time)}
            </label>
            <gridLayout columns="*, *" className="mb-2">
                <Button
                    col={0}
                    text={isActive ? "Stop" : "Start"}
                    variant={isActive ? "danger" : "secondary"}
                    onTap={isActive ? stopTimer : startTimer}
                    className="m-1"
                />
                <Button
                    col={1}
                    text="Reset"
                    variant="primary"
                    onTap={resetTimer}
                    className="m-1"
                />
            </gridLayout>
        </Card>
    );
}