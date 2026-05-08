import { useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FilterBar from './components/FilterBar';
import VideoCard from './components/VideoCard';
import { filters, videos } from './data/videos';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredVideos = useMemo(() => {
    if (activeFilter === 'All') return videos;
    return videos.filter((video) => video.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="app-shell">
      <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div className="content-layout">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="main-content">
          <FilterBar filters={filters} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <section className="video-grid">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
