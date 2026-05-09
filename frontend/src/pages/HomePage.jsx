import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import VideoCard from '../components/VideoCard';
import Sidebar from '../components/Sidebar';
import { videos, filters } from '../data/videos';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true); // Always open on desktop
      } else {
        setSidebarOpen(false); // Hidden on mobile
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

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
        onToggleSidebar={handleToggleSidebar}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
      />
      <div className="content-layout">
        <Sidebar isOpen={sidebarOpen} />
        {isMobile && sidebarOpen && <div className="sidebar-overlay" onClick={handleCloseSidebar}></div>}
        <div className="main-content" onClick={handleCloseSidebar}>
          <FilterBar 
            filters={filters} 
            activeFilter={selectedCategory} 
            setActiveFilter={setSelectedCategory} 
          />
          <div className="video-grid">
            {filteredVideos.length > 0 ? (
              filteredVideos.map(video => (
                <VideoCard key={video.id} video={video} onVideoClick={handleCloseSidebar} />
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
