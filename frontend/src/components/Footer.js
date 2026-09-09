import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-6 mt-12">
      <div className="container mx-auto px-4">
        <p className="mb-2">🌾 RYTHU SEVA - Agricultural Procurement Management Platform</p>
        <p className="text-sm text-gray-400 mb-4">Plan Your Visit, Skip the Wait</p>
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="hover:text-green-400">About</a>
          <a href="#" className="hover:text-green-400">Help</a>
          <a href="#" className="hover:text-green-400">Contact</a>
          <a href="#" className="hover:text-green-400">Privacy</a>
        </div>
        <p className="text-xs text-gray-500 mt-4">© 2026 RYTHU SEVA. All rights reserved. Built with ❤️ for Indian Farmers</p>
      </div>
    </footer>
  );
};

export default Footer;
