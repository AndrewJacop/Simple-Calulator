import React, { useState } from 'react';

const emojis = ['🎈', '🎉', '✨', '💥', '💣', '💫', '💦', '💨', '🦄', '🌈', '🍕', '🍦'];

function EmojiBubble({ onPop }) {
  const [popped, setPopped] = useState(false);
  const [position] = useState({
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10
  });
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const size = Math.random() * 30 + 20;
  const duration = Math.random() * 15 + 10;
  const opacity = Math.random() * 0.5 + 0.3;

  const handleClick = () => {
    setPopped(true);
    onPop(emoji);
  };

  if (popped) return null;

  return (
    <div 
      className="emoji-bubble"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        fontSize: `${size}px`,
        animationDuration: `${duration}s`,
        opacity: opacity
      }}
      onClick={handleClick}
    >
      {emoji}
    </div>
  );
}

export default EmojiBubble;
