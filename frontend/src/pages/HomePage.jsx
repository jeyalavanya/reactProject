import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import VideoCard from '../components/VideoCard';
import Sidebar from '../components/Sidebar';
import { videos, filters } from '../data/videos';
import api from '../api/client';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [videoList, setVideoList] = useState(videos);
  const [loadingVideos, setLoadingVideos] = useState(true);

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

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/videos');
        if (Array.isArray(response.data) && response.data.length) {
          setVideoList(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch videos. Falling back to sample data.', error);
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchVideos();
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
    let result = videoList;

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
  }, [selectedCategory, searchTerm, videoList]);

  const dynamicFilters = useMemo(() => {
    const categories = videoList
      .map((video) => video.category)
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index);
    const combined = ['All', ...categories];
    return combined.length >= 6 ? combined : filters;
  }, [videoList]);

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
            filters={dynamicFilters} 
            activeFilter={selectedCategory} 
            setActiveFilter={setSelectedCategory} 
          />
          <div className="video-grid">
            {loadingVideos ? (
              <div className="no-results">
                <p>Loading videos...</p>
              </div>
            ) : filteredVideos.length > 0 ? (
              filteredVideos.map(video => (
                <VideoCard key={video._id || video.id} video={video} onVideoClick={handleCloseSidebar} />
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
