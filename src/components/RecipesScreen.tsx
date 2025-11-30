import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import type { Recipe, UserTier } from '../App';

interface RecipesScreenProps {
  recipes: Recipe[];
  userTier: UserTier;
  onSelectRecipe: (recipe: Recipe) => void;
  onNavigate: (screen: string) => void;
}

export function RecipesScreen({ recipes, userTier, onSelectRecipe, onNavigate }: RecipesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-8">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">
            Mes recettes
          </h1>
          <p className="text-gray-600">
            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} saved
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Import Button */}
        <button
          onClick={() => onNavigate('import')}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-2xl p-4 flex items-center justify-center gap-3 shadow-lg active:scale-98 transition-transform mb-6"
        >
          <Plus size={20} />
          <span>Import New Recipe</span>
        </button>

        {/* Recipes Grid */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {recipes.length === 0 ? (
              <>
                <p>No recipes yet.</p>
                <p className="text-sm mt-2">Import your first recipe to get started!</p>
              </>
            ) : (
              <>
                <p>No recipes found.</p>
                <p className="text-sm mt-2">Try a different search term.</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredRecipes.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-orange-300 transition-colors active:scale-98 shadow-sm"
              >
                {recipe.image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-gray-900 mb-2 text-left">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-3 flex-wrap">
                    {recipe.prepTime && <span>⏱ {recipe.prepTime}</span>}
                    {recipe.servings && <span>👥 {recipe.servings}</span>}
                    {userTier === 'premium' && (
                      <span>💰 ${recipe.costPerServing.toFixed(2)}/serving</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {userTier === 'premium' && (
                      <div 
                        className={`px-3 py-1 rounded-full text-sm ${
                          recipe.nutritionalScore.grade === 'A' ? 'bg-green-100 text-green-700' :
                          recipe.nutritionalScore.grade === 'B' ? 'bg-lime-100 text-lime-700' :
                          recipe.nutritionalScore.grade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                          recipe.nutritionalScore.grade === 'D' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}
                      >
                        Score: {recipe.nutritionalScore.grade}
                      </div>
                    )}
                    {userTier === 'premium' && recipe.nutritionalScore.allergens.length > 0 && (
                      <div className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                        ⚠ Allergens
                      </div>
                    )}
                    {recipe.substitutions && recipe.substitutions.length > 0 && userTier === 'premium' && (
                      <div className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        🔄 Substitutions
                      </div>
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
