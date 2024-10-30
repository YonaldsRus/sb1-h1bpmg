import * as React from 'react';
import { LogService } from './logService';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
    private logger: LogService;

    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
        this.logger = LogService.getInstance();
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.logger.error('UI Error:', error);
        console.error('Component stack:', errorInfo.componentStack);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <gridLayout className="p-4">
                    <stackLayout>
                        <label className="text-xl text-red-600 font-bold mb-2">
                            Something went wrong
                        </label>
                        <label className="text-gray-600 mb-4">
                            The app encountered an error. Please try again.
                        </label>
                        <button
                            className="bg-blue-600 text-white p-4 rounded-lg"
                            onTap={() => this.setState({ hasError: false, error: null })}
                        >
                            Try Again
                        </button>
                    </stackLayout>
                </gridLayout>
            );
        }

        return this.props.children;
    }
}