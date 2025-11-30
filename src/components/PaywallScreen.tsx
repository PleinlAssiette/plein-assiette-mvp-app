import { ArrowLeft, Check, Sparkles, X } from 'lucide-react';

interface PaywallScreenProps {
  onUpgrade: () => void;
  onBack: () => void;
}

export function PaywallScreen({ onUpgrade, onBack }: PaywallScreenProps) {
  const features = [
    {
      name: 'Nutritional Scoring',
      light: false,
      premium: true,
      description: 'A–E scores based on Open Food Facts'
    },
    {
      name: 'AI Cooking Assistant',
      light: false,
      premium: true,
      description: 'Get instant help with techniques & substitutions'
    },
    {
      name: 'Recipe Substitutions',
      light: false,
      premium: true,
      description: 'Find alternatives for any ingredient'
    },
    {
      name: 'Weekly Meal Planning',
      light: '3 recipes/week',
      premium: 'Unlimited',
      description: 'Plan as many meals as you want'
    },
    {
      name: 'Budget Tracking',
      light: false,
      premium: true,
      description: 'Track spending & cost per serving'
    },
    {
      name: 'Cooking Techniques',
      light: false,
      premium: true,
      description: 'Learn with step-by-step explanations'
    },
    {
      name: 'Recipe Import',
      light: true,
      premium: true,
      description: 'Import from any recipe website'
    },
    {
      name: 'Recipe Storage',
      light: true,
      premium: true,
      description: 'Save your favorite recipes'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>
      </div>

      <div className="p-6 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles size={40} className="text-white" />
          </div>
          
          <h1 className="text-gray-900 mb-3">
            Upgrade to Premium
          </h1>
          
          <p className="text-gray-600 mb-6">
            Unlock all features and take full control of your cooking journey
          </p>

          <div className="inline-flex items-baseline gap-2 mb-2">
            <span className="text-sm text-gray-500 line-through">$9.99</span>
            <span className="text-4xl text-orange-600">$4.99</span>
            <span className="text-gray-600">/month</span>
          </div>
          <p className="text-sm text-green-600">
            🎉 50% off launch special!
          </p>
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
          {/* Header Row */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-200">
            <div className="text-sm text-gray-600">Features</div>
            <div className="text-center">
              <div className="text-sm text-gray-900">Light</div>
              <div className="text-xs text-gray-500">Free</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-orange-600 flex items-center justify-center gap-1">
                <Sparkles size={14} />
                <span>Premium</span>
              </div>
              <div className="text-xs text-orange-500">$4.99/mo</div>
            </div>
          </div>

          {/* Feature Rows */}
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 gap-4 p-4 ${
                index !== features.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div>
                <p className="text-sm text-gray-900 mb-1">
                  {feature.name}
                </p>
                <p className="text-xs text-gray-500">
                  {feature.description}
                </p>
              </div>
              <div className="flex items-center justify-center">
                {feature.light === true ? (
                  <Check size={20} className="text-green-600" />
                ) : feature.light === false ? (
                  <X size={20} className="text-gray-300" />
                ) : (
                  <span className="text-xs text-gray-600 text-center">{feature.light}</span>
                )}
              </div>
              <div className="flex items-center justify-center">
                {feature.premium === true ? (
                  <Check size={20} className="text-orange-600" />
                ) : (
                  <span className="text-xs text-orange-600 text-center">{feature.premium}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Cards */}
        <div className="space-y-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <p className="text-green-900 mb-2">
              🎓 Learn as you cook
            </p>
            <p className="text-sm text-green-800">
              Get detailed explanations for every cooking technique and understand why each step matters.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <p className="text-blue-900 mb-2">
              💰 Save money
            </p>
            <p className="text-sm text-blue-800">
              Track your food budget, see cost per serving, and get budget-friendly substitution suggestions.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
            <p className="text-purple-900 mb-2">
              🥗 Eat healthier
            </p>
            <p className="text-sm text-purple-800">
              Understand the nutritional value of your meals with detailed scoring and educational insights.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <button
          onClick={onUpgrade}
          className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl py-4 mb-3 shadow-lg hover:shadow-xl transition-shadow active:scale-98 flex items-center justify-center gap-2"
        >
          <Sparkles size={20} />
          <span className="text-lg">Start Premium Now</span>
        </button>

        <button
          onClick={onBack}
          className="w-full py-3 text-gray-600 hover:text-gray-900"
        >
          Maybe later
        </button>

        {/* Trust Badges */}
        <div className="mt-8 text-center space-y-2 text-sm text-gray-500">
          <p>✓ Cancel anytime</p>
          <p>✓ 7-day money-back guarantee</p>
          <p>✓ No hidden fees</p>
        </div>

        {/* Fine Print */}
        <div className="mt-8 text-xs text-gray-400 text-center">
          <p>By subscribing, you agree to our Terms of Service.</p>
          <p className="mt-1">Payment will be charged to your account.</p>
        </div>
      </div>
    </div>
  );
}
