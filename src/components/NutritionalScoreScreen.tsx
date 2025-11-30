import { ArrowLeft, AlertTriangle, Info } from 'lucide-react';
import type { Recipe } from '../App';

interface NutritionalScoreScreenProps {
  recipe: Recipe;
  onBack: () => void;
}

export function NutritionalScoreScreen({ recipe, onBack }: NutritionalScoreScreenProps) {
  const { nutritionalScore } = recipe;

  const gradeInfo = {
    A: { 
      color: 'bg-green-500', 
      text: 'Excellent', 
      description: 'Great nutritional quality',
      education: 'This recipe is rich in nutrients and uses minimally processed ingredients. It provides a good balance of macronutrients without excessive sugar, salt, or unhealthy fats.'
    },
    B: { 
      color: 'bg-lime-500', 
      text: 'Good', 
      description: 'Good nutritional balance',
      education: 'This recipe offers good nutritional value with a balanced composition. Some ingredients may be moderately processed, but overall it\'s a healthy choice.'
    },
    C: { 
      color: 'bg-yellow-500', 
      text: 'Fair', 
      description: 'Moderate nutritional quality',
      education: 'This recipe has average nutritional quality. Consider adding more vegetables or whole grains, and watch portion sizes for sugar, salt, or fat content.'
    },
    D: { 
      color: 'bg-orange-500', 
      text: 'Poor', 
      description: 'Limited nutritional value',
      education: 'This recipe may contain high levels of sugar, salt, or fat, or use highly processed ingredients. Consume occasionally and balance with healthier meals.'
    },
    E: { 
      color: 'bg-red-500', 
      text: 'Very Poor', 
      description: 'Low nutritional quality',
      education: 'This recipe is high in processed ingredients or contains excessive amounts of sugar, salt, or unhealthy fats. Best consumed rarely as an occasional treat.'
    }
  };

  const levelInfo = {
    low: { 
      color: 'bg-green-100 text-green-700 border-green-200', 
      icon: '✓',
      message: 'Good level'
    },
    medium: { 
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200', 
      icon: '!',
      message: 'Moderate level'
    },
    high: { 
      color: 'bg-red-100 text-red-700 border-red-200', 
      icon: '⚠',
      message: 'High level - consume in moderation'
    }
  };

  const processingInfo = {
    low: { 
      text: 'Minimally processed', 
      description: 'Mostly whole foods and fresh ingredients',
      education: 'Great choice! Minimally processed foods retain more nutrients and are generally healthier for your body.'
    },
    medium: { 
      text: 'Moderately processed', 
      description: 'Some processing involved',
      education: 'Some ingredients have been processed for convenience. Try to balance with fresh, whole ingredients when possible.'
    },
    high: { 
      text: 'Highly processed', 
      description: 'Contains many processed ingredients',
      education: 'This recipe uses several processed ingredients. Consider making homemade versions or choosing fresh alternatives for better nutrition.'
    }
  };

  const currentGrade = gradeInfo[nutritionalScore.grade];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Back to Recipe</span>
        </button>
      </div>

      <div className="p-6 pb-20">
        {/* Title */}
        <h1 className="text-gray-900 mb-2">
          Nutritional Score
        </h1>
        <p className="text-gray-600 mb-8">
          Based on Open Food Facts methodology
        </p>

        {/* Main Grade Card */}
        <div className={`${currentGrade.color} rounded-3xl p-8 mb-6 text-white shadow-xl`}>
          <div className="text-center">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-6xl">{nutritionalScore.grade}</span>
            </div>
            <h2 className="text-white mb-2">
              {currentGrade.text}
            </h2>
            <p className="text-white/90">
              {currentGrade.description}
            </p>
          </div>
        </div>

        {/* Educational Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8">
          <div className="flex gap-3">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 mb-2">
                Why this matters
              </p>
              <p className="text-sm text-blue-800">
                {currentGrade.education}
              </p>
            </div>
          </div>
        </div>

        {/* Nutritional Indicators */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-4">
            Nutritional Indicators
          </h2>
          
          <div className="space-y-3">
            {/* Sugar */}
            <div className={`border rounded-2xl p-4 ${levelInfo[nutritionalScore.sugar].color}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="mb-1">Sugar</p>
                  <p className="text-sm capitalize">{nutritionalScore.sugar} level</p>
                </div>
                <span className="text-2xl">{levelInfo[nutritionalScore.sugar].icon}</span>
              </div>
              <p className="text-xs mt-2">
                {levelInfo[nutritionalScore.sugar].message}
              </p>
            </div>

            {/* Salt */}
            <div className={`border rounded-2xl p-4 ${levelInfo[nutritionalScore.salt].color}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="mb-1">Salt</p>
                  <p className="text-sm capitalize">{nutritionalScore.salt} level</p>
                </div>
                <span className="text-2xl">{levelInfo[nutritionalScore.salt].icon}</span>
              </div>
              <p className="text-xs mt-2">
                {levelInfo[nutritionalScore.salt].message}
              </p>
            </div>

            {/* Fat */}
            <div className={`border rounded-2xl p-4 ${levelInfo[nutritionalScore.fat].color}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="mb-1">Fat</p>
                  <p className="text-sm capitalize">{nutritionalScore.fat} level</p>
                </div>
                <span className="text-2xl">{levelInfo[nutritionalScore.fat].icon}</span>
              </div>
              <p className="text-xs mt-2">
                {levelInfo[nutritionalScore.fat].message}
              </p>
            </div>
          </div>
        </div>

        {/* Processing Level */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-4">
            Food Processing
          </h2>
          
          <div className={`border rounded-2xl p-5 ${levelInfo[nutritionalScore.processing].color}`}>
            <p className="mb-2">
              {processingInfo[nutritionalScore.processing].text}
            </p>
            <p className="text-sm mb-3">
              {processingInfo[nutritionalScore.processing].description}
            </p>
            <div className="bg-white/50 rounded-xl p-3 mt-3">
              <p className="text-xs">
                💡 {processingInfo[nutritionalScore.processing].education}
              </p>
            </div>
          </div>
        </div>

        {/* Allergens */}
        {nutritionalScore.allergens.length > 0 && (
          <div className="mb-8">
            <h2 className="text-gray-900 mb-4">
              Allergens
            </h2>
            
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <div className="flex gap-3 mb-3">
                <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-900">
                  This recipe contains the following allergens:
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {nutritionalScore.allergens.map((allergen) => (
                  <span
                    key={allergen}
                    className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full capitalize"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-red-800">
                  💡 Always check ingredient labels carefully if you have food allergies. Consider using the substitution suggestions to adapt this recipe to your dietary needs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
          <p className="text-sm text-purple-900 mb-2">
            About the Nutri-Score
          </p>
          <p className="text-sm text-purple-800 mb-3">
            This nutritional score is inspired by the Open Food Facts Nutri-Score system. 
            It evaluates the overall nutritional quality based on ingredients, processing level, 
            and key nutritional indicators like sugar, salt, and fat content.
          </p>
          <p className="text-xs text-purple-700 italic">
            Understanding nutrition helps you make informed choices about your meals and maintain a balanced diet.
          </p>
        </div>
      </div>
    </div>
  );
}
