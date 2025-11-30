import { useState } from 'react';
import { ArrowLeft, Send, Sparkles, Lock } from 'lucide-react';
import type { Recipe, UserTier } from '../App';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface CookingAssistantScreenProps {
  recipe: Recipe | null;
  userTier: UserTier;
  onBack: () => void;
  onUpgrade: () => void;
}

export function CookingAssistantScreen({ recipe, userTier, onBack, onUpgrade }: CookingAssistantScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your cooking assistant. 👋 Ask me anything about cooking techniques, ingredient substitutions, recipe adaptations, or budgeting tips!',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const suggestedPrompts = [
    {
      icon: '🔪',
      text: 'Explain this cooking technique',
      fullPrompt: 'Can you explain the whisking technique in detail?'
    },
    {
      icon: '🔄',
      text: 'Give me a substitute for this ingredient',
      fullPrompt: recipe ? `What can I substitute for ${recipe.ingredients[0].split(',')[0]} in this recipe?` : 'What can I substitute for butter in baking?'
    },
    {
      icon: '🌾',
      text: 'Adapt this recipe for allergies',
      fullPrompt: 'How can I make this recipe gluten-free and dairy-free?'
    },
    {
      icon: '💰',
      text: 'Adapt this recipe for my budget',
      fullPrompt: 'What are some budget-friendly ingredient swaps for this recipe?'
    }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate assistant response
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        'technique': 'Whisking is a fundamental cooking technique where you rapidly beat ingredients together using a whisk. This incorporates air into the mixture and creates a smooth, homogeneous blend. For dressings, whisk vigorously for 30 seconds to create an emulsion - this helps oil and acidic ingredients (like lemon juice) combine smoothly instead of separating.',
        'substitute': 'Great question! Here are some substitutes:\n\n• For butter: Use coconut oil, olive oil, or applesauce (in baking)\n• For eggs: Try flax eggs (1 tbsp ground flax + 3 tbsp water per egg), mashed banana, or commercial egg replacer\n• For milk: Any plant-based milk works well - almond, oat, or soy\n\nThe key is to match the function - if butter adds moisture, use a moist substitute. If it adds fat, choose a fatty alternative.',
        'allerg': 'To make this recipe allergy-friendly:\n\n1. Gluten-free: Replace wheat flour with a 1:1 gluten-free blend or use almond flour (may need to adjust liquid)\n2. Dairy-free: Swap milk for plant-based alternatives and use vegan butter or oil\n3. Egg-free: Use flax eggs or commercial egg replacer\n\nAlways check all ingredient labels, as allergens can hide in processed foods. Cross-contamination is also important - use clean utensils and surfaces.',
        'budget': 'Here are budget-friendly tips:\n\n• Buy seasonal vegetables - they\'re cheaper and fresher\n• Use dried beans instead of canned (save 50%+)\n• Buy whole chickens and butcher them yourself\n• Replace expensive proteins with eggs, lentils, or tofu\n• Buy generic brands for pantry staples\n• Plan meals around sale items\n\nA typical recipe can be reduced by 30-40% in cost with smart swaps!'
      };

      let responseText = 'I can help you with that! ';
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('technique') || lowerText.includes('whisk')) {
        responseText = responses['technique'];
      } else if (lowerText.includes('substitute') || lowerText.includes('swap')) {
        responseText = responses['substitute'];
      } else if (lowerText.includes('allerg') || lowerText.includes('gluten') || lowerText.includes('dairy')) {
        responseText = responses['allerg'];
      } else if (lowerText.includes('budget') || lowerText.includes('cheap') || lowerText.includes('save')) {
        responseText = responses['budget'];
      } else {
        responseText = 'That\'s a great question! I\'d be happy to help. For the best assistance, try asking about:\n\n• Cooking techniques and methods\n• Ingredient substitutions\n• Dietary adaptations (allergies, preferences)\n• Budget-friendly alternatives\n• Cooking tips and best practices\n\nWhat would you like to know more about?';
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  if (userTier === 'light') {
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

        <div className="p-6 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
            <Lock size={40} className="text-white" />
          </div>
          
          <h1 className="text-gray-900 mb-3 text-center">
            AI Cooking Assistant
          </h1>
          
          <p className="text-gray-600 text-center mb-8 max-w-sm">
            Get instant help with cooking techniques, ingredient substitutions, 
            allergy adaptations, and budgeting tips.
          </p>

          <div className="w-full max-w-sm space-y-3 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-4 opacity-50">
              <p className="text-sm text-gray-700">💬 "How do I make this gluten-free?"</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 opacity-50">
              <p className="text-sm text-gray-700">💬 "What's a cheaper alternative to this ingredient?"</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 opacity-50">
              <p className="text-sm text-gray-700">💬 "Explain the sautéing technique"</p>
            </div>
          </div>

          <button
            onClick={onUpgrade}
            className="w-full max-w-sm bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl py-4 shadow-lg hover:shadow-xl transition-shadow active:scale-98 flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            <span>Upgrade to Premium</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full">
            <Sparkles size={14} className="text-white" />
            <span className="text-white text-sm">AI Assistant</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === 'user'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              {message.sender === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-orange-600" />
                  <span className="text-sm text-orange-600">Assistant</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="mt-8">
            <p className="text-gray-600 text-sm mb-4">Suggested questions:</p>
            <div className="grid grid-cols-1 gap-3">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(prompt.fullPrompt)}
                  className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-orange-300 transition-colors active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{prompt.icon}</span>
                    <span className="text-gray-700">{prompt.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-md mx-auto">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder="Ask me anything about cooking..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="w-12 h-12 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl flex items-center justify-center transition-colors active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
