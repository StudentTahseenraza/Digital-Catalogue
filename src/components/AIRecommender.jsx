import React, { useState } from 'react';
import { Sparkles, Zap, Home, Building2, Factory, Battery, Sun, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIRecommender = ({ products }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Ensure products is always an array
  const allProducts = Array.isArray(products) ? products : [];

  const questions = [
    {
      id: 'application',
      question: "What is the primary application?",
      options: [
        { value: 'home', label: 'Home', icon: Home, desc: 'Residential use' },
        { value: 'office', label: 'Office', icon: Building2, desc: 'Commercial office' },
        { value: 'factory', label: 'Factory', icon: Factory, desc: 'Industrial' }
      ]
    },
    {
      id: 'power',
      question: "What is your power requirement?",
      options: [
        { value: 'small', label: 'Small (Up to 1kW)', icon: Zap, desc: 'Basic backup' },
        { value: 'medium', label: 'Medium (1-3kW)', icon: Zap, desc: 'Medium loads' },
        { value: 'large', label: 'Large (3-5kW+)', icon: Zap, desc: 'Heavy loads' }
      ]
    },
    {
      id: 'backup',
      question: "How many hours of backup do you need?",
      options: [
        { value: '2-4', label: '2-4 Hours', desc: 'Short backup' },
        { value: '4-6', label: '4-6 Hours', desc: 'Standard backup' },
        { value: '6+', label: '6+ Hours', desc: 'Extended backup' }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      generateRecommendations();
    }
  };

  const generateRecommendations = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...allProducts];
      
      if (answers.application === 'home') {
        filtered = filtered.filter(p => 
          p.category === 'Inverters' || p.category === 'Batteries'
        );
      } else if (answers.application === 'office') {
        filtered = filtered.filter(p => 
          p.category === 'UPS Systems' || p.category === 'Inverters'
        );
      } else if (answers.application === 'factory') {
        filtered = filtered.filter(p => 
          p.category === 'UPS Systems'
        );
      }

      setRecommendations(filtered.slice(0, 3));
      setIsLoading(false);
      setStep(4);
    }, 1500);
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({});
    setRecommendations([]);
  };

  // Render loading state if no products
  if (!allProducts.length) {
    return (
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-white/20 p-2 rounded-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">AI Product Recommender</h3>
            <p className="text-white/80 text-sm">Loading products...</p>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4" />
          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-white/20 p-2 rounded-lg">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">AI Product Recommender</h3>
          <p className="text-white/80 text-sm">Find your perfect power solution</p>
        </div>
      </div>

      {step <= 3 && (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${(step / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div>
            <p className="text-sm text-white/80 mb-2">Question {step} of {questions.length}</p>
            <h4 className="text-lg font-semibold mb-4">{questions[step-1].question}</h4>
            
            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {questions[step-1].options.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(questions[step-1].id, option.value)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left transition w-full"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-semibold block">{option.label}</span>
                        <span className="text-xs text-white/70">{option.desc}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4" />
              <p>AI is analyzing your requirements...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Recommended for you</h4>
                <button 
                  onClick={resetQuiz}
                  className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"
                >
                  Start Over
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {recommendations.length > 0 ? (
                  recommendations.map((product, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {product.category === 'Inverters' && <Zap className="h-4 w-4" />}
                        {product.category === 'Batteries' && <Battery className="h-4 w-4" />}
                        {product.category === 'Solar Panels' && <Sun className="h-4 w-4" />}
                        <span className="text-sm font-medium">{product.category}</span>
                      </div>
                      <h5 className="font-bold text-lg mb-2">{product.name}</h5>
                      <Link
                        to={`/contact?product=${encodeURIComponent(product.name)}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold bg-white text-purple-600 px-3 py-2 rounded-lg hover:bg-white/90 transition w-full justify-center"
                      >
                        Get Quote <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 bg-white/10 rounded-xl">
                    <p className="text-white/80">No recommendations found. Try different answers.</p>
                    <button 
                      onClick={resetQuiz}
                      className="mt-3 text-sm bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ✅ DEFAULT EXPORT - THIS IS CRITICAL
export default AIRecommender;