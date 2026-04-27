/* Layout.js - Standart CSS ilə */
export default function Layout({ children }) {
  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>
      <header style={{ position: 'fixed', top: 20, right: 20, zIndex: 100 }}>
        {/* Səs ikonu bura gələcək */}
      </header>
      <main>{children}</main>
    </div>
  )
}
