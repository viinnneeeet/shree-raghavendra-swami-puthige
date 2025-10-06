import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const flowerIcons = [
  '🌸',
  '🌺',
  '🌼',
  '🌹',
  '💐',
  '🌻',
  '🌷',
  '🥀',
  '🪷',
  '🌾',
  '🌿',
  '🍃',
];

export default function FlowerDrop() {
  const [flowers, setFlowers] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // spawn new flowers every 400ms
    const interval = setInterval(() => {
      const isMobile = window.innerWidth <= 768;
      const FlowerIcon =
        flowerIcons[Math.floor(Math.random() * flowerIcons.length)];
      const id = Math.random().toString(36).substr(2, 9);
      const size = isMobile ? 50 + Math.random() * 36 : 24 + Math.random() * 36; // 24px - 60px
      const left = Math.random() * (window.innerWidth - size);
      setFlowers((prev) => [...prev, { id, Icon: FlowerIcon, size, left }]);

      // remove flower after 10s
      setTimeout(() => {
        setFlowers((prev) => prev.filter((f) => f.id !== id));
      }, 10000);
    }, 400);

    // stop spawning new flowers after 5 seconds
    const stopTimeout = setTimeout(() => clearInterval(interval), 20000);

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
      {flowers.map(({ id, Icon, size, left }) => (
        <Flower key={id} Icon={Icon} size={size} left={left} />
      ))}
    </div>
  );
}

function Flower({ Icon, size, left }) {
  const flowerRef = useRef(null);

  useEffect(() => {
    if (flowerRef.current) {
      gsap.fromTo(
        flowerRef.current,
        { y: -50, opacity: 0, rotation: Math.random() * 360 },
        {
          y: window.innerHeight + 50,
          rotation: 360 * (Math.random() > 0.5 ? 1 : -1),
          opacity: 1,
          duration: 7 + Math.random() * 3,
          ease: 'linear',
        }
      );
    }
  }, []);

  return (
    <div
      ref={flowerRef}
      className="absolute text-yellow-400"
      style={{
        fontSize: `${size}px`,
        left: `${left}px`,
      }}>
      {Icon}
    </div>
  );
}
