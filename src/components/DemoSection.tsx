
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import VideoPlayer from './VideoPlayer';
import { Shield, Info } from 'lucide-react';

const DemoSection = () => {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();
  
  const startDemo = () => {
    setIsActive(true);
    toast({
      title: "Demo Mode Activated",
      description: "Watch as sensitive content is automatically detected and blurred",
      duration: 5000,
    });
  };

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-safe-blue-900">See It In Action</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Experience how our technology automatically detects and filters sensitive content
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-safe-blue-800">SafeView Demo</h3>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${isActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                {isActive ? 'Demo Active' : 'Demo Ready'}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <VideoPlayer demoMode={true} />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-safe-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                <span className="font-medium">Demo instructions:</span> Press play and watch as the video plays. At certain timestamps (around 5s, 15s, and 25s), the system will automatically detect and blur simulated sensitive content.
              </p>
            </div>
            {!isActive && (
              <Button onClick={startDemo} className="bg-safe-blue-600 hover:bg-safe-blue-700 shrink-0">
                <Shield className="mr-2 h-4 w-4" />
                Start Demo
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
