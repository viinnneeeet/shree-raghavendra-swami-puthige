import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface DevotionalAudioProps {
  audioSrc?: string;
  title?: string;
  autoPlay?: boolean;
}

const DevotionalAudio: React.FC<DevotionalAudioProps> = ({
  audioSrc,
  title = "Shree Raghavendra Swami Jap",
  autoPlay = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3); // Lower volume for background audio
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = volume;
    
    // Auto play if enabled and audio source exists
    if (autoPlay && audioSrc) {
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Auto-play blocked by browser:', error);
        }
      };
      playAudio();
    }

    // Event listeners
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioSrc, autoPlay, volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch (error) {
      console.error('Error controlling audio:', error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    const audio = audioRef.current;
    if (audio && !isMuted) {
      audio.volume = newVolume;
    }
  };

  if (!audioSrc) {
    return null; // Don't render if no audio source
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-temple-earth/95 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg border border-temple-gold/30 max-w-xs">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
      />
      
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-temple-gold truncate pr-2">
          {title}
        </h4>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            className="h-8 w-8 p-0 text-temple-gold hover:text-temple-sunset hover:bg-temple-gold/10"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="h-8 w-8 p-0 text-temple-gold hover:text-temple-sunset hover:bg-temple-gold/10"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <VolumeX className="h-3 w-3 text-temple-gold/60" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-1 bg-temple-gold/20 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, hsl(var(--temple-gold)) 0%, hsl(var(--temple-gold)) ${volume * 100}%, hsl(var(--temple-gold) / 0.2) ${volume * 100}%, hsl(var(--temple-gold) / 0.2) 100%)`
          }}
        />
        <Volume2 className="h-3 w-3 text-temple-gold/60" />
      </div>
      
      <div className="mt-2 text-xs text-temple-gold/70 text-center">
        {isPlaying ? 'Playing...' : 'Paused'}
      </div>
    </div>
  );
};

export default DevotionalAudio;