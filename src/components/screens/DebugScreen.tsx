import * as React from "react";
import { ScrollView } from "@nativescript/core";
import { LogService } from "../../services/logService";
import { DebugService } from "../../services/debugService";
import { PreviewService } from "../../services/previewService";

export function DebugScreen() {
    const [logs, setLogs] = React.useState<string>('');
    const [systemInfo, setSystemInfo] = React.useState<string>('');
    const [previewStatus, setPreviewStatus] = React.useState<string>('');
    const [isDebugMode, setIsDebugMode] = React.useState(false);
    const logService = LogService.getInstance();
    const debugService = DebugService.getInstance();
    const previewService = PreviewService.getInstance();

    React.useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [logContent, sysInfo] = await Promise.all([
            logService.getLogs(),
            debugService.getSystemInfo()
        ]);
        setLogs(logContent);
        setSystemInfo(sysInfo);
        setIsDebugMode(debugService.isDebugEnabled());
        setPreviewStatus(previewService.getPreviewStatus());
    };

    const clearLogs = async () => {
        await logService.clearLogs();
        setLogs('');
    };

    const toggleDebugMode = () => {
        if (isDebugMode) {
            debugService.disableDebugMode();
        } else {
            debugService.enableDebugMode();
        }
        setIsDebugMode(!isDebugMode);
    };

    const debugPreview = async () => {
        await previewService.debugPreview();
        await loadData();
    };

    return (
        <gridLayout rows="auto, auto, auto, *, auto" className="h-full bg-gray-50">
            <stackLayout row="0" className="p-4 bg-blue-600">
                <label className="text-xl font-bold text-white">Debug Console</label>
            </stackLayout>

            <stackLayout row="1" className="p-4 bg-white border-b border-gray-200">
                <gridLayout columns="*, auto" className="mb-2">
                    <label col="0" className="text-gray-700">Debug Mode</label>
                    <switch col="1" checked={isDebugMode} onCheckedChange={toggleDebugMode} />
                </gridLayout>
                <label className="text-sm font-mono" textWrap={true}>
                    {systemInfo}
                </label>
            </stackLayout>

            <stackLayout row="2" className="p-4 bg-white border-b border-gray-200">
                <label className="text-gray-700 font-bold">Preview Status: {previewStatus}</label>
                <button
                    className="bg-blue-600 text-white p-2 mt-2 rounded"
                    onTap={debugPreview}
                >
                    Debug Preview
                </button>
            </stackLayout>

            <scrollView row="3" className="p-4">
                <label className="font-mono text-sm" textWrap={true}>
                    {logs || 'No logs available'}
                </label>
            </scrollView>

            <gridLayout row="4" columns="*, *, *" className="p-4">
                <button
                    col="0"
                    className="bg-blue-600 text-white p-4 m-1 rounded-lg"
                    onTap={loadData}
                >
                    Refresh
                </button>
                <button
                    col="1"
                    className="bg-green-600 text-white p-4 m-1 rounded-lg"
                    onTap={debugPreview}
                >
                    Check QR
                </button>
                <button
                    col="2"
                    className="bg-red-600 text-white p-4 m-1 rounded-lg"
                    onTap={clearLogs}
                >
                    Clear
                </button>
            </gridLayout>
        </gridLayout>
    );
}