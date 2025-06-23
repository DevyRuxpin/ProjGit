import React, { useState } from 'react';
import './EightBall.css';

function EightBall({ answers }) {
  const [color, setColor] = useState("black");
  const [msg, setMsg] = useState("Think of a Question");

  const handleClick = () => {
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    setColor(randomAnswer.color);
    setMsg(randomAnswer.msg);
  };

  return (
    <div 
      className="EightBall" 
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      <p className="EightBall-msg">{msg}</p>
    </div>
  );
}

export default EightBall; 