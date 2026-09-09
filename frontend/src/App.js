import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="bg-[#166534] text-white p-4">
        <div className="flex items-center justify-center">
          <span className="text-4xl mr-3">🌾</span>
          <h1 className="text-2xl font-bold">RYTHU SEVA</h1>
        </div>
        <p className="text-center text-sm mt-2">Plan Your Visit, Skip the Wait</p>
      </header>
      <main className="p-4">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-2xl font-bold text-[#166534] mb-4">Welcome to RYTHU SEVA</h2>
          <p className="text-[#64748b] mb-4">Agricultural Procurement Management Platform</p>
          <p className="text-[#172033]">Development in progress...</p>
        </div>
      </main>
    </div>
  );
}

export default App;
