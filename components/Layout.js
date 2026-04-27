import styled from 'styled-components'
import ReactDOM from 'react-dom';

export default function Layout({ children }) {
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
          filter: 'brightness(0.4)' // Videonu qaraldır ki, yazılar aydın görünsün
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Saytın məzmunu (linklər, Elko yazısı və s.) */}
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Main>
  )
}

const Main = styled.main`
  min-height: 100vh;
  position: relative;
  background: #000; /* Video yüklənənə qədər qara fon görünsün */
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1; /* Yazıların videonun üstündə qalmasını təmin edir */
`;
