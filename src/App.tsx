import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { RecipeImportScreen } from './components/RecipeImportScreen';
import { RecipeDetailScreen } from './components/RecipeDetailScreen';
import { NutritionalScoreScreen } from './components/NutritionalScoreScreen';
import { WeeklyPlannerScreen } from './components/WeeklyPlannerScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { RecipesScreen } from './components/RecipesScreen';
import { CookingAssistantScreen } from './components/CookingAssistantScreen';
import { PaywallScreen } from './components/PaywallScreen';
import { BottomNavigation } from './components/BottomNavigation';

export interface Recipe {
  id: string;
  title: string;
  url: string;
  ingredients: string[];
  steps: string[];
  cost: number;
  costPerServing: number;
  nutritionalScore: {
    grade: 'A' | 'B' | 'C' | 'D' | 'E';
    sugar: 'low' | 'medium' | 'high';
    salt: 'low' | 'medium' | 'high';
    fat: 'low' | 'medium' | 'high';
    processing: 'low' | 'medium' | 'high';
    allergens: string[];
  };
  substitutions?: {
    ingredient: string;
    alternatives: string[];
    reason: string;
  }[];
  techniques?: {
    name: string;
    description: string;
    /** Numéro de l’étape concernée (1, 2, 3, …) */
    stepIndex?: number;
    /** URL de la vidéo (YouTube, etc.) – optionnelle pour plus tard */
    videoUrl?: string;
  }[];

  /** Nombre de portions de référence de la recette originale */
  baseServings?: number;

  /** Catégories internes Plein l’Assiette (pâtes, déjeuner, etc.) */
  categories?: string[];

  /** Type de source : site, reel, TikTok, etc. */
  sourceType?: 'website' | 'video' | 'social' | 'other';

  /** Plateforme facultative (YouTube, TikTok, Instagram…) */
  sourcePlatform?: string;

  prepTime?: string;
  servings?: number;
}

export interface WeeklyPlan {
  [day: string]: Recipe | null;
}

