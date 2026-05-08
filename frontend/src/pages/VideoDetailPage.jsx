import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videos } from '../data/videos';
import CommentSection from '../components/CommentSection';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

const VideoDetailPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Find video from static data
    const foundVideo = videos.find(v => v.id === videoId);
    if (foundVideo) {
      setVideo(foundVideo);
      setLikes(foundVideo.views); // Placeholder for likes
      setDislikes(Math.floor(foundVideo.views * 0.05)); // Placeholder for dislikes
    } else {
      navigate('/');
    }
  }, [videoId, navigate]);

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
    <div className="video-detail-page">
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
      />
      <div className="content-layout">
        <Sidebar isOpen={sidebarOpen} />
        <div className="video-detail-container">
          <div className="video-player-section">
            <div className="video-player">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title}
                className="video-thumbnail-large"
              />
              <div className="play-button">▶</div>
            </div>

            <div className="video-meta">
              <h1 className="video-title">{video.title}</h1>
              
              <div className="video-stats">
                <div className="channel-info">
                  <span className="channel-name">{video.channelName}</span>
                  <span className="view-count">{video.views.toLocaleString()} views</span>
                </div>

                <div className="action-buttons">
                  <button 
                    className={`like-button ${userLiked ? 'active' : ''}`}
                    onClick={handleLike}
                  >
                    👍 {likes}
                  </button>
                  <button 
                    className={`dislike-button ${userDisliked ? 'active' : ''}`}
                    onClick={handleDislike}
                  >
                    👎 {dislikes}
                  </button>
                </div>
              </div>

              <div className="video-description">
                <h3>Description</h3>
                <p>{video.title} - Learn this topic from scratch!</p>
              </div>
            </div>
          </div>

          {user && (
            <CommentSection videoId={videoId} user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;
