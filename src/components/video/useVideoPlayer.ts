
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseVideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  demoMode?: boolean;
}

export const useVideoPlayer = ({ videoRef, demoMode = true }: UseVideoPlayerProps) => {
  const originalVolumeRef = useRef<number>(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isBlurring, setIsBlurring] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
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
  }, [demoMode, isBlurring, isAudioMuted, toast, videoRef]);

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

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isBlurring,
    isAudioMuted,
    showControls,
    setShowControls,
    togglePlay,
    handleVolumeChange,
    toggleMute,
    handleSeek,
    skip,
  };
};
