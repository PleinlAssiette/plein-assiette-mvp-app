import { User, DollarSign, Bell, HelpCircle, Settings, LogOut, Sparkles, Crown } from 'lucide-react';
import type { UserTier } from '../App';

interface ProfileScreenProps {
  userTier: UserTier;
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({ userTier, onNavigate }: ProfileScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-8">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">
            Profile
          </h1>
          <p className="text-gray-600">
            Manage your account and preferences
          </p>
        </div>

        {/* User Card */}
        <div className={`rounded-3xl p-6 mb-8 text-white shadow-lg ${
          userTier === 'premium' 
            ? 'bg-gradient-to-br from-amber-400 to-orange-500' 
            : 'bg-gradient-to-br from-gray-500 to-gray-600'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-1">
                Sarah Johnson
              </h2>
              <p className={userTier === 'premium' ? 'text-orange-100' : 'text-gray-200'}>
                sarah.j@email.com
              </p>
            </div>
            {userTier === 'premium' && (
              <Crown size={24} className="text-white" />
            )}
          </div>
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className={userTier === 'premium' ? 'text-orange-100' : 'text-gray-200'}>
                Account Type
              </span>
              <div className="flex items-center gap-2">
                {userTier === 'premium' && <Sparkles size={16} />}
                <span className="capitalize">{userTier}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className={userTier === 'premium' ? 'text-orange-100' : 'text-gray-200'}>
                Member since
              </span>
              <span>January 2024</span>
            </div>
          </div>
        </div>

        {/* Upgrade Banner (Light users only) */}
        {userTier === 'light' && (
          <button
            onClick={() => onNavigate('paywall')}
            className="w-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-5 mb-8 text-white shadow-lg hover:shadow-xl transition-shadow active:scale-98"
          >
            <div className="flex items-center gap-3 mb-2">
              <Sparkles size={24} />
              <span className="text-xl">Upgrade to Premium</span>
            </div>
            <p className="text-sm text-white/90 text-left">
              Get unlimited planning, AI assistant, nutritional scoring & more!
            </p>
          </button>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
            <div className="text-3xl text-orange-600 mb-2">
              {userTier === 'premium' ? '23' : '5'}
            </div>
            <div className="text-gray-600 text-sm">Recipes Saved</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
            <div className="text-3xl text-orange-600 mb-2">
              {userTier === 'premium' ? '47' : '12'}
            </div>
            <div className="text-gray-600 text-sm">Meals Planned</div>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="space-y-3">
          <h2 className="text-gray-900 mb-4">
            Settings
          </h2>

          {userTier === 'premium' && (
            <button className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 hover:border-orange-300 transition-colors">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <DollarSign size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">Budget Settings</p>
                <p className="text-sm text-gray-500">Manage your weekly budget</p>
              </div>
            </button>
          )}

          <button className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 hover:border-orange-300 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <Bell size={20} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-gray-900">Notifications</p>
              <p className="text-sm text-gray-500">Meal reminders and updates</p>
            </div>
          </button>

          <button className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 hover:border-orange-300 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
              <Settings size={20} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-gray-900">App Preferences</p>
              <p className="text-sm text-gray-500">Customize your experience</p>
            </div>
          </button>

          <button className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 hover:border-orange-300 transition-colors">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
              <HelpCircle size={20} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-gray-900">Help & Support</p>
              <p className="text-sm text-gray-500">Get help and send feedback</p>
            </div>
          </button>

          {userTier === 'premium' && (
            <button className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 hover:border-orange-300 transition-colors">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <Sparkles size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">Manage Subscription</p>
                <p className="text-sm text-gray-500">View billing and cancel</p>
              </div>
            </button>
          )}
        </div>

        {/* Logout */}
        <button className="w-full mt-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-center gap-3 text-red-600 hover:bg-red-100 transition-colors">
          <LogOut size={20} />
          <span>Log Out</span>
        </button>

        {/* App Info */}
        <div className="mt-8 text-center space-y-2 text-sm text-gray-500">
          <p>CookSmart v1.0.0</p>
          <p className="mt-1">Empowering cooking autonomy for young adults</p>
          {userTier === 'light' && (
            <button
              onClick={() => onNavigate('paywall')}
              className="text-orange-600 hover:text-orange-700 underline block mx-auto mt-3"
            >
              Learn about Premium features
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
