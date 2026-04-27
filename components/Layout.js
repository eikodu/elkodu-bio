import styled from 'styled-components'
import { useState, useRef, useEffect } from 'react'

export default function Layout({ children }) {
  const [started, setStarted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const audioRef = useRef(null);

  // Siçanın hərəkətini izləyirik
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30, // 30 sürüşmə dərəcəsidir
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const startSite = () => {
    audioRef.current.play().catch(() => {});
    setStarted(true);
  };

  return (
    <Main>
      {!started && (
        <Overlay onClick={startSite}>
          <EnterText>CLICK TO ENTER</EnterText>
        </Overlay>
      )}

      {/* Video Fonu */}
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, filter: 'brightness(0.3)' }}>
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* İnteraktiv Qar Təbəqəsi */}
      <SnowLayer style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}>
        {[...Array(50)].map((_, i) => (
          <SnowFlake key={i} style={{ 
            left: `${Math.random() * 100}%`, 
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`
          }} />
        ))}
      </SnowLayer>

      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <ContentWrapper style={{ opacity: started ? 1 : 0 }}>
        {children}
      </ContentWrapper>
    </Main>
  )
}

const Main = styled.main`
  min-height: 100vh;
  position: relative;
  background: #000;
  overflow: hidden;
`;

const SnowLayer = styled.div`
  position: fixed;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  pointer-events: none;
  z-index: 1;
  transition: transform 0.2s ease-out;
`;

const SnowFlake = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
  filter: blur(1px);
  animation: fall linear infinite;

  @keyframes fall {
    0% { transform: translateY(-10vh); }
    100% { transform: translateY(110vh); }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  cursor: pointer;
  backdrop-filter: blur(10px);
`;

const EnterText = styled.h1`
  color: white;
  font-family: sans-serif;
  font-size: 14px;
  letter-spacing: 5px;
  animation: blink 2s infinite;
  @keyframes blink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  transition: opacity 1s ease;
`;
