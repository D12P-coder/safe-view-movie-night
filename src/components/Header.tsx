
import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-safe-blue-600" />
          <h1 className="text-2xl font-bold text-safe-blue-800">SafeView</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-gray-600 hover:text-safe-blue-700 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-safe-blue-700 transition-colors">How It Works</a>
          <a href="#about" className="text-gray-600 hover:text-safe-blue-700 transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Sign In
          </Button>
          <Button size="sm" className="bg-safe-blue-600 hover:bg-safe-blue-700">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
