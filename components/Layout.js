import styled from 'styled-components'
import { useState, useRef } from 'react'

export default function Layout({ children }) {
  const [started, setStarted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const startSite = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {});
    }
    setStarted(true);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
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

      <SnowContainer>
        {[...Array(40)].map((_, i) => (
          <SnowFlake key={i} style={{ 
            left: `${Math.random() * 100}%`, 
            animationDuration: `${Math.random() * 5 + 7}s`,
            animationDelay: `${Math.random() * 10}s`,
            width: `${Math.random() * 3 + 4}px`, 
            height: `${Math.random() * 3 + 4}px`,
            opacity: Math.random() * 0.4 + 0.3
          }} />
        ))}
      </SnowContainer>

      {/* Sağ Yuxarı Səs İdarəsi */}
      {started && (
        <VolumeWrapper>
          <VolumeIcon viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </VolumeIcon>
          <VolumeSlider 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={handleVolumeChange} 
          />
        </VolumeWrapper>
      )}

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

const VolumeWrapper = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 10px;
  background:
