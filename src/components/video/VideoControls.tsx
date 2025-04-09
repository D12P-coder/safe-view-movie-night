
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, Volume1, VolumeX, Maximize, SkipForward, SkipBack } from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  showControls: boolean;
  onPlayPause: () => void;
  onSeek: (newTime: number[]) => void;
  onVolumeChange: (newVolume: number[]) => void;
  onToggleMute: () => void;
  onSkip: (seconds: number) => void;
  onFullScreen: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  showControls,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onSkip,
  onFullScreen
}) => {
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      {/* Video controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col gap-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={onSeek}
            className="cursor-pointer"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={onPlayPause}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={() => onSkip(-10)}>
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={() => onSkip(10)}>
                <SkipForward className="h-5 w-5" />
              </Button>
              
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={onToggleMute}>
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
                  onValueChange={onVolumeChange}
                  className="cursor-pointer"
                />
              </div>
              
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={onFullScreen}>
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
            onClick={onPlayPause}
          >
            <Play className="h-8 w-8" />
          </Button>
        </div>
      )}
    </>
  );
};

export default VideoControls;
