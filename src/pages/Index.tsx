import { useState } from "react";
import { HangingIdCard } from "@/components/HangingIdCard";
import { Terminal } from "@/components/Terminal";
import { FolderView } from "@/components/FolderView";

type ViewMode = "default" | "projects" | "experience" | "education" | "achievements" | "contact" | "about";

const Index = () => {
    const [currentView, setCurrentView] = useState<ViewMode>("default");
    const [currentData, setCurrentData] = useState<any>(null);

    const handleCommandNavigation = (command: string, data?: any) => {
        setCurrentView(command as ViewMode);
        setCurrentData(data);
    };

    const handleBackToDefault = () => {
        setCurrentView("default");
        setCurrentData(null);
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Scan lines effect */}
            <div className="scan-lines absolute inset-0 pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row h-screen">
                {/* Left Panel */}
                <div className="w-full lg:w-1/2 p-4 lg:p-8 flex items-center justify-center min-h-[50vh] lg:min-h-full">
                    {currentView === "default" ? (
                        <HangingIdCard />
                    ) : (
                        <FolderView
                            type={currentView}
                            data={currentData}
                            onBack={handleBackToDefault}
                        />
                    )}
                </div>

                {/* Right Panel - Terminal */}
                <div className="w-full lg:w-1/2 p-4 lg:p-8 flex items-center justify-center min-h-[50vh] lg:min-h-full">
                    <Terminal onCommandExecute={handleCommandNavigation} />
                </div>
            </div>
        </div>
    );
};

export default Index;