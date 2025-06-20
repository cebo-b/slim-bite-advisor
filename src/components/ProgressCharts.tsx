
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const ProgressCharts = () => {
  const weightData = [
    { datum: "1 Jan", gewicht: 75.2 },
    { datum: "8 Jan", gewicht: 74.8 },
    { datum: "15 Jan", gewicht: 74.5 },
    { datum: "22 Jan", gewicht: 74.0 },
    { datum: "29 Jan", gewicht: 73.8 },
    { datum: "5 Feb", gewicht: 73.5 },
    { datum: "12 Feb", gewicht: 73.2 },
  ];

  const calorieData = [
    { dag: "Ma", doel: 2000, werkelijk: 1850 },
    { dag: "Di", doel: 2000, werkelijk: 2100 },
    { dag: "Wo", doel: 2000, werkelijk: 1950 },
    { dag: "Do", doel: 2000, werkelijk: 2050 },
    { dag: "Vr", doel: 2000, werkelijk: 1900 },
    { dag: "Za", doel: 2000, werkelijk: 2200 },
    { dag: "Zo", doel: 2000, werkelijk: 1800 },
  ];

  const macroDistribution = [
    { name: "Eiwitten", value: 25, color: "#3b82f6" },
    { name: "Koolhydraten", value: 45, color: "#f59e0b" },
    { name: "Vetten", value: 30, color: "#10b981" },
  ];

  const weeklyStats = {
    avgCalories: 1979,
    avgWeight: 73.8,
    goalAchieved: 5,
    totalDays: 7
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Gem. Calorieën", value: weeklyStats.avgCalories, unit: "kcal", icon: "🔥", color: "from-orange-400 to-red-500" },
          { title: "Huidig Gewicht", value: weeklyStats.avgWeight, unit: "kg", icon: "⚖️", color: "from-blue-400 to-blue-600" },
          { title: "Doelen Behaald", value: weeklyStats.goalAchieved, unit: `/${weeklyStats.totalDays}`, icon: "🎯", color: "from-green-400 to-emerald-500" },
          { title: "Voortgang", value: Math.round((weeklyStats.goalAchieved / weeklyStats.totalDays) * 100), unit: "%", icon: "📈", color: "from-purple-400 to-purple-600" },
        ].map((stat, index) => (
          <Card key={stat.title} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}{stat.unit}
              </div>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weight Progress Chart */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            📊 Gewichtsverlies Voortgang
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="datum" />
                <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                <Tooltip 
                  formatter={(value) => [`${value} kg`,  'Gewicht']}
                  labelFormatter={(label) => `Datum: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="gewicht" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Calorie Tracking */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            🔥 Calorie Tracking - Deze Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={calorieData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="dag" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} kcal`, 
                    name === 'doel' ? 'Doel' : 'Werkelijk'
                  ]}
                />
                <Bar dataKey="doel" fill="#e5e7eb" name="doel" />
                <Bar dataKey="werkelijk" fill="#10b981" name="werkelijk" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Macro Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              🥗 Macro Verdeling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {macroDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏆 Behaalde Doelen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                <span>Caloriedoel bereikt</span>
                <span className="font-bold">5/7 dagen</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                <span>Eiwitdoel bereikt</span>
                <span className="font-bold">6/7 dagen</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                <span>Water doel bereikt</span>
                <span className="font-bold">4/7 dagen</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                <span>Gewichtsdoel</span>
                <span className="font-bold">Op schema! 📈</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressCharts;
