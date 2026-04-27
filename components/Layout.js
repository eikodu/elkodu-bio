import styled from 'styled-components'
import { useState, useRef } from 'react'

export default function Layout({ children }) {
  const [started, setStarted] = useState(false);
  const audioRef = useRef(null);

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

      {/* Sadə Qar Təbəqəsi - Kursor hərəkətindən asılı deyil */}
      <SnowContainer>
        {[...Array(45)].map((_, i) => (
          <SnowFlake key={i} style={{ 
            left: `${Math.random() * 100}%`, 
            animationDuration: `${Math.random() * 5 + 7}s`, // Daha yavaş və dinc yağma
            animationDelay: `${Math.random() * 10}s`,
            width: `${Math.random() * 4 + 5}px`, 
            height: `${Math.random() * 4 + 5}px`,
            opacity: Math.random() * 0.4 + 0.3
          }} />
        ))}
      </SnowContainer>

      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <ContentWrapper style={{ opacity: started ? 1 : 0 }}>
        {/* Sosial Media Banneri */}
        <SocialBanner>
          <a href="https://discord.com" target="_blank" rel="noreferrer">Discord</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://spotify.com" target="_blank" rel="noreferrer">Spotify</a>
        </SocialBanner>

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

const SocialBanner = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  padding: 12px 25px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 50px; /* Daha oval görünüş üçün */
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    transition: 0.3s ease;
    &:hover {
      color: #fff;
      transform: translateY(-2px);
    }
  }
`;

const SnowContainer = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;
`;

const SnowFlake = styled.div`
  position: absolute;
  top: -20px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  filter: blur(1px);
  animation: fall linear infinite;

  @keyframes fall {
    0% { transform: translateY(-10vh); }
    100% { transform: translateY(110vh); }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); display: flex; align-items: center; justify-content: center; z-index: 100; cursor: pointer; backdrop-filter: blur(15px);
`;

const EnterText = styled.h1`
  color: white; font-family: sans-serif; font-size: 14px; letter-spacing: 8px; font-weight: 300; animation: blink 2s infinite;
  @keyframes blink { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  transition: opacity 1.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
