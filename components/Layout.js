import styled from 'styled-components'
import { useState, useRef } from 'react'

export default function Layout({ children }) {
  const [started, setStarted] = useState(false);
  const audioRef = useRef(null);

  const startSite = () => {
    audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    setStarted(true);
  };

  return (
    <Main>
      {/* Sayta giriş örtüyü */}
      {!started && (
        <Overlay onClick={startSite}>
          <EnterText>CLICK TO ENTER</EnterText>
        </Overlay>
      )}

      {/* Video Fonu */}
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, filter: 'brightness(0.4)' }}>
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Musiqi */}
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
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  cursor: pointer;
  backdrop-filter: blur(10px);
`;

const EnterText = styled.h1`
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  letter-spacing: 5px;
  animation: blink 2s infinite;

  @keyframes blink {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  transition: opacity 1s ease;
`;
