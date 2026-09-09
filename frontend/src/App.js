import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import OTPForm from './components/OTPForm';
import Dashboard from './components/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function AppContent() {
  const { user, sendOTP, verifyOTP, registerFarmer, loading, error } = useAuth();
  const [step, setStep] = useState('login'); // login, otp, register, dashboard
  const [mobile, setMobile] = useState('');

  const handleSendOTP = async (mobileNumber) => {
    const success = await sendOTP(mobileNumber);
    if (success) {
      setMobile(mobileNumber);
      setStep('otp');
    }
  };

  const handleVerifyOTP = async (otp) => {
    const result = await verifyOTP(mobile, otp);
    if (result) {
      if (result.isNewFarmer) {
        setStep('register');
      } else {
        setStep('dashboard');
      }
    }
  };

  if (user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50">
          <Dashboard farmer={user} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        {step === 'login' && (
          <LoginForm onSubmit={handleSendOTP} loading={loading} error={error} />
        )}
        {step === 'otp' && (
          <OTPForm
            mobile={mobile}
            onSubmit={handleVerifyOTP}
            loading={loading}
            error={error}
            onBack={() => setStep('login')}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
