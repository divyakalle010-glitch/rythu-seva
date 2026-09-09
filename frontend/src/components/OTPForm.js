import React from 'react';

const OTPForm = ({ mobile, onSubmit, loading, error, onBack }) => {
  const [otp, setOtp] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      onSubmit(otp);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <button
        onClick={onBack}
        className="text-[#166534] text-sm font-medium hover:underline mb-4"
      >
        ← Back
      </button>

      <div className="text-center mb-6">
        <span className="text-5xl">📱</span>
        <h2 className="text-2xl font-bold text-[#166534] mt-4">Verify OTP</h2>
        <p className="text-gray-600 text-sm mt-2">Enter the OTP sent to</p>
        <p className="text-gray-700 font-semibold">+91 {mobile}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">OTP (6 digits)</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            maxLength="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#166534] text-center text-2xl tracking-widest"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="w-full bg-[#166534] text-white py-2 rounded-lg font-semibold hover:bg-[#0d4620] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>

      <p className="text-xs text-gray-600 text-center mt-6">
        Didn't receive OTP? <a href="#" className="text-[#166534] font-semibold hover:underline">Resend</a>
      </p>
    </div>
  );
};

export default OTPForm;
