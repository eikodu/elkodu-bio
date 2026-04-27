import styled from 'styled-components'
import { useState, useRef, useEffect } from 'react'

export default function Layout({ children }) {
  const [started, setStarted] = useState(false);
  const [offset, setOffset] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Siçanın ekranın mərkəzinə görə vəziyyəti (-50 ilə 50 arası)
      const xMove = (e.clientX / window.innerWidth - 0.5) * 100;
      setOffset(xMove);
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

      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, filter: 'brightness(0.3)' }}>
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Qar dənəcikləri - --xOffset dəyişəni ilə hərəkət edir */}
      <SnowContainer style={{ '--xOffset': `${offset}px` }}>
        {[...Array(60)].map((_, i) => (
          <SnowFlake key={i} style={{ 
            left: `${Math.random() * 100}%`, 
            animationDuration: `${Math.random() * 5 + 5}s`, // Daha yavaş yağma
            animationDelay: `${Math.random() * 10}s`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            opacity: Math.random() * 0.5 + 0.3
          }} />
        ))}
      </SnowContainer>

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

const SnowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const SnowFlake = styled.div`
  position: absolute;
  top: -10px;
  background: white;
  border-radius: 50%;
  filter: blur(0.5px);
  animation: fall linear infinite;

  @keyframes fall {
    0% {
      transform: translateY(-10vh) translateX(0);
    }
    100% {
      /* var(--xOffset) vasitəsilə siçanın istiqamətinə meyl edir */
      transform: translateY(110vh) translateX(var(--xOffset));
    }
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
