
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
      <div className="container px-4 md:px-6 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
        <div className="flex flex-col gap-4 lg:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-safe-blue-900 tracking-tight">
            Family-friendly viewing made simple
          </h1>
          <p className="text-xl text-gray-600 max-w-[600px]">
            Automatically detect and blur sensitive content in movies and shows. 
            Enjoy entertainment together without the worry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="bg-safe-blue-600 hover:bg-safe-blue-700 text-white">
              Try It Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              How It Works
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full bg-safe-blue-200 flex items-center justify-center">
                <Shield className="h-5 w-5 text-safe-blue-700" />
              </div>
              <div className="w-10 h-10 rounded-full bg-safe-blue-300 flex items-center justify-center">
                <Eye className="h-5 w-5 text-safe-blue-800" />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Trusted by <span className="font-medium">2,000+</span> families
            </p>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="relative rounded-2xl overflow-hidden shadow-soft animate-float bg-white p-2">
            <div className="aspect-video rounded-xl overflow-hidden relative bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=3387&auto=format&fit=crop" 
                alt="Family watching TV together" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center cursor-pointer">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-14 border-l-safe-blue-600 border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/40">
              <div className="flex items-center gap-2">
                <div className="bg-safe-blue-600 text-white text-xs font-medium px-2 py-1 rounded">SAFE</div>
                <p className="text-sm font-medium">Content safely filtered for family viewing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
