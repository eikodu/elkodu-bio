import styled, { keyframes, css } from 'styled-components'
import { useState, useRef } from 'react'

// 1. Animasiyanın tə tərifi
const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

export default function Layout({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
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

      {/* active={isPlaying} əlavə olundu ki, animasiya yalnız mahnı oxuyanda işləsin */}
      <MusicControl onClick={toggleMusic} active={isPlaying}>
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
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
  bottom: 25px;
  right: 25px;
  z-index: 10;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  /* Animasiya bura tətbiq olunur */
  ${props => props.active && css`
    animation: ${pulse} 2s infinite;
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  `}

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.3);
  }
`;
