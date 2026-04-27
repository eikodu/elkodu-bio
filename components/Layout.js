import styled from 'styled-components'
import { useState, useRef } from 'react'

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
      {/* Video Fonu */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'brightness(0.4)'
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Musiqi Faylı */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Musiqi Düyməsi (Ekranın sağ aşağı küncü) */}
      <MusicControl onClick={toggleMusic}>
        {isPlaying ? 'PAUSE ⏸' : 'PLAY 🔊'}
      </MusicControl>

      <ContentWrapper>
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

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const MusicControl = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  transition: 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
