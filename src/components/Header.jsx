export default function Header({ onToggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-button" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          ☰
        </button>
        <div className="brand-wrap">
          <span className="brand-logo">▶</span>
          <span className="brand-text">YouTube</span>
        </div>
      </div>
      <div className="header-center">
        <input className="search-input" placeholder="Search" />
      </div>
      <div className="header-right">
        <button className="signin-button">Sign in</button>
      </div>
    </header>
  );
}
