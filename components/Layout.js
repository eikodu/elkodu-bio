import { useState, useRef, useEffect } from 'react'

export default function Layout({ children }) {
  const [started, setStarted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
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
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: '#000', overflow: 'hidden' }}>
      
      {/* Giriş Örtüyü */}
      {!started && (
        <div onClick={startSite} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, cursor: 'pointer', backdropFilter: 'blur(15px)' }}>
          <h1 style={{ color: 'white', fontFamily: 'sans-serif', fontSize: '14px', letterSpacing: '8px', fontWeight: '300', opacity: 0.8 }}>CLICK TO ENTER</h1>
        </div>
      )}

      {/* Video Fonu */}
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, filter: 'brightness(0.3)' }}>
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Qar Effekti */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        {[...Array(30)].map((_, i) => (
          <div key={i} className="snowflake" style={{ 
            position: 'absolute', top: '-10px', left: `${Math.random() * 100}%`, 
            width: '4px', height: '4px', background: 'white', borderRadius: '50%',
            opacity: 0.5, animation: `fall ${Math.random() * 5 + 5}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`
          }} />
        ))}
      </div>

      {/* Səs İdarəsi (Sağ Yuxarı) */}
      {started && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 100, display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div onClick={toggleMute} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
             {isMuted || volume === 0 ? (
               <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
             ) : (
               <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
             )}
          </div>
          <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={handleVolumeChange} style={{ width: '60px', cursor: 'pointer', accentColor: 'white' }} />
        </div>
      )}

      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <div style={{ position: 'relative', zIndex: 2, transition: 'opacity 1s' }}>
        {children}
      </div>

      <style jsx global>{`
        @keyframes fall {
          0% { transform: translateY(-10vh); }
          100% { transform: translateY(110vh); }
        }
      `}</style>
    </div>
  )
}
