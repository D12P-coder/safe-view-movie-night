
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Play, Pause, Volume2, Volume1, VolumeX, Maximize, SkipForward, SkipBack, Shield, MicOff } from 'lucide-react';

interface VideoPlayerProps {
  videoSrc?: string;
  demoMode?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, demoMode = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const originalVolumeRef = useRef<number>(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isBlurring, setIsBlurring] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const { toast } = useToast();
  
  // For demo purposes, we'll simulate content detection at these timestamps
  const sensitiveContentTimestamps = demoMode ? [5, 15, 25] : [];
  
  // For demo purposes, we'll simulate vulgar language detection at these timestamps
  const vulgarLanguageTimestamps = demoMode ? [8, 18, 28] : [];
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Demo: For demonstration purposes only, simulate content detection
      if (demoMode) {
        // Check for visual content to blur
        const needsBlurring = sensitiveContentTimestamps.some(
          timestamp => Math.abs(video.currentTime - timestamp) < 3
        );
        
        if (needsBlurring && !isBlurring) {
          setIsBlurring(true);
          toast({
            title: "Content Filtered",
            description: "Sensitive content detected and blurred automatically",
            variant: "default",
          });
        } else if (!needsBlurring && isBlurring) {
          setIsBlurring(false);
        }
        
        // Check for audio content to mute
        const needsAudioMuting = vulgarLanguageTimestamps.some(
          timestamp => Math.abs(video.currentTime - timestamp) < 2
        );
        
        if (needsAudioMuting && !isAudioMuted) {
          setIsAudioMuted(true);
          originalVolumeRef.current = video.volume;
          video.volume = 0;
          toast({
            title: "Audio Filtered",
            description: "Inappropriate language detected and muted automatically",
            variant: "default",
          });
        } else if (!needsAudioMuting && isAudioMuted) {
          setIsAudioMuted(false);
          video.volume = originalVolumeRef.current;
        }
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [demoMode, isBlurring, isAudioMuted, toast]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const value = newVolume[0];
    setVolume(value);
    if (videoRef.current && !isAudioMuted) {
      videoRef.current.volume = value;
      setIsMuted(value === 0);
    }
    originalVolumeRef.current = value;
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuteState = !isMuted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  };

  const handleSeek = (newTime: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime[0];
      setCurrentTime(newTime[0]);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleFullScreen = () => {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-xl"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video 
        ref={videoRef}
        className="w-full h-full object-contain"
        src={videoSrc || "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
        onClick={togglePlay}
      />
      
      {/* Blurring overlay */}
      {isBlurring && (
        <div className="absolute inset-0 blur-overlay z-10 flex items-center justify-center backdrop-blur-xl">
          <div className="bg-white/80 px-4 py-2 rounded-full shadow-lg">
            <p className="text-safe-blue-800 font-medium flex items-center gap-2">
              <Shield className="h-5 w-5 text-safe-blue-600" /> 
              Content filtered for family viewing
            </p>
          </div>
        </div>
      )}
      
      {/* Audio muting indicator */}
      {isAudioMuted && !isBlurring && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-white/80 px-4 py-2 rounded-full shadow-lg">
            <p className="text-safe-blue-800 font-medium flex items-center gap-2">
              <MicOff className="h-5 w-5 text-safe-blue-600" /> 
              Audio filtered
            </p>
          </div>
        </div>
      )}

      {/* Video controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col gap-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={() => skip(-10)}>
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={() => skip(10)}>
                <SkipForward className="h-5 w-5" />
              </Button>
              
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={toggleMute}>
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : volume < 0.5 ? (
                  <Volume1 className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              
              <div className="w-24 hidden sm:block">
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
              
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={handleFullScreen}>
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Play overlay (shown when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button 
            size="icon"
            className="h-16 w-16 rounded-full bg-safe-blue-600/90 hover:bg-safe-blue-700 text-white"
            onClick={togglePlay}
          >
            <Play className="h-8 w-8" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
