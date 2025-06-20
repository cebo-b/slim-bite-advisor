
import { useState } from "react";
import Navigation from "@/components/Navigation";
import FoodLog from "@/components/FoodLog";
import MacroTracker from "@/components/MacroTracker";
import AIAdvice from "@/components/AIAdvice";
import ProgressCharts from "@/components/ProgressCharts";
import UserProfile from "@/components/UserProfile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("voedingslog");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "voedingslog":
        return <FoodLog />;
      case "macro-tracker":
        return <MacroTracker />;
      case "ai-advies":
        return <AIAdvice />;
      case "voortgang":
        return <ProgressCharts />;
      case "profiel":
        return <UserProfile />;
      default:
        return <FoodLog />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-2">
            AI Dieet App
          </h1>
          <p className="text-gray-600 text-lg">
            Jouw persoonlijke voedings- en gezondheidsassistent
          </p>
        </div>

        {/* Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="mt-8 animate-fade-in">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
