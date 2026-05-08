import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import VideoCard from '../components/VideoCard';
import Sidebar from '../components/Sidebar';
import { videos, filters } from '../data/videos';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Filter videos by category and search term
  const filteredVideos = useMemo(() => {
    let result = videos;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(video => video.category === selectedCategory);
    }

    // Filter by search term (search in title and channel name)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(video =>
        video.title.toLowerCase().includes(searchLower) ||
        video.channelName.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [selectedCategory, searchTerm]);

  return (
    <div className="home-page">
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
      />
      <div className="content-layout">
        <Sidebar isOpen={sidebarOpen} />
        <div className="main-content">
          <FilterBar 
            filters={filters} 
            activeFilter={selectedCategory} 
            setActiveFilter={setSelectedCategory} 
          />
          <div className="video-grid">
            {filteredVideos.length > 0 ? (
              filteredVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))
            ) : (
              <div className="no-results">
                <p>No videos found matching your search or filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
