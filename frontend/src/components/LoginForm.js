import React from 'react';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [mobile, setMobile] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      onSubmit(mobile);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-6">
        <span className="text-5xl">🌾</span>
        <h2 className="text-2xl font-bold text-[#166534] mt-4">Farmer Login</h2>
        <p className="text-gray-600 text-sm mt-2">Enter your mobile number to continue</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter 10-digit mobile"
            maxLength="10"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#166534]"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">We'll send an OTP to verify your number</p>
        </div>

        <button
          type="submit"
          disabled={loading || mobile.length !== 10}
          className="w-full bg-[#166534] text-white py-2 rounded-lg font-semibold hover:bg-[#0d4620] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </form>

      <p className="text-xs text-gray-600 text-center mt-6">
        Secure login with OTP verification
      </p>
    </div>
  );
};

export default LoginForm;