export type UserTier = 'light' | 'premium';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [userTier, setUserTier] = useState<UserTier>('premium'); // Mode premium permanent pour le développement

  // Recettes de départ
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: '1',
      title: 'Salade méditerranéenne de pois chiches',
      url: 'https://example.com/recipe1',
      ingredients: [
        '2 boîtes de pois chiches (400 g chacune), rincés et égouttés',
        '1 concombre, coupé en dés',
        '2 tomates, coupées en dés',
        '1/2 oignon rouge, émincé',
        '100 g de feta émiettée',
        '3 c. à soupe d’huile d’olive',
        '2 c. à soupe de jus de citron',
        'Persil frais, haché'
      ],
      steps: [
        'Rincer et égoutter les pois chiches.',
        'Couper le concombre, les tomates et l’oignon rouge en petits morceaux.',
        'Mélanger les pois chiches et les légumes dans un grand bol.',
        'Ajouter la feta émiettée sur le dessus.',
        'Fouetter l’huile d’olive et le jus de citron pour préparer la vinaigrette.',
        'Verser la vinaigrette sur la salade et bien mélanger.',
        'Parsemer de persil frais et servir.'
      ],
      cost: 8.5,
      costPerServing: 2.13,
      nutritionalScore: {
        grade: 'A',
        sugar: 'low',
        salt: 'medium',
        fat: 'medium',
        processing: 'low',
        allergens: ['dairy']
      },
      substitutions: [
        {
          ingredient: 'Fromage feta',
          alternatives: ['Feta végane', 'Cubes de tofu', 'Levure nutritionnelle'],
          reason: 'Pour une version sans produits laitiers ou végane.'
        },
        {
          ingredient: 'Huile d’olive',
          alternatives: ['Huile d’avocat', 'Huile de tournesol'],
          reason: 'Pour des options plus économiques ou selon les goûts.'
        }
      ],
      techniques: [
        {
          name: 'Émulsion',
          description:
            'Fouetter énergiquement l’huile et le jus de citron pour obtenir une vinaigrette homogène où les saveurs sont bien liées.'
        }
      ],
      image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80',
      prepTime: '15 min',
      servings: 4,
      baseServings: 4,
      categories: ['Salade', 'Végétarien', 'Rapide'],
      sourceType: 'website',
      sourcePlatform: ''
    },
    {
      id: '2',
      title: 'Sauté de légumes et tofu express',
      url: 'https://example.com/recipe2',
      ingredients: [
        '2 tasses de légumes variés (poivrons, brocoli, carottes)',
        '200 g de tofu ferme, coupé en cubes',
        '3 c. à soupe de sauce soya',
        '1 c. à soupe d’huile de sésame',
        '2 gousses d’ail, hachées finement',
        '1 c. à thé de gingembre frais râpé',
        '2 tasses de riz cuit',
        '1 c. à soupe de fécule de maïs'
      ],
      steps: [
        'Couper le tofu en cubes et le presser pour retirer l’excès d’eau.',
        'Hacher l’ail et râper le gingembre.',
        'Chauffer l’huile de sésame dans un wok ou une grande poêle à feu vif.',
        'Faire revenir le tofu jusqu’à ce qu’il soit doré.',
        'Ajouter les légumes et cuire quelques minutes pour qu’ils restent croquants.',
        'Ajouter l’ail, le gingembre et la sauce soya.',
        'Délayer la fécule de maïs dans un peu d’eau et verser dans la poêle pour épaissir la sauce.',
        'Servir immédiatement sur le riz chaud.'
      ],
      cost: 6.0,
      costPerServing: 3.0,
      nutritionalScore: {
        grade: 'B',
        sugar: 'low',
        salt: 'high',
        fat: 'medium',
        processing: 'low',
        allergens: ['soy']
      },
      substitutions: [
        {
          ingredient: 'Tofu',
          alternatives: ['Poitrine de poulet', 'Pois chiches', 'Tempeh'],
          reason: 'Pour varier les sources de protéines.'
        },
        {
          ingredient: 'Sauce soya',
          alternatives: ['Tamari (sans gluten)', 'Aminos de coco'],
          reason: 'Pour les personnes sensibles au gluten ou au soya.'
        }
      ],
      techniques: [
        {
          name: 'Sauté à feu vif',
          description:
            'Cuire rapidement les ingrédients à feu élevé en remuant constamment pour garder les légumes croquants et savoureux.'
        }
      ],
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
      prepTime: '20 min',
      servings: 2,
      baseServings: 2,
      categories: ['Plat principal', 'Végétarien', 'Wok'],
      sourceType: 'website',
      sourcePlatform: ''
    }
  ]);

  // Plan de la semaine (basé sur les recettes de départ)
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({
    Monday: recipes[0],
    Tuesday: null,
    Wednesday: recipes[1],
    Thursday: null,
    Friday: null,
    Saturday: null,
    Sunday: null
  });

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [weeklyBudget] = useState<number>(50);

  // Ajout d'une recette depuis l'écran "Importer une recette"
  function handleAddRecipe(data: { title: string; sourceUrl?: string }) {
  // 1) Si on a une URL Ricardo, on SIMULE une extraction complète
  const url = data.sourceUrl ?? '';

  if (url.includes('ricardocuisine.com')) {
    const simulated: Recipe = {
      id: Date.now().toString(),
      title: data.title || 'Bœuf croustillant au miel et à l’ail',
      url,
      image: 'https://assets.ricardocuisine.com/services/recipes/10988.jpg', // exemple fictif
      ingredients: [
        '500 g de bœuf en lanières',
        '2 gousses d’ail, hachées',
        '2 c. à soupe de miel',
        '2 c. à soupe de sauce soya',
        '1 c. à soupe d’huile de sésame',
        '1 c. à soupe de fécule de maïs',
        '1 oignon vert, émincé',
        '1 c. à soupe de graines de sésame (facultatif)'
      ],
      steps: [
        'Mélanger le miel, la sauce soya, l’ail et la fécule pour préparer la sauce.',
        'Saisir le bœuf à feu vif jusqu’à ce qu’il soit bien doré.',
        'Ajouter la sauce et laisser épaissir quelques minutes en remuant.',
        'Garnir d’oignon vert et de graines de sésame, puis servir avec du riz ou des légumes.'
      ],
      cost: 0,
      costPerServing: 0,
      nutritionalScore: {
        grade: 'C',
        sugar: 'medium',
        salt: 'medium',
        fat: 'medium',
        processing: 'medium',
        allergens: ['soy']
      },
      substitutions: [],
techniques: [
  {
    name: 'Saisir à feu vif',
    description:
      'Cuire la viande dans une poêle très chaude avec peu de matière grasse pour obtenir une belle coloration sans la dessécher.',
    stepIndex: 2,
    // IMPORTANT : clé et orthographe exactes
    videoUrl: 'https://www.youtube.com/embed/XD9mQTkctGrM'
  }
],

      prepTime: '25 min',
      servings: 4,
      baseServings: 4,
      categories: ['Bœuf', 'Semaine rapide'],
      sourceType: 'website',
      sourcePlatform: 'Ricardo'
    };

    setRecipes((prev) => [...prev, simulated]);
    setSelectedRecipe(simulated);
    setCurrentScreen('recipe-detail');
    setCurrentTab('recipes');
    return;
  }

  // 2) Sinon, fallback générique (coquille à compléter)
  const newRecipe: Recipe = {
    id: Date.now().toString(),
    title: data.title,
    url,
    ingredients: [
      'À personnaliser : liste d’ingrédients à ajouter plus tard à partir de la recette originale.'
    ],
    steps: [
      'Étape 1 : consulter la recette originale.',
      'Étape 2 : compléter les champs ingrédients et étapes dans Plein l’Assiette lorsque tu as un moment.'
    ],
    cost: 0,
    costPerServing: 0,
    nutritionalScore: {
      grade: 'C',
      sugar: 'medium',
      salt: 'medium',
      fat: 'medium',
      processing: 'medium',
      allergens: []
    },
    substitutions: [],
    techniques: [],
    image: undefined,
    prepTime: undefined,
    servings: 4,
    baseServings: 4,
    categories: ['À classer'],
    sourceType: 'website',
    sourcePlatform: ''
  };

  setRecipes((prev) => [...prev, newRecipe]);
  setSelectedRecipe(newRecipe);
  setCurrentScreen('recipe-detail');
  setCurrentTab('recipes');
}

  const calculateWeeklySpent = () => {
    return Object.values(weeklyPlan).reduce((total, recipe) => {
      return recipe ? total + recipe.cost : total;
    }, 0);
  };

  const handleAddToWeeklyPlan = (recipe: Recipe, day?: string) => {
    // Limite pour l'abonnement "light" (garde la logique au cas où)
    if (userTier === 'light') {
      const plannedCount = Object.values(weeklyPlan).filter(Boolean).length;
      if (plannedCount >= 3 && !weeklyPlan[day || '']) {
        setCurrentScreen('paywall');
        return;
      }
    }

    if (day) {
      setWeeklyPlan({ ...weeklyPlan, [day]: recipe });
    }
  };

  const handleRemoveFromPlan = (day: string) => {
    setWeeklyPlan({ ...weeklyPlan, [day]: null });
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);

    // Écrans associés aux onglets du bas
    if (['home', 'recipes', 'planner', 'profile'].includes(screen)) {
      setCurrentTab(screen);
    }
  };

  const handleUpgradeToPremium = () => {
    setUserTier('premium');
    setCurrentScreen(currentTab);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            recipes={recipes}
            weeklyPlan={weeklyPlan}
            weeklyBudget={weeklyBudget}
            weeklySpent={calculateWeeklySpent()}
            userTier={userTier}
            onNavigate={handleNavigate}
            onSelectRecipe={(recipe) => {
              setSelectedRecipe(recipe);
              setCurrentScreen('recipe-detail');
            }}
          />
        );
      case 'import':
        return (
          <RecipeImportScreen
            onAddRecipe={handleAddRecipe}
            onBack={() => setCurrentScreen(currentTab)}
          />
        );
      case 'recipe-detail':
        return selectedRecipe ? (
          <RecipeDetailScreen
            recipe={selectedRecipe}
            userTier={userTier}
            onBack={() => setCurrentScreen(currentTab)}
            onViewNutrition={() => {
              if (userTier === 'light') {
                setCurrentScreen('paywall');
              } else {
                setCurrentScreen('nutrition');
              }
            }}
            onAddToPlan={(day) => {
              handleAddToWeeklyPlan(selectedRecipe, day);
              if (
                userTier === 'premium' ||
                Object.values(weeklyPlan).filter(Boolean).length < 3
              ) {
                setCurrentScreen('planner');
                setCurrentTab('planner');
              }
            }}
            onUpgrade={() => setCurrentScreen('paywall')}
          />
        ) : null;
      case 'nutrition':
        return selectedRecipe ? (
          <NutritionalScoreScreen
            recipe={selectedRecipe}
            onBack={() => setCurrentScreen('recipe-detail')}
          />
        ) : null;
      case 'cooking-assistant':
        return (
          <CookingAssistantScreen
            recipe={selectedRecipe}
            userTier={userTier}
            onBack={() => setCurrentScreen(currentTab)}
            onUpgrade={() => setCurrentScreen('paywall')}
          />
        );
      case 'recipes':
        return (
          <RecipesScreen
            recipes={recipes}
            userTier={userTier}
            onSelectRecipe={(recipe) => {
              setSelectedRecipe(recipe);
              setCurrentScreen('recipe-detail');
            }}
            onNavigate={handleNavigate}
          />
        );
      case 'planner':
        return (
          <WeeklyPlannerScreen
            weeklyPlan={weeklyPlan}
            weeklyBudget={weeklyBudget}
            weeklySpent={calculateWeeklySpent()}
            recipes={recipes}
            userTier={userTier}
            onAddRecipe={(day, recipe) => handleAddToWeeklyPlan(recipe, day)}
            onRemoveRecipe={handleRemoveFromPlan}
            onSelectRecipe={(recipe) => {
              setSelectedRecipe(recipe);
              setCurrentScreen('recipe-detail');
            }}
            onUpgrade={() => setCurrentScreen('paywall')}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            userTier={userTier}
            onNavigate={handleNavigate}
          />
        );
      case 'paywall':
        return (
          <PaywallScreen
            onUpgrade={handleUpgradeToPremium}
            onBack={() => setCurrentScreen(currentTab)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg relative">
        {renderScreen()}
        <BottomNavigation
          currentTab={currentTab}
          userTier={userTier}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}
