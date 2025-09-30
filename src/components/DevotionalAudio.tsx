import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface DevotionalAudioProps {
  audioSrc: string;
  title?: string;
}

const DevotionalAudio: React.FC<DevotionalAudioProps> = ({
  audioSrc,
  title = 'Shree Raghavendra Swami Jap',
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Wait for first user click to start playback
    const handleInteraction = () => {
      audio.play().catch(() => console.log('User interaction required'));
      setIsPlaying(true);
      document.removeEventListener('click', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => console.log('User interaction required'));
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-temple-earth/95 p-4 rounded-lg shadow-lg border border-temple-gold/30 max-w-xs">
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-temple-gold truncate pr-2">
          {title}
        </h4>
        <div className="flex items-center space-x-1">
          <Button onClick={togglePlay}>
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button onClick={toggleMute}>
            {isMuted ? <VolumeX /> : <Volume2 />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DevotionalAudio;
