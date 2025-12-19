"use client";

import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-surface-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="ml-64">
                <TopBar title={title} />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
