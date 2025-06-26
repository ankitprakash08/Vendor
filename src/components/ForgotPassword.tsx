import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, Flower2, Star } from 'lucide-react';

interface ForgotPasswordProps {
  onBackToSignIn: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToSignIn }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="bg-gradient-to-br from-green-50/95 via-emerald-50/95 to-teal-50/95 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-green-200/50 p-8 md:p-10 text-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-bl-3xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-teal-200/30 to-green-200/30 rounded-tr-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg relative">
                <CheckCircle className="w-12 h-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm">✨</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-green-800 mb-4">Check Your Sacred Inbox</h1>
              <p className="text-green-700 mb-6 leading-relaxed font-medium">
                We've sent divine instructions to reset your password to <span className="font-bold text-green-800">{email}</span>. 
                Please check your inbox and follow the sacred path to restore your access.
              </p>
              
              <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 mb-6">
                <p className="text-orange-800 text-sm font-medium">
                  <strong>🙏 Didn't receive the sacred message?</strong> Check your spam folder or try again in a few moments.
                </p>
              </div>

              <button
                onClick={onBackToSignIn}
                className="w-full bg-gradient-to-r from-orange-500 via-red-600 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:from-orange-600 hover:via-red-700 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-lg">🕉️</span>
                Back to Sacred Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-gradient-to-br from-orange-50/95 via-red-50/95 to-yellow-50/95 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-orange-200/50 p-8 md:p-10 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-tr-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 via-red-600 to-pink-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 relative">
                <Flower2 className="w-12 h-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm">🕉️</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-700 via-red-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Forgot Password?
              </h1>
              <p className="text-orange-700 text-lg font-medium">No worries! We'll help restore your sacred access.</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-orange-600 text-sm">Enter your email for divine assistance</span>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-orange-800 ml-1 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg placeholder-gray-400 ${
                      error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 via-red-600 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:from-orange-600 hover:via-red-700 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send Sacred Reset Link
                    <Mail className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={onBackToSignIn}
                className="text-orange-600 hover:text-orange-800 font-bold transition-colors duration-200 flex items-center justify-center gap-2 mx-auto hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sacred Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;