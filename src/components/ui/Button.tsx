import * as React from "react";
import { LogService } from '../../services/logService';

type ButtonProps = {
    text: string;
    onTap: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    className?: string;
    disabled?: boolean;
    col?: number | string;
    row?: number | string;
};

export function Button({ 
    text, 
    onTap, 
    variant = 'primary', 
    className = '',
    disabled = false,
    col,
    row
}: ButtonProps) {
    const logger = LogService.getInstance();
    const baseStyle = "p-4 rounded-lg font-bold";
    
    const variantStyles = {
        primary: disabled ? "bg-gray-400 text-white" : "bg-blue-600 text-white",
        secondary: disabled ? "bg-gray-400 text-white" : "bg-green-600 text-white",
        danger: disabled ? "bg-gray-400 text-white" : "bg-red-600 text-white"
    };

    const handleTap = () => {
        try {
            if (!disabled) {
                onTap();
            }
        } catch (error) {
            logger.error('Button tap error:', error as Error);
        }
    };

    return (
        <button
            col={col}
            row={row}
            className={`${baseStyle} ${variantStyles[variant]} ${className}`}
            onTap={handleTap}
            isEnabled={!disabled}
        >
            {text}
        </button>
    );
}