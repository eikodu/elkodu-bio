import styled, { keyframes, css } from 'styled-components'
import { useState, useRef } from 'react'

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); transform: scale(1); }
  70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); transform: scale(1.05); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); transform: scale(1); }
`;

export default function Layout({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Music play failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Main>
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, filter: 'brightness(0.4)' }}>
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* className istifadə edərək animasiyanı tetikləyirik */}
      <MusicControl onClick={toggleMusic} className={isPlaying ? 'active' : ''}>
        {isPlaying ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
        )}
      </MusicControl>

      <ContentWrapper>{children}</ContentWrapper>
    </Main>
  )
}

const Main = styled.main`
  min-height: 100vh;
  position: relative;
  background: #000;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const MusicControl = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 99;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);

  /* Mahnı oxuyanda tətbiq olunan stillər */
  &.active {
    animation: ${pulse} 2s infinite;
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  svg {
    transition: transform 0.2s ease;
  }
  
  &:active svg {
    transform: scale(0.9);
  }
`;
