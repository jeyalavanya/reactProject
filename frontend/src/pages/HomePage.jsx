import React, { useState } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import VideoCard from '../components/VideoCard';
import Sidebar from '../components/Sidebar';
import { videos, filters } from '../data/videos';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="home-page">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="content-layout">
        <Sidebar isOpen={sidebarOpen} />
        <div className="main-content">
          <FilterBar filters={filters} activeFilter={selectedCategory} setActiveFilter={setSelectedCategory} />
          <div className="video-grid">
            {filteredVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
