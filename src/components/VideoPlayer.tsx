
import React, { useRef } from 'react';
import ContentFilter from './video/ContentFilter';
import AudioFilter from './video/AudioFilter';
import VideoControls from './video/VideoControls';
import { useVideoPlayer } from './video/useVideoPlayer';

interface VideoPlayerProps {
  videoSrc?: string;
  demoMode?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, demoMode = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
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
  } = useVideoPlayer({ videoRef, demoMode });

  const handleFullScreen = () => {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
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
      
      <ContentFilter isActive={isBlurring} />
      <AudioFilter isActive={isAudioMuted && !isBlurring} />

      <VideoControls 
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        showControls={showControls}
        onPlayPause={togglePlay}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onToggleMute={toggleMute}
        onSkip={skip}
        onFullScreen={handleFullScreen}
      />
    </div>
  );
};

export default VideoPlayer;
