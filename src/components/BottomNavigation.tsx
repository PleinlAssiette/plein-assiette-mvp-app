import { Home, BookOpen, Calendar, User, Sparkles } from 'lucide-react';
import type { UserTier } from '../App';

interface BottomNavigationProps {
  currentTab: string;
  userTier: UserTier;
  onNavigate: (screen: string) => void;
}

export function BottomNavigation({ currentTab, userTier, onNavigate }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: 'Acceuil', icon: Home },
    { id: 'recipes', label: 'Recettes', icon: BookOpen },
    { id: 'planner', label: 'Planificateur', icon: Calendar },
    { id: 'cooking-assistant', label: 'Assistant', icon: Sparkles, premium: true },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          const isPremiumLocked = tab.premium && userTier === 'light';
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors relative ${
                isActive ? 'text-orange-600' : isPremiumLocked ? 'text-gray-300' : 'text-gray-500'
              }`}
            >
              {tab.premium && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles size={10} className="text-white" />
                </div>
              )}
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs mt-1 ${isActive ? '' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
