import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';

type AuthView = 'signin' | 'signup' | 'forgot-password';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('signin');

  if (isAuthenticated) {
    return <Dashboard />;
  }

  switch (authView) {
    case 'signup':
      return <SignUp onSwitchToSignIn={() => setAuthView('signin')} />;
    case 'forgot-password':
      return <ForgotPassword onBackToSignIn={() => setAuthView('signin')} />;
    case 'signin':
    default:
      return (
        <SignIn
          onSwitchToSignUp={() => setAuthView('signup')}
          onForgotPassword={() => setAuthView('forgot-password')}
        />
      );
  }
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <AppContent />
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;