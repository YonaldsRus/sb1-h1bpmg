import * as React from "react";

type AppLayoutProps = {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
};

export function AppLayout({ children, header, footer }: AppLayoutProps) {
    return (
        <gridLayout rows={`${header ? 'auto,' : ''} * ${footer ? ',auto' : ''}`} className="h-full bg-gray-50">
            {header && <stackLayout row="0">{header}</stackLayout>}
            <stackLayout row={header ? "1" : "0"} className="h-full">
                {children}
            </stackLayout>
            {footer && <stackLayout row={header ? "2" : "1"}>{footer}</stackLayout>}
        </gridLayout>
    );
}