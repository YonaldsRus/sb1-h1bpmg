import * as React from "react";

type HeaderProps = {
    title: string;
    className?: string;
};

export function Header({ title, className = '' }: HeaderProps) {
    return (
        <stackLayout className={`bg-indigo-600 p-4 ${className}`}>
            <label className="text-2xl font-bold text-white text-center">
                {title}
            </label>
        </stackLayout>
    );
}