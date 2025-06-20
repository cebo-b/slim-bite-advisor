
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const MacroTracker = () => {
  const dailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67
  };

  const currentIntake = {
    calories: 1450,
    protein: 95,
    carbs: 180,
    fat: 48
  };

  const getPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return "bg-red-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  const macros = [
    {
      name: "Calorieën",
      current: currentIntake.calories,
      goal: dailyGoals.calories,
      unit: "kcal",
      icon: "🔥",
      color: "from-orange-400 to-red-500"
    },
    {
      name: "Eiwitten",
      current: currentIntake.protein,
      goal: dailyGoals.protein,
      unit: "g",
      icon: "💪",
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Koolhydraten",
      current: currentIntake.carbs,
      goal: dailyGoals.carbs,
      unit: "g",
      icon: "🍞",
      color: "from-yellow-400 to-orange-500"
    },
    {
      name: "Vetten",
      current: currentIntake.fat,
      goal: dailyGoals.fat,
      unit: "g",
      icon: "🥑",
      color: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {macros.map((macro, index) => (
          <Card key={macro.name} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${macro.color} flex items-center justify-center text-2xl`}>
                  {macro.icon}
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">{macro.name}</h3>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {macro.current} / {macro.goal}
                </div>
                <p className="text-sm text-gray-500 mb-3">{macro.unit}</p>
                <Progress 
                  value={getPercentage(macro.current, macro.goal)} 
                  className="h-2"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {Math.round(getPercentage(macro.current, macro.goal))}% van doel
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Breakdown */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            📊 Gedetailleerde Verdeling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {macros.map((macro) => {
              const percentage = getPercentage(macro.current, macro.goal);
              const remaining = Math.max(macro.goal - macro.current, 0);
              
              return (
                <div key={macro.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{macro.icon}</span>
                      <span className="font-medium text-gray-700">{macro.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">
                        {macro.current} / {macro.goal} {macro.unit}
                      </div>
                      <div className="text-sm text-gray-500">
                        {remaining > 0 ? `${remaining} ${macro.unit} resterend` : "Doel bereikt!"}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={percentage} className="h-3" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-white drop-shadow">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            💡 Voedingstips
          </h3>
          <ul className="space-y-2 text-emerald-100">
            <li>• Je hebt nog {dailyGoals.protein - currentIntake.protein}g eiwit nodig - overweeg magere vis of kip</li>
            <li>• Goede vooruitgang met koolhydraten - voeg wat groenten toe voor vezels</li>
            <li>• Je zit goed op schema met je calorieën voor vandaag</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MacroTracker;
