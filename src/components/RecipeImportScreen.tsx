import { useState } from 'react';
import { ArrowLeft, Link as LinkIcon, Info, Check } from 'lucide-react';

interface RecipeImportScreenProps {
  onAddRecipe: (data: { title: string; sourceUrl?: string }) => void;
  onBack: () => void;
}

export function RecipeImportScreen({ onAddRecipe, onBack }: RecipeImportScreenProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = () => {
    if (!title.trim()) return;

    setIsImporting(true);

    // Simulation d’un délai d’import
    setTimeout(() => {
      onAddRecipe({
        title: title.trim(),
        sourceUrl: url.trim() || undefined,
      });
      setIsImporting(false);
      setTitle('');
      setUrl('');
    }, 800);
  };

  const exampleUrl = 'https://www.foodnetwork.com/recipes/chicken-stir-fry';

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Retour</span>
        </button>
      </div>

      <div className="p-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">
            Importer une recette
          </h1>
          <p className="text-gray-600">
            Ajoute un lien ou une recette trouvée sur ton site de cuisine préféré.
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
          <div className="flex gap-3">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 mb-2">
                Comment ça fonctionne ?
              </p>
              <p className="text-sm text-blue-800 mb-3">
                Colle simplement le lien d’une recette. Nous pourrons ensuite
                structurer les ingrédients, les étapes et les informations utiles
                dans ton livre de recettes Plein l’Assiette.
              </p>
              <div className="space-y-1.5 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-blue-600" />
                  <span>Ingrédients et quantités</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-blue-600" />
                  <span>Instructions étape par étape</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-blue-600" />
                  <span>Temps de cuisson et portions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Titre de la recette */}
        <div className="mb-4">
          <label htmlFor="recipe-title" className="block text-gray-700 mb-3">
            Titre de la recette
          </label>
          <input
            id="recipe-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. Pâtes rapido au thon"
            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={isImporting}
          />
        </div>

        {/* Input Field URL */}
        <div className="mb-4">
          <label htmlFor="recipe-url" className="block text-gray-700 mb-3">
            Lien de la recette (optionnel)
          </label>
          <div className="relative">
            <LinkIcon
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              id="recipe-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemple.com/ma-recette"
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              disabled={isImporting}
            />
          </div>
        </div>

        {/* Example URL */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Exemple de lien :</p>
          <button
            onClick={() => setUrl(exampleUrl)}
            className="text-sm text-orange-600 hover:text-orange-700 underline text-left break-all"
          >
            {exampleUrl}
          </button>
        </div>

        {/* Import Button */}
        <button
          onClick={handleImport}
          disabled={!title.trim() || isImporting}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl py-4 shadow-lg active:scale-95 transition-all"
        >
          {isImporting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Ajout en cours...</span>
            </div>
          ) : (
            <span>Ajouter à ton livre de recettes</span>
          )}
        </button>

        {/* Supported Sites */}
        <div className="mt-12">
          <p className="text-sm text-gray-500 mb-3 text-center">
            Fonctionne avec plusieurs sites de recettes populaires
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['AllRecipes', 'Food Network', 'NYT Cooking', 'Tasty', 'Bon Appétit', 'Serious Eats'].map((site) => (
              <span
                key={site}
                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm"
              >
                {site}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
