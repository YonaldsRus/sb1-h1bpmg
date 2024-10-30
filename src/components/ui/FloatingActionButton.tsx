import * as React from "react";

type FloatingActionButtonProps = {
    text: string;
    onTap: () => void;
    disabled?: boolean;
};

export function FloatingActionButton({ text, onTap, disabled = false }: FloatingActionButtonProps) {
    return (
        <button
            className={`${disabled ? 'bg-gray-400' : 'bg-indigo-600'} text-white rounded-full p-4 w-16 h-16 text-center text-lg font-bold`}
            style="margin: 16; horizontal-align: right; vertical-align: bottom; elevation: 4;"
            onTap={onTap}
            isEnabled={!disabled}
        >
            {text}
        </button>
    );
}