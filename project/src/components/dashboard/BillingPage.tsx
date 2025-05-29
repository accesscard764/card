import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Calendar, X } from 'lucide-react';

interface PlanOption {
  id: string;
  name: string;
  price: { monthly: number; annual: number };
  features: string[];
  popular?: boolean;
}

const BillingPage: React.FC = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanOption | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const plans: PlanOption[] = [
    {
      id: 'pro',
      name: 'Pro',
      price: { monthly: 99, annual: 79 },
      features: [
        'Unlimited customers',
        'Advanced analytics',
        'Custom branding',
        'Priority support',
        'API access'
      ],
      popular: true
    },
    {
      id: 'business',
      name: 'Business',
      price: { monthly: 199, annual: 159 },
      features: [
        'Everything in Pro',
        'Multiple locations',
        'Team management',
        'Custom integrations',
        'Dedicated account manager'
      ]
    }
  ];

  const handleUpgrade = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowUpgradeModal(false);
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-600 mt-2">Manage your subscription and billing details</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Calendar className="h-6 w-6 text-blue-500" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-blue-900">Trial Period</h2>
            <p className="text-blue-700 mt-1">
              Your trial ends in 10 days. Upgrade now to ensure uninterrupted service.
            </p>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Choose Your Plan</h2>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Billing Toggle */}
              <div className="flex justify-center items-center gap-4 mb-8">
                <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                  className={`relative w-14 h-7 transition-colors duration-200 ease-in-out rounded-full ${
                    billingCycle === 'annual' ? 'bg-[#1E2A78]' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                      billingCycle === 'annual' ? 'transform translate-x-7' : ''
                    }`}
                  />
                </button>
                <span className={`text-sm ${billingCycle === 'annual' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  Annual (20% off)
                </span>
              </div>

              {/* Plans */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      selectedPlan?.id === plan.id
                        ? 'border-[#1E2A78] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-[#1E2A78] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popular
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900">
                        ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                      </span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {selectedPlan && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2A78] focus:border-transparent"
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2A78] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2A78] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showSuccess ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600">Your account has been upgraded successfully.</p>
                </div>
              ) : (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleUpgrade}
                    disabled={!selectedPlan || isProcessing}
                    className={`px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 ${
                      selectedPlan && !isProcessing
                        ? 'bg-[#1E2A78] hover:bg-[#161F5C]'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {isProcessing ? 'Processing...' : 'Upgrade Now'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;