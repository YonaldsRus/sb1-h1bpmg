import * as React from "react";

type CardProps = {
    children: React.ReactNode;
    className?: string;
    row?: number | string;
    col?: number | string;
    onTap?: () => void;
};

export function Card({ 
    children, 
    className = '',
    row,
    col,
    onTap
}: CardProps) {
    return (
        <stackLayout
            row={row}
            col={col}
            className={`bg-white p-4 rounded-lg shadow-sm ${className}`}
            onTap={onTap}
        >
            {children}
        </stackLayout>
    );
}