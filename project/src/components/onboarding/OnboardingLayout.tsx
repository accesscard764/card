import React, { ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import LoadingTransition from './LoadingTransition';

const OnboardingLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const steps = [
    { path: '/get-started', label: 'Business Info' },
    { path: '/get-started/setup', label: 'Setup Preference' },
    { path: '/get-started/finalize', label: 'Final Setup' }
  ];

  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/setup/rewards');
      }, 2000);
    } else {
      navigate(steps[currentStepIndex + 1].path);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(steps[currentStepIndex - 1].path);
    }
  };

  if (isLoading) {
    return <LoadingTransition />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentStepIndex + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content area */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transition-all duration-300">
          <Outlet />
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              currentStepIndex === 0
                ? 'opacity-0 cursor-default'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            disabled={currentStepIndex === 0}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <button
            onClick={handleNext}
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isLastStep
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLastStep ? 'Complete Setup' : 'Next'}
            {!isLastStep && <ArrowRight className="w-5 h-5 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;