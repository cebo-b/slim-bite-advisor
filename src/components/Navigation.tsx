
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const tabs = [
    { id: "voedingslog", label: "Voedingslog", icon: "📝" },
    { id: "macro-tracker", label: "Macro Tracker", icon: "📊" },
    { id: "ai-advies", label: "AI Advies", icon: "🤖" },
    { id: "voortgang", label: "Voortgang", icon: "📈" },
    { id: "profiel", label: "Profiel", icon: "👤" },
  ];

  return (
    <Card className="p-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover-scale ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-md"
                : "hover:bg-emerald-50 hover:text-emerald-700"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default Navigation;
