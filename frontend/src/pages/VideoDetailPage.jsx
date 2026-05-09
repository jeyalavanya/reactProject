import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videos } from '../data/videos';
import CommentSection from '../components/CommentSection';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const VideoDetailPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const foundVideo = videos.find(v => v.id === videoId);
    if (foundVideo) {
      setVideo(foundVideo);
      setLikes(foundVideo.views);
      setDislikes(Math.floor(foundVideo.views * 0.05));
      if (isMobile) {
        setSidebarOpen(false);
      }
    } else {
      navigate('/');
    }
  }, [videoId, navigate, isMobile]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleLike = () => {
    if (!userLiked) {
      setLikes(likes + 1);
      if (userDisliked) {
        setDislikes(dislikes - 1);
        setUserDisliked(false);
      }
      setUserLiked(true);
    } else {
      setLikes(likes - 1);
      setUserLiked(false);
    }
  };

  const handleDislike = () => {
    if (!userDisliked) {
      setDislikes(dislikes + 1);
      if (userLiked) {
        setLikes(likes - 1);
        setUserLiked(false);
      }
      setUserDisliked(true);
    } else {
      setDislikes(dislikes - 1);
      setUserDisliked(false);
    }
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-detail-page app-shell">
      <Header 
        onToggleSidebar={handleToggleSidebar}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
      />

      <div className="content-layout">
        <Sidebar isOpen={sidebarOpen} />
        {isMobile && sidebarOpen && <div className="sidebar-overlay" onClick={handleCloseSidebar}></div>}

        <main className="watch-layout" onClick={handleCloseSidebar}>
          <section className="player-column">
            <div className="player-wrapper">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="video-frame"
              />
              <div className="play-button">▶</div>
            </div>

            <div className="video-meta">
              <h1>{video.title}</h1>
              <div className="video-channel-row">
                <div>
                  <p className="channel-name">{video.channelName}</p>
                  <p className="view-count">{video.views.toLocaleString()} views</p>
                </div>

                <div className="reaction-row">
                  <button
                    className={`secondary-btn ${userLiked ? 'active' : ''}`}
                    onClick={handleLike}
                  >
                    👍 {likes}
                  </button>
                  <button
                    className={`secondary-btn ${userDisliked ? 'active' : ''}`}
                    onClick={handleDislike}
                  >
                    👎 {dislikes}
                  </button>
                </div>
              </div>

              <div className="video-description">
                <h2>Description</h2>
                <p>{video.title} - Learn this topic from scratch!</p>
              </div>
            </div>

            {user && (
              <CommentSection videoId={videoId} user={user} />
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default VideoDetailPage;
