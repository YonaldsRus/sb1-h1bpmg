import * as React from "react";

export function MapLegend() {
    return (
        <gridLayout
            rows="auto"
            columns="auto, auto, auto"
            className="bg-white p-4 rounded-lg shadow-sm mx-4"
        >
            <stackLayout col="0" className="mr-4">
                <gridLayout columns="auto, auto" className="items-center">
                    <label col="0" className="w-4 h-4 bg-green-500 rounded-full mr-2" />
                    <label col="1" className="text-sm text-gray-700">Legal</label>
                </gridLayout>
            </stackLayout>

            <stackLayout col="1" className="mr-4">
                <gridLayout columns="auto, auto" className="items-center">
                    <label col="0" className="w-4 h-4 bg-yellow-500 rounded-full mr-2" />
                    <label col="1" className="text-sm text-gray-700">Soon Illegal</label>
                </gridLayout>
            </stackLayout>

            <stackLayout col="2">
                <gridLayout columns="auto, auto" className="items-center">
                    <label col="0" className="w-4 h-4 bg-red-500 rounded-full mr-2" />
                    <label col="1" className="text-sm text-gray-700">Illegal</label>
                </gridLayout>
            </stackLayout>
        </gridLayout>
    );
}