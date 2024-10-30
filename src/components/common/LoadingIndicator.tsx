import * as React from "react";

type LoadingIndicatorProps = {
    message?: string;
    className?: string;
};

export function LoadingIndicator({ message, className = '' }: LoadingIndicatorProps) {
    return (
        <gridLayout columns="auto, *" className={`items-center ${className}`}>
            <activityIndicator
                col={0}
                busy={true}
                className="mr-2 text-indigo-600"
            />
            {message && (
                <label col={1} className="text-gray-600">
                    {message}
                </label>
            )}
        </gridLayout>
    );
}