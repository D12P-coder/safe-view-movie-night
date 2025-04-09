
import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="about" className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-safe-blue-600" />
              <h2 className="text-xl font-bold text-safe-blue-800">SafeView</h2>
            </div>
            <p className="text-gray-600">
              Empowering families to enjoy entertainment together without worry. Our advanced content filtering technology ensures a safe viewing experience for everyone.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-safe-blue-800 mb-4">Features</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-600 hover:text-safe-blue-700 transition-colors">Content Detection</a></li>
              <li><a href="#features" className="text-gray-600 hover:text-safe-blue-700 transition-colors">Automatic Blurring</a></li>
              <li><a href="#features" className="text-gray-600 hover:text-safe-blue-700 transition-colors">Family Profiles</a></li>
              <li><a href="#features" className="text-gray-600 hover:text-safe-blue-700 transition-colors">Video Compatibility</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-safe-blue-800 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-gray-600 hover:text-safe-blue-700 transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-safe-blue-700 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-safe-blue-700 transition-colors">Support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-safe-blue-700 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-safe-blue-800 mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-safe-blue-700 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-safe-blue-700 transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-safe-blue-700 transition-colors">Facebook</a></li>
              <li><a href="#" className="text-gray-600 hover:text-safe-blue-700 transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} SafeView. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-safe-blue-700 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-safe-blue-700 transition-colors text-sm">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-safe-blue-700 transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
