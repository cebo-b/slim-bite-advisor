
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Image, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalyzedFood {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
  confidence: number;
}

interface FoodPhotoAnalyzerProps {
  onFoodAnalyzed: (food: AnalyzedFood) => void;
}

const FoodPhotoAnalyzer = ({ onFoodAnalyzed }: FoodPhotoAnalyzerProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const analyzeFood = async () => {
    if (!selectedImage || !apiKey) {
      toast({
        title: "Fout",
        description: "Selecteer een foto en voer je API key in",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Convert image to base64
      const base64Image = await convertToBase64(selectedImage);
      
      // Mock AI analysis - In een echte app zou je een AI service gebruiken
      // zoals OpenAI Vision API, Google Vision API, of een gespecialiseerde voedsel-AI
      await simulateAIAnalysis();
      
      // Simuleer resultaat (in werkelijkheid zou dit van de AI API komen)
      const analyzedFood: AnalyzedFood = {
        name: "Gegrilde zalm met groenten",
        calories: 385,
        protein: 28,
        carbs: 12,
        fat: 24,
        portion: "1 portie (250g)",
        confidence: 0.89
      };

      onFoodAnalyzed(analyzedFood);
      
      toast({
        title: "Analyse voltooid!",
        description: `${analyzedFood.name} gedetecteerd met ${Math.round(analyzedFood.confidence * 100)}% zekerheid`,
      });

      // Reset
      setSelectedImage(null);
      setPreviewUrl("");
      
    } catch (error) {
      toast({
        title: "Analyse mislukt",
        description: "Er ging iets mis tijdens de foto-analyse",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const simulateAIAnalysis = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-700">
          <Camera className="h-5 w-5" />
          AI Foto Analyse
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* API Key Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OpenAI API Key (tijdelijk)
          </label>
          <Input
            type="password"
            placeholder="Voer je OpenAI API key in..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="border-emerald-200 focus:border-emerald-400"
          />
          <p className="text-xs text-gray-500 mt-1">
            Voor demo doeleinden. In productie zou dit veilig opgeslagen worden.
          </p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecteer een foto van je voedsel
          </label>
          <div className="border-2 border-dashed border-emerald-200 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
            {previewUrl ? (
              <div className="space-y-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full max-h-48 mx-auto rounded-lg object-cover"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedImage(null);
                    setPreviewUrl("");
                  }}
                  className="text-gray-600"
                >
                  Andere foto selecteren
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Image className="h-12 w-12 mx-auto text-gray-400" />
                <p className="text-gray-600">Klik om een foto te selecteren</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="food-image"
                />
                <label
                  htmlFor="food-image"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 cursor-pointer transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  Foto selecteren
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        {selectedImage && apiKey && (
          <Button
            onClick={analyzeFood}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyseren...
              </>
            ) : (
              <>
                <Camera className="h-4 w-4 mr-2" />
                Analyseer Voedsel
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodPhotoAnalyzer;
