import React from 'react';

const Dashboard = ({ farmer }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Welcome Card */}
        <div className="md:col-span-2 bg-gradient-to-r from-[#166534] to-[#0F766E] text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome, {farmer.name}!</h2>
              <p className="text-green-100">Plan your agricultural procurement visit today</p>
            </div>
            <span className="text-6xl">🌾</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#166534]">
          <div className="text-right">
            <p className="text-gray-600 text-sm">Mobile</p>
            <p className="text-2xl font-bold text-[#166534]">{farmer.mobile}</p>
            <p className="text-xs text-gray-500 mt-2">Account verified</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-[#172033] mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <button className="bg-[#166534] text-white p-4 rounded-lg hover:bg-[#0d4620] transition text-center">
            <span className="text-2xl block mb-2">➕</span>
            Add Crop
          </button>
          <button className="bg-[#0F766E] text-white p-4 rounded-lg hover:bg-[#0d5a5e] transition text-center">
            <span className="text-2xl block mb-2">📅</span>
            Book Slot
          </button>
          <button className="bg-[#0284C7] text-white p-4 rounded-lg hover:bg-[#0369a1] transition text-center">
            <span className="text-2xl block mb-2">🎫</span>
            My Token
          </button>
          <button className="bg-[#F59E0B] text-white p-4 rounded-lg hover:bg-[#d97706] transition text-center">
            <span className="text-2xl block mb-2">📊</span>
            Status
          </button>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-[#172033] mb-4">Recent Bookings</h3>
        <div className="text-center text-gray-500 py-8">
          <p>No bookings yet</p>
          <p className="text-sm mt-2">Start by adding a crop and booking a slot</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
