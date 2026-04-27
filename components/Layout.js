import styled from 'styled-components'
import { useState, useRef, useEffect } from 'react'

export default function Layout({ children }) {
  const [started, setStarted] = useState(false);
  const [offset, setOffset] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Siçanın mərkəzdən nə qədər uzaq olduğunu hesablayırıq
      // Rəqəmi (150) artırsan, qar daha çox sağa-sola meyl edər
      const xMove = (e.clientX / window.innerWidth - 0.5) * 150;
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

      {/* Qar təbəqəsi */}
      <SnowContainer style={{ '--moveX': `${offset}px` }}>
        {[...Array(40)].map((_, i) => (
          <SnowFlake key={i} style={{ 
            left: `${Math.random() * 100}%`, 
            animationDuration: `${Math.random() * 3 + 4}s`,
            animationDelay: `${Math.random() * 5}s`,
            // Qar dənəciklərinin ölçüsünü bura tənzimlədim (6px - 10px arası)
            width: `${Math.random() * 4 + 6}px`, 
            height: `${Math.random() * 4 + 6}px`,
            opacity: Math.random() * 0.4 + 0.4
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
  top: -20px;
  background: white;
  border-radius: 50%;
  // Daha yaxşı görünməsi üçün ağ parıltı əlavə etdim
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  filter: blur(1px);
  animation: fall linear infinite;

  @keyframes fall {
    0% {
      transform: translateY(-10vh) translateX(0);
    }
    100% {
      /* var(--moveX) kursorun istiqamətinə görə qarı sürüşdürür */
      transform: translateY(110vh) translateX(var(--moveX));
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
  backdrop-filter: blur(15px);
`;

const EnterText = styled.h1`
  color: white;
  font-family: sans-serif;
  font-size: 14px;
  letter-spacing: 8px;
  font-weight: 300;
  animation: blink 2s infinite;
  @keyframes blink { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  transition: opacity 1.5s ease;
`;
