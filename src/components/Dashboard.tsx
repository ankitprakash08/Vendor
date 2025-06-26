import React, { useState } from 'react';
import { LogOut, Plus, Package, BarChart3, Settings, Home, Sparkles, Flower2, Star, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ProductListing from './ProductListing';
import ProductList from './ProductList';

const Dashboard: React.FC = () => {
  const { currentVendor, signOut } = useAuth();
  const [activeView, setActiveView] = useState<'overview' | 'products' | 'add-product' | 'analytics'>('overview');

  const navigationItems = [
    { id: 'overview' as const, label: 'Sacred Dashboard', icon: Home },
    { id: 'products' as const, label: 'Divine Products', icon: Package },
    { id: 'add-product' as const, label: 'Add Sacred Item', icon: Plus },
    { id: 'analytics' as const, label: 'Spiritual Insights', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-orange-500 via-red-600 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl">🕉️</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Namaste, {currentVendor?.contactPerson}!</h2>
                    <p className="text-orange-100 text-lg">May your divine offerings bring blessings to all devotees</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  <p className="text-orange-100 text-lg font-medium">Ready to share sacred treasures with the world?</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-orange-50/90 to-red-50/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg border-2 border-orange-200/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-bl-3xl"></div>
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h3 className="text-xl font-bold text-orange-800">Sacred Products</h3>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Flower2 className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-orange-900 mb-2">0</p>
                <p className="text-orange-600 font-medium">Divine offerings listed</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50/90 to-emerald-50/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg border-2 border-green-200/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-bl-3xl"></div>
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h3 className="text-xl font-bold text-green-800">Blessed Revenue</h3>
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-green-900 mb-2">$0</p>
                <p className="text-green-600 font-medium">This sacred month</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50/90 to-pink-50/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg border-2 border-purple-200/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-bl-3xl"></div>
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h3 className="text-xl font-bold text-purple-800">Devotee Orders</h3>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-purple-900 mb-2">0</p>
                <p className="text-purple-600 font-medium">Awaiting fulfillment</p>
              </div>
            </div>

            {/* Spiritual Quote Section */}
            <div className="bg-gradient-to-br from-yellow-50/90 to-orange-50/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg border-2 border-yellow-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-bl-3xl"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🙏</span>
                </div>
                <h3 className="text-2xl font-bold text-orange-800 mb-3">Sacred Wisdom</h3>
                <p className="text-lg text-orange-700 italic font-medium leading-relaxed">
                  "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः"<br/>
                  <span className="text-base text-orange-600 not-italic mt-2 block">
                    May all beings be happy, may all beings be healthy
                  </span>
                </p>
              </div>
            </div>
          </div>
        );
      case 'products':
        return <ProductList />;
      case 'add-product':
        return <ProductListing />;
      case 'analytics':
        return (
          <div className="bg-gradient-to-br from-blue-50/90 to-purple-50/90 backdrop-blur-xl rounded-3xl p-12 shadow-lg border-2 border-blue-200/50 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-bl-3xl"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-blue-800 mb-4">Spiritual Insights Coming Soon</h3>
              <p className="text-blue-600 text-lg leading-relaxed">
                Track your sacred business performance and understand your devotee community better.<br/>
                <span className="text-sm text-blue-500 mt-2 block">Divine analytics to guide your spiritual commerce journey</span>
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500/90 via-red-600/90 to-pink-500/90 backdrop-blur-xl shadow-2xl border-b-2 border-orange-300/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl mr-4 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🕉️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">SacredBazaar</h1>
                <p className="text-orange-100 text-sm">Divine Marketplace for Sacred Items</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-lg font-bold text-white">{currentVendor?.businessName}</p>
                <p className="text-sm text-orange-100">{currentVendor?.email}</p>
              </div>
              <button
                onClick={signOut}
                className="flex items-center space-x-3 px-6 py-3 text-sm font-bold text-orange-800 bg-white/90 backdrop-blur-sm rounded-2xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <nav className="lg:w-80 flex-shrink-0">
            <div className="bg-gradient-to-br from-orange-50/90 to-red-50/90 backdrop-blur-xl rounded-3xl shadow-lg border-2 border-orange-200/50 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-bl-3xl"></div>
              <div className="space-y-3 relative z-10">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveView(item.id)}
                      className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-left transition-all duration-300 font-bold text-lg ${
                        activeView === item.id
                          ? 'bg-gradient-to-r from-orange-500 via-red-600 to-pink-500 text-white shadow-lg transform scale-105'
                          : 'text-orange-800 hover:bg-orange-100 hover:shadow-md transform hover:-translate-y-1'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-700 via-red-600 to-pink-600 bg-clip-text text-transparent capitalize mb-3">
                {activeView === 'add-product' ? 'Add Sacred Item' : 
                 activeView === 'products' ? 'Divine Products' :
                 activeView === 'analytics' ? 'Spiritual Insights' : 'Sacred Dashboard'}
              </h2>
              <p className="text-orange-700 text-lg font-medium">
                {activeView === 'overview' && 'Welcome to your divine marketplace dashboard'}
                {activeView === 'products' && 'Manage your sacred product offerings'}
                {activeView === 'add-product' && 'Share your divine treasures with devotees worldwide'}
                {activeView === 'analytics' && 'Understand your spiritual business performance'}
              </p>
            </div>
            
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;