import { useState } from 'react';
import { Plus, X, DollarSign, Lock } from 'lucide-react';
import type { Recipe, WeeklyPlan, UserTier } from '../App';

interface WeeklyPlannerScreenProps {
  weeklyPlan: WeeklyPlan;
  weeklyBudget: number;
  weeklySpent: number;
  recipes: Recipe[];
  userTier: UserTier;
  onAddRecipe: (day: string, recipe: Recipe) => void;
  onRemoveRecipe: (day: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onUpgrade: () => void;
}

export function WeeklyPlannerScreen({
  weeklyPlan,
  weeklyBudget,
  weeklySpent,
  recipes,
  userTier,
  onAddRecipe,
  onRemoveRecipe,
  onSelectRecipe,
  onUpgrade
}: WeeklyPlannerScreenProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const remainingBudget = weeklyBudget - weeklySpent;
  const plannedMeals = Object.values(weeklyPlan).filter(Boolean).length;

  const handleDayClick = (day: string) => {
    if (!weeklyPlan[day]) {
      // Check if Light user has reached limit
      if (userTier === 'light' && plannedMeals >= 3) {
        onUpgrade();
        return;
      }
      setSelectedDay(day);
    }
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    if (selectedDay) {
      onAddRecipe(selectedDay, recipe);
      setSelectedDay(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-8">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-gray-900">
              Weekly Planner
            </h1>
            {userTier === 'light' && (
              <button
                onClick={onUpgrade}
                className="text-sm text-orange-600 hover:text-orange-700 underline"
              >
                Upgrade ✨
              </button>
            )}
          </div>
          <p className="text-gray-600">
            Organize your meals for the week
          </p>
        </div>

        {/* Light Tier Limit Warning */}
        {userTier === 'light' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-amber-900">
                Free Plan: {plannedMeals}/3 meals
              </p>
              {plannedMeals >= 3 && (
                <Lock size={16} className="text-amber-600" />
              )}
            </div>
            <div className="bg-amber-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-amber-600 h-full transition-all"
                style={{ width: `${(plannedMeals / 3) * 100}%` }}
              />
            </div>
            {plannedMeals >= 3 && (
              <button
                onClick={onUpgrade}
                className="mt-3 text-sm text-amber-700 hover:text-amber-800 underline"
              >
                Upgrade for unlimited planning →
              </button>
            )}
          </div>
        )}

        {/* Budget Summary (Premium Only) */}
        {userTier === 'premium' ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700">Weekly Budget</span>
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-orange-600" />
                <span className="text-gray-900">
                  ${weeklyBudget.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-full h-3 overflow-hidden mb-2">
              <div 
                className={`h-full transition-all ${
                  weeklySpent > weeklyBudget ? 'bg-red-500' : 'bg-orange-500'
                }`}
                style={{ width: `${Math.min((weeklySpent / weeklyBudget) * 100, 100)}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Spent: ${weeklySpent.toFixed(2)}
              </span>
              <span className={remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}>
                Remaining: ${remainingBudget.toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          <div className="relative bg-gray-100 border border-gray-300 rounded-2xl p-5 mb-6 overflow-hidden">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-10">
              <button
                onClick={onUpgrade}
                className="px-4 py-2 bg-white rounded-xl text-orange-600 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
              >
                <Lock size={16} />
                <span className="text-sm">Unlock Budget Tracking</span>
              </button>
            </div>
            <div className="blur-sm opacity-40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700">Weekly Budget</span>
                <span className="text-gray-900">$50.00</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3 mb-2" />
            </div>
          </div>
        )}

        {/* Calendar */}
        <div className="space-y-3 mb-6">
          {days.map((day) => {
            const recipe = weeklyPlan[day];
            const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day;
            const isLocked = userTier === 'light' && plannedMeals >= 3 && !recipe;

            return (
              <div
                key={day}
                className={`bg-white border-2 rounded-2xl overflow-hidden transition-all ${
                  isToday ? 'border-orange-400 shadow-md' : 'border-gray-200'
                } ${isLocked ? 'opacity-60' : ''}`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">
                        {day}
                      </span>
                      {isToday && (
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">
                          Today
                        </span>
                      )}
                      {isLocked && (
                        <Lock size={14} className="text-gray-400" />
                      )}
                    </div>
                    {recipe && userTier === 'premium' && (
                      <span className="text-orange-600 text-sm">
                        ${recipe.cost.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {recipe ? (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onSelectRecipe(recipe)}
                        className="flex items-center gap-3 flex-1 bg-orange-50 rounded-xl p-3 hover:bg-orange-100 transition-colors"
                      >
                        {recipe.image && (
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 text-left">
                          <p className="text-gray-900 text-sm mb-1">
                            {recipe.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {recipe.prepTime}
                            {userTier === 'premium' && recipe.servings && ` • ${recipe.servings} servings`}
                          </p>
                        </div>
                      </button>
                      <button
                        onClick={() => onRemoveRecipe(day)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex-shrink-0"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDayClick(day)}
                      className={`w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed rounded-xl transition-colors ${
                        isLocked
                          ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 text-gray-500 hover:border-orange-400 hover:text-orange-600'
                      }`}
                      disabled={isLocked}
                    >
                      <Plus size={20} />
                      <span>{isLocked ? 'Upgrade to add' : 'Add meal'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Summary */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span>Total Meals Planned</span>
            <span className="text-2xl">{plannedMeals}</span>
          </div>
          {userTier === 'premium' && (
            <div className="text-sm text-orange-100">
              Total cost: ${weeklySpent.toFixed(2)}
            </div>
          )}
        </div>
      </div>

      {/* Recipe Picker Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50 max-w-md mx-auto">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-gray-900">
                  Select Recipe for {selectedDay}
                </h2>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1 p-6">
              {recipes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No recipes available.</p>
                  <p className="text-sm mt-2">Import some recipes first!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recipes.map((recipe) => (
                    <button
                      key={recipe.id}
                      onClick={() => handleSelectRecipe(recipe)}
                      className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 hover:border-orange-300 transition-colors"
                    >
                      {recipe.image && (
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 text-left">
                        <h3 className="text-gray-900 mb-2">
                          {recipe.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                          <span>⏱ {recipe.prepTime}</span>
                          {userTier === 'premium' && (
                            <>
                              <span>💰 ${recipe.cost.toFixed(2)}</span>
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
                            </>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
