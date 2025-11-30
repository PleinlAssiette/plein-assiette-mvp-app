import { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Users,
  DollarSign,
  ChevronRight,
  Lock,
  Lightbulb,
  Replace,
  ExternalLink,
} from 'lucide-react';
import type { Recipe, UserTier } from '../App';

interface RecipeDetailScreenProps {
  recipe: Recipe;
  userTier: UserTier;
  onBack: () => void;
  onViewNutrition: () => void;
  onAddToPlan: (day?: string) => void;
  onUpgrade: () => void;
}

export function RecipeDetailScreen({
  recipe,
  userTier,
  onBack,
  onViewNutrition,
  onAddToPlan,
  onUpgrade,
}: RecipeDetailScreenProps) {
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [expandedSubstitution, setExpandedSubstitution] = useState<number | null>(null);
  const [activeTechniqueVideo, setActiveTechniqueVideo] = useState<string | null>(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayLabels: Record<string, string> = {
    Monday: 'Lundi',
    Tuesday: 'Mardi',
    Wednesday: 'Mercredi',
    Thursday: 'Jeudi',
    Friday: 'Vendredi',
    Saturday: 'Samedi',
    Sunday: 'Dimanche',
  };

  const gradeColors: Record<Recipe['nutritionalScore']['grade'], string> = {
    A: 'bg-green-500',
    B: 'bg-lime-500',
    C: 'bg-yellow-500',
    D: 'bg-orange-500',
    E: 'bg-red-500',
  };

  // portions de référence
  const baseServings = recipe.baseServings ?? recipe.servings ?? 4;
  const [currentServings, setCurrentServings] = useState<number>(
    recipe.servings ?? baseServings,
  );
  const servingFactor = currentServings / baseServings;

  // fonction simple pour ajuster la première quantité numérique
  function scaleIngredientText(text: string, factor: number): string {
    return text.replace(/(\d+([.,]\d+)?)/, (match) => {
      const value = parseFloat(match.replace(',', '.'));
      if (Number.isNaN(value)) return match;

      const scaled = value * factor;
      const rounded = Number.isInteger(scaled) ? scaled.toString() : scaled.toFixed(1);
      return rounded.replace('.', ',');
    });
  }

  // Regroupe les techniques par numéro d’étape (1, 2, 3, …)
  const techniquesByStep: Record<
    number,
    NonNullable<Recipe['techniques']>[number][]
  > = (recipe.techniques ?? []).reduce(
    (acc, tech) => {
      const index = tech.stepIndex ?? 0;
      if (!acc[index]) acc[index] = [];
      acc[index].push(tech);
      return acc;
    },
    {} as Record<number, NonNullable<Recipe['techniques']>[number][]>,
  );

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Retour</span>
        </button>
      </div>

      {/* Image de la recette */}
      {recipe.image && (
        <div className="w-full h-64 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Titre & méta */}
        <h1 className="text-gray-900 mb-4">{recipe.title}</h1>

        <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
          {recipe.prepTime && (
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{recipe.prepTime}</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>{currentServings} portions</span>
            </div>
          )}
          {userTier === 'premium' && (
            <div className="flex items-center gap-2">
              <DollarSign size={18} />
              <span>{recipe.costPerServing.toFixed(2)} $ / portion</span>
            </div>
          )}
        </div>

        {/* Ajustement des portions */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm text-gray-600">Portions :</span>

          <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() =>
                setCurrentServings((prev) => Math.max(1, prev - 1))
              }
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={currentServings}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!Number.isNaN(value) && value > 0) {
                  setCurrentServings(value);
                }
              }}
              className="w-16 text-center border-l border-r border-gray-200 py-1 text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setCurrentServings((prev) => prev + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {servingFactor !== 1 && (
            <span className="text-xs text-gray-500">
              x{servingFactor.toFixed(2)} par rapport à la recette originale
            </span>
          )}
        </div>

        {/* Bouton vers la recette originale */}
        {recipe.url && (
          <a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-orange-700 hover:text-orange-900 underline mb-6"
          >
            <ExternalLink size={16} />
            <span>Voir la recette originale</span>
          </a>
        )}

        {/* Score nutritionnel */}
        {userTier === 'premium' ? (
          <button
            onClick={onViewNutrition}
            className="w-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 mb-6 hover:border-green-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 ${
                    gradeColors[recipe.nutritionalScore.grade]
                  } rounded-xl flex items-center justify-center text-white`}
                >
                  <span className="text-xl">{recipe.nutritionalScore.grade}</span>
                </div>
                <div className="text-left">
                  <p className="text-gray-900">Score nutritionnel</p>
                  <p className="text-sm text-gray-600">Appuie pour voir les détails</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </button>
        ) : (
          <button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 rounded-2xl p-4 mb-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Lock size={20} />
                <span>Débloque le score nutritionnel</span>
              </div>
            </div>
            <div className="flex items-center justify-between opacity-30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                  <span className="text-xl">A</span>
                </div>
                <div className="text-left">
                  <p className="text-gray-900">Score nutritionnel</p>
                  <p className="text-sm text-gray-600">Fonction premium</p>
                </div>
              </div>
            </div>
          </button>
        )}

        {/* Ingrédients */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-4">Ingrédients</h2>
          <div className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => {
              const displayIngredient =
                servingFactor !== 1
                  ? scaleIngredientText(ingredient, servingFactor)
                  : ingredient;

              return (
                <div key={index}>
                  <div className="flex items-start gap-3 bg-orange-50 rounded-xl p-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-800 flex-1">{displayIngredient}</p>
                  </div>

                  {/* Substitutions (Premium) */}
                  {userTier === 'premium' &&
                    recipe.substitutions &&
                    recipe.substitutions[index] && (
                      <>
                        <button
                          onClick={() =>
                            setExpandedSubstitution(
                              expandedSubstitution === index ? null : index,
                            )
                          }
                          className="ml-9 mt-2 flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700"
                        >
                          <Replace size={14} />
                          <span>Voir les substitutions possibles</span>
                        </button>

                        {expandedSubstitution === index && (
                          <div className="ml-9 mt-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                            <p className="text-sm text-blue-900 mb-2">
                              Alternatives pour{' '}
                              <span className="font-medium">
                                {recipe.substitutions[index].ingredient}
                              </span>
                              :
                            </p>
                            <ul className="space-y-1 text-sm text-blue-800 mb-2">
                              {recipe.substitutions[index].alternatives.map((alt, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-blue-600">•</span>
                                  <span>{alt}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="text-xs text-blue-700 italic">
                              {recipe.substitutions[index].reason}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Étapes */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-4">Instructions</h2>
          <div className="space-y-4">
            {recipe.steps.map((step, index) => {
              const stepNumber = index + 1;
              const stepTechniques = techniquesByStep[stepNumber] ?? [];

              return (
                <div key={index}>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center flex-shrink-0">
                      <span>{stepNumber}</span>
                    </div>
                    <p className="text-gray-700 flex-1 pt-1">{step}</p>
                  </div>

                  {/* Techniques liées à cette étape (Premium) */}
                  {userTier === 'premium' &&
                    stepTechniques.map((tech, i) => (
                      <div
                        key={i}
                        className="ml-12 mt-3 bg-purple-50 border border-purple-200 rounded-xl p-3"
                      >
                        <div className="flex items-start gap-2">
                          <Lightbulb
                            size={16}
                            className="text-purple-600 flex-shrink-0 mt-0.5"
                          />
                          <div>
                            <p className="text-sm text-purple-900 mb-1 font-medium">
                              {tech.name}
                            </p>
                            <p className="text-sm text-purple-800 mb-2">
                              {tech.description}
                            </p>

                            {tech.videoUrl && (
                              <button
                                type="button"
                                onClick={() => setActiveTechniqueVideo(tech.videoUrl!)}
                                className="text-xs font-medium text-purple-700 hover:text-purple-900 underline"
                              >
                                Voir la technique en vidéo
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Teaser Premium pour les abonnés light */}
        {userTier === 'light' && (
          <button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-5 mb-6 text-white shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <Lock size={20} />
              <span className="text-lg">Débloque les fonctions Premium</span>
            </div>
            <div className="text-sm text-white/90 text-left space-y-1">
              <p>✓ Substitutions d’ingrédients</p>
              <p>✓ Explications des techniques de cuisson</p>
              <p>✓ Analyse nutritionnelle détaillée</p>
              <p>✓ Coût par portion</p>
            </div>
          </button>
        )}

        {/* Bouton d’ajout au plan */}
        <div className="sticky bottom-20 pt-4">
          {!showDayPicker ? (
            <button
              onClick={() => setShowDayPicker(true)}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-2xl py-4 shadow-lg active:scale-98 transition-all"
            >
              Ajouter à mon plan de la semaine
            </button>
          ) : (
            <div className="bg-white border-2 border-orange-500 rounded-2xl p-4 shadow-xl">
              <p className="text-gray-900 mb-3">Choisis un jour</p>
              <div className="grid grid-cols-2 gap-2">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => {
                      onAddToPlan(day);
                      setShowDayPicker(false);
                    }}
                    className="py-3 px-4 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl transition-colors"
                  >
                    {dayLabels[day]}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowDayPicker(false)}
                className="w-full mt-3 py-2 text-gray-600 hover:text-gray-900"
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Popup vidéo pour les techniques */}
      {activeTechniqueVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Technique en vidéo
              </h3>
              <button
                type="button"
                onClick={() => setActiveTechniqueVideo(null)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Fermer
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg"
                src={activeTechniqueVideo}
                title="Technique de cuisine"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
