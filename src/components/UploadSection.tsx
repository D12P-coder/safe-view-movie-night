
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Link as LinkIcon, ArrowRight } from 'lucide-react';

const UploadSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setIsUploading(true);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload Complete",
            description: "Your video has been uploaded successfully",
          });
        }
      }, 200);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (videoUrl) {
      toast({
        title: "Video URL Added",
        description: "Your video URL has been successfully submitted",
      });
      setVideoUrl('');
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-safe-blue-900">Upload Your Content</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your own videos or provide streaming links to filter content
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Upload className="h-5 w-5 text-safe-blue-600" />
                Upload Video File
              </CardTitle>
              <CardDescription>
                Upload video files from your device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <Input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Label
                    htmlFor="video-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <div className="p-3 rounded-full bg-blue-50">
                      <Upload className="h-6 w-6 text-safe-blue-600" />
                    </div>
                    <span className="font-medium text-safe-blue-800">Choose a video file</span>
                    <span className="text-sm text-gray-500">or drag and drop here</span>
                  </Label>
                  
                  {isUploading && (
                    <div className="mt-4 space-y-2">
                      <div className="h-2 rounded bg-gray-200 overflow-hidden">
                        <div 
                          className="h-full bg-safe-blue-600 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">Uploading: {uploadProgress}%</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Supported formats: MP4, MOV, AVI, WMV. Max size: 500MB.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-safe-blue-600" />
                Add Video URL
              </CardTitle>
              <CardDescription>
                Add links to online videos or streams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="video-url">Video URL</Label>
                  <Input
                    id="video-url"
                    placeholder="https://example.com/video"
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full bg-safe-blue-600 hover:bg-safe-blue-700">
                  Add URL
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-gray-500">
                  Compatible with YouTube, Vimeo, and direct video links.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
