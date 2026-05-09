const menuItems = ['Home', 'Shorts', 'Subscriptions', 'Library', 'History', 'Liked videos'];

export default function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? '' : 'sidebar-hidden'}`} onClick={(e) => e.stopPropagation()}>
      {menuItems.map((item) => (
        <button key={item} className="sidebar-item">{item}</button>
      ))}
    </aside>
  );
}
