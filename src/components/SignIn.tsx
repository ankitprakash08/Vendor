import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Chrome, Flower2, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SignInProps {
  onSwitchToSignUp: () => void;
  onForgotPassword: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSwitchToSignUp, onForgotPassword }) => {
  const { signIn, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const success = await signIn(formData.email, formData.password);
    setIsLoading(false);

    if (!success) {
      setErrors({ password: 'Invalid email or password' });
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      setErrors({ email: 'Google sign-in failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputClasses = `w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg placeholder-gray-400`;

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
                Welcome Back
              </h1>
              <p className="text-orange-700 text-lg font-medium">Sign in to your sacred marketplace</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-orange-600 text-sm">Namaste, Divine Vendor</span>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full mb-6 bg-white/90 backdrop-blur-sm border-2 border-orange-200 text-orange-800 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:border-orange-300 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70"
            >
              <Chrome className="w-6 h-6 text-orange-600" />
              Continue with Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-orange-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 font-bold rounded-full border border-orange-200">
                  Or continue with sacred email
                </span>
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-orange-800 ml-1 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                    placeholder="Enter your sacred password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-orange-600 hover:text-orange-800 font-bold text-sm transition-colors duration-200 hover:underline"
                >
                  Forgot Password?
                </button>
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
                    <span className="text-lg">🕉️</span>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-orange-700 font-medium">
                New to our sacred marketplace?{' '}
                <button
                  onClick={onSwitchToSignUp}
                  className="text-orange-600 hover:text-orange-800 font-bold transition-colors duration-200 hover:underline"
                >
                  Join Our Divine Community
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;