
import React from 'react';
import { Eye, Shield, Video, Zap, Upload, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: <Eye className="h-6 w-6 text-safe-blue-600" />,
      title: 'Smart Content Detection',
      description: 'Advanced AI detects sensitive content in real-time as videos play'
    },
    {
      icon: <Shield className="h-6 w-6 text-safe-blue-600" />,
      title: 'Automatic Blurring',
      description: 'Seamlessly blur inappropriate content while maintaining viewing experience'
    },
    {
      icon: <Video className="h-6 w-6 text-safe-blue-600" />,
      title: 'Works with Any Video',
      description: 'Compatible with movies, shows, or any uploaded video content'
    },
    {
      icon: <Zap className="h-6 w-6 text-safe-blue-600" />,
      title: 'Real-Time Processing',
      description: 'No delays or buffering, content is processed as you watch'
    },
    {
      icon: <Upload className="h-6 w-6 text-safe-blue-600" />,
      title: 'Easy Uploads',
      description: 'Simply upload your videos or provide streaming links'
    },
    {
      icon: <Users className="h-6 w-6 text-safe-blue-600" />,
      title: 'Family Profiles',
      description: 'Create profiles with different sensitivity levels for each family member'
    }
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-safe-blue-900">Powerful Features</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our intelligent content filtering system helps families enjoy entertainment without worry
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-safe-blue-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
