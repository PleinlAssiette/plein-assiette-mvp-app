import { Plus, DollarSign, TrendingUp, Lock, Sparkles, BookOpen, Calendar } from 'lucide-react';
import type { Recipe, WeeklyPlan, UserTier } from '../App';

interface HomeScreenProps {
  recipes: Recipe[];
  weeklyPlan: WeeklyPlan;
  weeklyBudget: number;
  weeklySpent: number;
  userTier: UserTier;
  onNavigate: (screen: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export function HomeScreen({
  recipes,
  weeklyPlan,
  weeklyBudget,
  weeklySpent,
  userTier,
  onNavigate,
  onSelectRecipe
}: HomeScreenProps) {
  const remainingBudget = weeklyBudget - weeklySpent;
  const plannedMeals = Object.values(weeklyPlan).filter(Boolean).length;

  return (
    <div className="p-6 pb-8">
      {/* Header with tier badge */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-gray-900">
            Re-bienvenue dans Plein l’Assiette 👋
          </h1>
          {userTier === 'premium' ? (
            <div className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center gap-1.5">
              <Sparkles size={14} className="text-white" />
              <span className="text-white text-sm">Premium</span>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('paywall')}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 text-sm transition-colors"
            >
              Upgrade ✨
            </button>
          )}
        </div>
        <p className="text-gray-600">
          Let's plan some delicious meals
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          onClick={() => onNavigate('import')}
          className="bg-white border-2 border-orange-200 rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-orange-400 transition-colors active:scale-95"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Plus size={24} className="text-orange-600" />
          </div>
          <span className="text-sm text-gray-700 text-center">Importer une recette</span>
        </button>

        <button
          onClick={() => onNavigate('recipes')}
          className="bg-white border-2 border-blue-200 rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-blue-400 transition-colors active:scale-95"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <BookOpen size={24} className="text-blue-600" />
          </div>
          <span className="text-sm text-gray-700 text-center">Mes recettes</span>
        </button>

        <button
          onClick={() => onNavigate('planner')}
          className="bg-white border-2 border-green-200 rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-green-400 transition-colors active:scale-95"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Calendar size={24} className="text-green-600" />
          </div>
          <span className="text-sm text-gray-700 text-center">Planificateur</span>
        </button>
      </div>

      {/* Premium Banner (Light users only) */}
      {userTier === 'light' && (
        <button
          onClick={() => onNavigate('paywall')}
          className="w-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-5 mb-6 text-white shadow-lg hover:shadow-xl transition-shadow active:scale-98"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles size={24} />
            <span className="text-xl">Upgrade to Premium</span>
          </div>
          <p className="text-sm text-white/90 text-left">
            Unlock nutritional scores, cooking assistant, unlimited planning & more!
          </p>
        </button>
      )}

      {/* Budget Card (Premium feature) */}
      {userTier === 'premium' ? (
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={20} />
            <span className="text-orange-100">Weekly Budget</span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl">${remainingBudget.toFixed(2)}</span>
            <span className="text-orange-100">remaining</span>
          </div>
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-white h-full transition-all"
              style={{ width: `${((weeklyBudget - remainingBudget) / weeklyBudget) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-orange-100">
            ${weeklySpent.toFixed(2)} spent of ${weeklyBudget.toFixed(2)}
          </div>
        </div>
      ) : (
        <div className="relative bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl p-6 mb-6 text-white shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <Lock size={32} className="mx-auto mb-2" />
              <p className="text-sm">Budget tracking</p>
              <p className="text-xs text-white/80">Premium feature</p>
            </div>
          </div>
          <div className="blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} />
              <span className="text-orange-100">Weekly Budget</span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl">$42.50</span>
              <span className="text-orange-100">remaining</span>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Summary */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={20} className="text-amber-600" />
          <span className="text-amber-900">This Week's Plan</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl text-amber-900">{plannedMeals}</span>
          <span className="text-amber-700">
            meals planned {userTier === 'light' && `(${plannedMeals}/3 free limit)`}
          </span>
        </div>
        <button
          onClick={() => onNavigate('planner')}
          className="mt-3 text-amber-700 underline"
        >
          View full planner →
        </button>
      </div>

      {/* Premium Features Preview (Light users) */}
      {userTier === 'light' && (
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 mb-6">
          <p className="text-gray-900 mb-3">
            🔒 Locked Premium Features
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-gray-400" />
              <span>Nutritional scoring & education</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-gray-400" />
              <span>AI cooking assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-gray-400" />
              <span>Unlimited meal planning</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-gray-400" />
              <span>Recipe substitutions</span>
            </div>
          </div>
        </div>
      )}

      {/* Recently Imported */}
      <div>
        <h2 className="text-gray-900 mb-4">
          Recently Imported
        </h2>
        
        {recipes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No recipes yet.</p>
            <p className="text-sm mt-2">Import your first recipe to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recipes.slice(0, 3).map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 hover:border-orange-300 transition-colors active:scale-98"
              >
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 text-left">
                  <h3 className="text-gray-900 mb-1">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    {recipe.prepTime && <span>⏱ {recipe.prepTime}</span>}
                    {userTier === 'premium' && (
                      <span>💰 ${recipe.costPerServing.toFixed(2)}/serving</span>
                    )}
                    {userTier === 'premium' && (
                      <span 
                        className={`px-2 py-0.5 rounded-full ${
                          recipe.nutritionalScore.grade === 'A' ? 'bg-green-100 text-green-700' :
                          recipe.nutritionalScore.grade === 'B' ? 'bg-lime-100 text-lime-700' :
                          recipe.nutritionalScore.grade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                          recipe.nutritionalScore.grade === 'D' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}
                      >
                        {recipe.nutritionalScore.grade}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
