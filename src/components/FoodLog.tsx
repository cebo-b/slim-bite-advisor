
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import FoodPhotoAnalyzer from "./FoodPhotoAnalyzer";

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
  meal: string;
}

interface AnalyzedFood {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
  confidence: number;
}

const FoodLog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("ontbijt");
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: 1,
      name: "Havermout met banaan",
      calories: 320,
      protein: 12,
      carbs: 54,
      fat: 8,
      portion: "1 portie",
      meal: "ontbijt"
    },
    {
      id: 2,
      name: "Gegrilde kip",
      calories: 280,
      protein: 35,
      carbs: 0,
      fat: 14,
      portion: "150g",
      meal: "lunch"
    }
  ]);

  const meals = [
    { id: "ontbijt", label: "Ontbijt", icon: "🌅" },
    { id: "lunch", label: "Lunch", icon: "☀️" },
    { id: "diner", label: "Diner", icon: "🌙" },
    { id: "snacks", label: "Snacks", icon: "🍎" },
  ];

  const handleFoodAnalyzed = (analyzedFood: AnalyzedFood) => {
    const newFoodItem: FoodItem = {
      id: Date.now(),
      name: analyzedFood.name,
      calories: analyzedFood.calories,
      protein: analyzedFood.protein,
      carbs: analyzedFood.carbs,
      fat: analyzedFood.fat,
      portion: analyzedFood.portion,
      meal: selectedMeal
    };
    
    setFoodItems(prev => [...prev, newFoodItem]);
  };

  const getMealItems = (mealType: string) => {
    return foodItems.filter(item => item.meal === mealType);
  };

  const getTotalCalories = () => {
    return foodItems.reduce((total, item) => total + item.calories, 0);
  };

  return (
    <div className="space-y-6">
      {/* Daily Summary */}
      <Card className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Vandaag</h2>
            <div className="text-4xl font-bold mb-2">{getTotalCalories()}</div>
            <p className="text-emerald-100">Totaal Calorieën</p>
          </div>
        </CardContent>
      </Card>

      {/* AI Photo Analyzer */}
      <FoodPhotoAnalyzer onFoodAnalyzed={handleFoodAnalyzed} />

      {/* Food Search */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            🔍 Voedsel Zoeken
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Zoek naar voedsel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-emerald-200 focus:border-emerald-400"
            />
            <Button className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600">
              Zoeken
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Meal Selection */}
      <div className="flex flex-wrap gap-2 justify-center">
        {meals.map((meal) => (
          <Button
            key={meal.id}
            variant={selectedMeal === meal.id ? "default" : "outline"}
            onClick={() => setSelectedMeal(meal.id)}
            className={`flex items-center gap-2 ${
              selectedMeal === meal.id
                ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white"
                : "border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            }`}
          >
            <span>{meal.icon}</span>
            {meal.label}
          </Button>
        ))}
      </div>

      {/* Meal Content */}
      {meals.map((meal) => (
        <Card key={meal.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <span className="text-2xl">{meal.icon}</span>
              {meal.label}
              <Badge variant="secondary" className="ml-2">
                {getMealItems(meal.id).reduce((total, item) => total + item.calories, 0)} kcal
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getMealItems(meal.id).length === 0 ? (
              <p className="text-gray-500 italic text-center py-8">
                Nog geen voedsel toegevoegd voor {meal.label.toLowerCase()}
              </p>
            ) : (
              <div className="space-y-3">
                {getMealItems(meal.id).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.portion}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-600">{item.calories} kcal</div>
                      <div className="text-sm text-gray-500">
                        P:{item.protein}g | K:{item.carbs}g | V:{item.fat}g
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FoodLog;
