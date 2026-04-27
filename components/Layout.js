{/* Qar Effekti - Bunu Layout-un ən üstünə, digər elementlərin altına qoy */}
<div style={{ 
  position: 'fixed', 
  top: 0, 
  left: 0, 
  width: '100%', 
  height: '100%', 
  pointerEvents: 'none', 
  zIndex: 1 
}}>
  {[...Array(30)].map((_, i) => (
    <div key={i} className="snowflake" style={{ 
      position: 'absolute', 
      top: '-10px', 
      left: `${Math.random() * 100}%`, 
      width: '4px', 
      height: '4px', 
      background: 'white', 
      borderRadius: '50%',
      opacity: 0.6, 
      animation: `fall ${Math.random() * 5 + 5}s linear infinite`,
      animationDelay: `${Math.random() * 10}s`
    }} />
  ))}
</div>

{/* Animasiyanı aktiv etmək üçün bu style blokunu da əlavə et */}
<style jsx global>{`
  @keyframes fall {
    0% { transform: translateY(-10vh); }
    100% { transform: translateY(110vh); }
  }
`}</style>
