import React, { useState } from 'react';
import { User, Mail, Lock, Building, Phone, MapPin, ArrowRight, Eye, EyeOff, Chrome, CheckCircle, XCircle, Flower2, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SignUpProps {
  onSwitchToSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToSignIn }) => {
  const { signUp, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    contactPerson: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordRequirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /[A-Z]/, text: 'One uppercase letter' },
    { regex: /[a-z]/, text: 'One lowercase letter' },
    { regex: /\d/, text: 'One number' },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, text: 'One special character' },
  ];

  const getPasswordStrength = (password: string) => {
    const score = passwordRequirements.reduce((acc, req) => {
      return acc + (req.regex.test(password) ? 1 : 0);
    }, 0);
    
    if (score < 2) return { strength: 'weak', color: 'red', width: '20%' };
    if (score < 4) return { strength: 'medium', color: 'yellow', width: '60%' };
    return { strength: 'strong', color: 'green', width: '100%' };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const failedRequirements = passwordRequirements.filter(req => !req.regex.test(formData.password));
      if (failedRequirements.length > 0) {
        newErrors.password = 'Password does not meet all requirements';
      }
    }
    
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const success = await signUp(formData);
    setIsLoading(false);

    if (!success) {
      setErrors({ email: 'Email already exists' });
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      setErrors({ email: 'Google sign-up failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputClasses = `w-full pl-12 pr-4 py-3 border-2 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400`;

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="bg-gradient-to-br from-orange-50/95 via-red-50/95 to-yellow-50/95 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-orange-200/50 p-8 md:p-12 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-tr-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 via-red-600 to-pink-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 relative">
                <Flower2 className="w-12 h-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm">🕉️</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-700 via-red-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Join SacredBazaar
              </h1>
              <p className="text-orange-700 text-lg font-medium">Create your divine vendor account</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-orange-600 text-sm">Share your sacred treasures with the world</span>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
            </div>

            {/* Google Sign Up Button */}
            <button
              onClick={handleGoogleSignUp}
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
                  Or create sacred account with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-orange-800 ml-1 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Sacred Business Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className={`${inputClasses} ${errors.businessName ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                      placeholder="Divine Treasures Store"
                    />
                  </div>
                  {errors.businessName && <p className="text-red-500 text-sm ml-1">{errors.businessName}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-orange-800 ml-1 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Contact Person
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className={`${inputClasses} ${errors.contactPerson ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                      placeholder="Your Full Name"
                    />
                  </div>
                  {errors.contactPerson && <p className="text-red-500 text-sm ml-1">{errors.contactPerson}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-orange-800 ml-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${inputClasses} ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-orange-800 ml-1 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${inputClasses} ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm ml-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-orange-800 ml-1 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Sacred Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputClasses} pr-12 ${errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                    placeholder="Create a secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-orange-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength.color === 'red' ? 'bg-red-500' :
                            passwordStrength.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: passwordStrength.width }}
                        ></div>
                      </div>
                      <span className={`text-sm font-bold capitalize ${
                        passwordStrength.color === 'red' ? 'text-red-600' :
                        passwordStrength.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {passwordStrength.strength}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-1">
                      {passwordRequirements.map((req, index) => {
                        const isValid = req.regex.test(formData.password);
                        return (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            {isValid ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-400" />
                            )}
                            <span className={isValid ? 'text-green-600 font-medium' : 'text-gray-500'}>
                              {req.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {errors.password && <p className="text-red-500 text-sm ml-1">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-orange-800 ml-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Business Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-orange-400" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none placeholder-gray-400 ${errors.address ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                    placeholder="Enter your complete business address"
                  />
                </div>
                {errors.address && <p className="text-red-500 text-sm ml-1">{errors.address}</p>}
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
                    Create Sacred Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-orange-700 font-medium">
                Already blessed with an account?{' '}
                <button
                  onClick={onSwitchToSignIn}
                  className="text-orange-600 hover:text-orange-800 font-bold transition-colors duration-200 hover:underline"
                >
                  Sign In to Your Sacred Space
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;