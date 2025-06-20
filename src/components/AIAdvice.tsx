
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Advice {
  id: number;
  title: string;
  content: string;
  category: string;
  timestamp: string;
}

const AIAdvice = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<Advice[]>([
    {
      id: 1,
      title: "Optimaliseer je eiwitinname",
      content: "Gebaseerd op je huidige voedingspatroon raad ik aan om meer magere eiwitten toe te voegen. Probeer 20-30g eiwit bij elke maaltijd voor optimale spierbehoud en verzadiging.",
      category: "Voeding",
      timestamp: "2 uur geleden"
    },
    {
      id: 2,
      title: "Verbeter je hydratatie",
      content: "Je caloriebalans ziet er goed uit, maar vergeet niet voldoende water te drinken. Streef naar 2-3 liter per dag, vooral omdat je actief bent.",
      category: "Hydratatie",
      timestamp: "5 uur geleden"
    },
    {
      id: 3,
      title: "Timing van koolhydraten",
      content: "Overweeg om complexe koolhydraten vooral rond je trainingen te consumeren voor optimale energieverdeling gedurende de dag.",
      category: "Timing",
      timestamp: "1 dag geleden"
    }
  ]);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const newAdvice: Advice = {
        id: advice.length + 1,
        title: "Persoonlijk advies",
        content: `Gebaseerd op je vraag "${question}", raad ik aan om je voedingspatroon geleidelijk aan te passen. Focus op kleine, houdbare veranderingen die passen bij je levensstijl.`,
        category: "Persoonlijk",
        timestamp: "Zojuist"
      };
      
      setAdvice([newAdvice, ...advice]);
      setQuestion("");
      setIsLoading(false);
    }, 2000);
  };

  const categories = [
    { name: "Voeding", color: "bg-emerald-100 text-emerald-800", icon: "🥗" },
    { name: "Hydratatie", color: "bg-blue-100 text-blue-800", icon: "💧" },
    { name: "Timing", color: "bg-purple-100 text-purple-800", icon: "⏰" },
    { name: "Persoonlijk", color: "bg-orange-100 text-orange-800", icon: "👤" }
  ];

  const getCategoryStyle = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat ? { className: cat.color, icon: cat.icon } : { className: "bg-gray-100 text-gray-800", icon: "💬" };
  };

  return (
    <div className="space-y-6">
      {/* AI Chat Interface */}
      <Card className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            🤖 AI Voedingsassistent
          </CardTitle>
          <p className="text-emerald-100">
            Stel een vraag over voeding, dieet of gezondheid
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Bijv: Hoe kan ik meer eiwitten eten?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
              onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
            />
            <Button
              onClick={handleAskQuestion}
              disabled={isLoading || !question.trim()}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              {isLoading ? "🤔" : "Vraag"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Suggestions */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            ⚡ Snelle Vragen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Wat zijn gezonde snacks?",
              "Hoe bereken ik mijn caloriebehoefte?",
              "Welke supplementen heb ik nodig?",
              "Hoe plan ik mijn maaltijden?"
            ].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setQuestion(suggestion)}
                className="justify-start text-left h-auto p-3 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Advice History */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          📚 Persoonlijke Adviezen
        </h3>
        
        {advice.map((item, index) => (
          <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getCategoryStyle(item.category).icon}</span>
                  <h4 className="font-bold text-gray-800">{item.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryStyle(item.category).className}>
                    {item.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{item.timestamp}</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="animate-pulse">
              <div className="text-4xl mb-2">🤔</div>
              <p className="text-gray-600">AI denkt na over je vraag...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIAdvice;
