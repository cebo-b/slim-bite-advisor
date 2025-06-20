
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    naam: "Jan Jansen",
    email: "jan.jansen@email.com",
    leeftijd: 28,
    geslacht: "man",
    lengte: 175,
    huidigGewicht: 73.2,
    doelGewicht: 70,
    activiteitsniveau: "matig",
    dieettype: "algemeen",
    allergieën: "Geen",
    doelen: ["Gewichtsverlies", "Spieropbouw"]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to database
    console.log("Profile saved:", profile);
  };

  const calculateBMI = () => {
    const heightInM = profile.lengte / 100;
    return (profile.huidigGewicht / (heightInM * heightInM)).toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "Ondergewicht", color: "bg-blue-100 text-blue-800" };
    if (bmi < 25) return { text: "Normaal gewicht", color: "bg-green-100 text-green-800" };
    if (bmi < 30) return { text: "Overgewicht", color: "bg-yellow-100 text-yellow-800" };
    return { text: "Obesitas", color: "bg-red-100 text-red-800" };
  };

  const calculateCalorieGoal = () => {
    // Simplified BMR calculation (Harris-Benedict)
    let bmr;
    if (profile.geslacht === "man") {
      bmr = 88.362 + (13.397 * profile.huidigGewicht) + (4.799 * profile.lengte) - (5.677 * profile.leeftijd);
    } else {
      bmr = 447.593 + (9.247 * profile.huidigGewicht) + (3.098 * profile.lengte) - (4.330 * profile.leeftijd);
    }
    
    // Activity multiplier
    const multipliers = {
      laag: 1.2,
      matig: 1.55,
      hoog: 1.725,
      zeerhoog: 1.9
    };
    
    return Math.round(bmr * multipliers[profile.activiteitsniveau as keyof typeof multipliers]);
  };

  const bmi = parseFloat(calculateBMI());
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profile.naam}</h2>
                <p className="text-emerald-100">{profile.email}</p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              {isEditing ? "Annuleren" : "Bewerken"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-2">⚖️</div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {profile.huidigGewicht} kg
            </div>
            <p className="text-sm text-gray-600">Huidig Gewicht</p>
            <p className="text-xs text-emerald-600 mt-1">
              Doel: {profile.doelGewicht} kg
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-2">📏</div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {calculateBMI()}
            </div>
            <p className="text-sm text-gray-600">BMI</p>
            <Badge className={`${bmiCategory.color} mt-1`}>
              {bmiCategory.text}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {calculateCalorieGoal()}
            </div>
            <p className="text-sm text-gray-600">Dagelijks Doel (kcal)</p>
          </CardContent>
        </Card>
      </div>

      {/* Profile Details */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            📋 Profiel Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="naam">Naam</Label>
                  <Input
                    id="naam"
                    value={profile.naam}
                    onChange={(e) => setProfile({...profile, naam: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="leeftijd">Leeftijd</Label>
                  <Input
                    id="leeftijd"
                    type="number"
                    value={profile.leeftijd}
                    onChange={(e) => setProfile({...profile, leeftijd: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="geslacht">Geslacht</Label>
                  <Select value={profile.geslacht} onValueChange={(value) => setProfile({...profile, geslacht: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="man">Man</SelectItem>
                      <SelectItem value="vrouw">Vrouw</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lengte">Lengte (cm)</Label>
                  <Input
                    id="lengte"
                    type="number"
                    value={profile.lengte}
                    onChange={(e) => setProfile({...profile, lengte: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="huidigGewicht">Huidig Gewicht (kg)</Label>
                  <Input
                    id="huidigGewicht"
                    type="number"
                    step="0.1"
                    value={profile.huidigGewicht}
                    onChange={(e) => setProfile({...profile, huidigGewicht: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="doelGewicht">Doel Gewicht (kg)</Label>
                  <Input
                    id="doelGewicht"
                    type="number"
                    step="0.1"
                    value={profile.doelGewicht}
                    onChange={(e) => setProfile({...profile, doelGewicht: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="activiteitsniveau">Activiteitsniveau</Label>
                  <Select value={profile.activiteitsniveau} onValueChange={(value) => setProfile({...profile, activiteitsniveau: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laag">Laag (kantoorwerk)</SelectItem>
                      <SelectItem value="matig">Matig (lichte sport)</SelectItem>
                      <SelectItem value="hoog">Hoog (regelmatige sport)</SelectItem>
                      <SelectItem value="zeerhoog">Zeer hoog (intensieve sport)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Annuleren
                </Button>
                <Button onClick={handleSave} className="bg-gradient-to-r from-emerald-500 to-sky-500">
                  Opslaan
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Leeftijd:</span>
                  <span className="font-medium">{profile.leeftijd} jaar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Geslacht:</span>
                  <span className="font-medium capitalize">{profile.geslacht}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lengte:</span>
                  <span className="font-medium">{profile.lengte} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Activiteitsniveau:</span>
                  <span className="font-medium capitalize">{profile.activiteitsniveau}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dieettype:</span>
                  <span className="font-medium capitalize">{profile.dieettype}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Allergieën:</span>
                  <span className="font-medium">{profile.allergieën}</span>
                </div>
                <div>
                  <span className="text-gray-600">Doelen:</span>
                  <div className="flex gap-2 mt-1">
                    {profile.doelen.map((doel, index) => (
                      <Badge key={index} variant="secondary">
                        {doel}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Goals & Preferences */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            🎯 Doelen & Voorkeuren
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-gray-700">Huidige Doelen</h4>
              <div className="space-y-2">
                {profile.doelen.map((doel, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg">
                    <span className="text-emerald-600">✓</span>
                    <span>{doel}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-700">Voortgang naar Doel</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Gewichtsverlies</span>
                    <span>{((profile.huidigGewicht - profile.doelGewicht) / (75.2 - profile.doelGewicht) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-sky-500 h-2 rounded-full"
                      style={{ width: `${((profile.huidigGewicht - profile.doelGewicht) / (75.2 - profile.doelGewicht) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
