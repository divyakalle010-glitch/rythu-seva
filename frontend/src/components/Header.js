import React from 'react';

const Header = ({ title = 'RYTHU SEVA' }) => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#166534] to-[#0F766E] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🌾</span>
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-xs text-green-100">Plan Your Visit, Skip the Wait</p>
            </div>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold">Agricultural Procurement Platform</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
