import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import api from '../api/client';

export default function ChannelPage() {
  const { user, setUser } = useAuth();
  const { channelId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editFields, setEditFields] = useState({
    title: '',
    category: '',
    thumbnailUrl: '',
    videoUrl: '',
    description: ''
  });
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'General',
    thumbnailUrl: '',
    videoUrl: '',
    description: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchChannel = async () => {
      setLoading(true);
      setError('');
      try {
        const endpoint = channelId === 'me' ? '/channels/me' : `/channels/${channelId}`;
        const response = await api.get(endpoint);
        setChannel(response.data);
      } catch (err) {
        if (channelId === 'me' && err.response?.status === 404) {
          setChannel(null);
        } else {
          setError(err.response?.data?.message || 'Unable to load channel');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [user, channelId, navigate]);

  const channelCreated = Boolean(channel?._id);
  const isOwner = channel ? channel.owner === user?._id : channelId === 'me';

  const visibleVideos = useMemo(() => {
    if (!channel?.videos) {
      return [];
    }
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return channel.videos;
    }
    return channel.videos.filter((video) => video.title.toLowerCase().includes(term));
  }, [channel, searchTerm]);

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    if (!channelName.trim()) return;

    try {
      const response = await api.post('/channels', {
        channelName: channelName.trim(),
        description: channelDescription.trim()
      });
      setChannel(response.data);
      setUser({ ...user, channelId: response.data._id });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create channel');
    }
  };

  const handleVerifyEdit = (video) => {
    setEditingId(video._id);
    setEditFields({
      title: video.title,
      category: video.category,
      thumbnailUrl: video.thumbnailUrl,
      videoUrl: video.videoUrl,
      description: video.description || ''
    });
  };

  const refreshOwnChannel = async () => {
    const response = await api.get('/channels/me');
    setChannel(response.data);
  };

  const handleSaveEdit = async (videoId) => {
    try {
      await api.put(`/videos/${videoId}`, editFields);
      await refreshOwnChannel();
      setEditingId('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update video');
    }
  };

  const handleCancelEdit = () => {
    setEditingId('');
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('Delete this video from your channel?')) {
      return;
    }

    try {
      await api.delete(`/videos/${videoId}`);
      await refreshOwnChannel();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete video');
    }
  };

  const handleUploadVideo = async (e) => {
    e.preventDefault();
    if (!channel?._id) return;

    try {
      await api.post('/videos', { ...uploadForm, channelId: channel._id });
      await refreshOwnChannel();
      setUploadForm({
        title: '',
        category: 'General',
        thumbnailUrl: '',
        videoUrl: '',
        description: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload video');
    }
  };

  const channelAvatar = (channel?.channelName || user?.username || 'U').charAt(0).toUpperCase();
  const channelHandle = `@${user?.username?.replace(/\s+/g, '').toLowerCase()}`;

  if (loading) {
    return <main className="channel-page"><p>Loading channel...</p></main>;
  }

  return (
    <main className="channel-page">
      <Header onToggleSidebar={() => {}} onSearch={setSearchTerm} searchTerm={searchTerm} />
      {error && <p className="error-text">{error}</p>}
      <section className="channel-banner">
        <div className="channel-banner-inner">
          <div className="channel-banner-avatar">{channelAvatar}</div>
          <div className="channel-banner-info">
            <h1>{channelCreated ? channel.channelName : `${user?.username}'s Channel`}</h1>
            <p className="channel-handle">{channelHandle}</p>
            <p className="channel-description">
              {channelCreated
                ? channel.description || 'Welcome to my channel!'
                : 'Create your channel to share videos and manage content.'}
            </p>
            <button className="subscribe-button">Subscribe</button>
          </div>
        </div>
      </section>

      {!channelCreated ? (
        <section className="channel-create-card">
          <h2>Create Your Channel</h2>
          <p>Only signed-in users can create a channel.</p>
          <form className="channel-create-form" onSubmit={handleCreateChannel}>
            <label htmlFor="channelName">Channel name</label>
            <input
              id="channelName"
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Enter channel name"
              required
            />

            <label htmlFor="channelDescription">Channel description</label>
            <textarea
              id="channelDescription"
              value={channelDescription}
              onChange={(e) => setChannelDescription(e.target.value)}
              placeholder="Write a short channel description"
              rows="3"
            />

            <button type="submit" className="channel-action-button">
              Create Channel
            </button>
          </form>
        </section>
      ) : (
        <section className="channel-manage">
          {isOwner && (
            <form className="channel-create-form channel-upload-form" onSubmit={handleUploadVideo}>
              <h2>Upload Video</h2>
              <input
                placeholder="Video title"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                required
              />
              <input
                placeholder="Category"
                value={uploadForm.category}
                onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
              />
              <input
                placeholder="Thumbnail URL"
                value={uploadForm.thumbnailUrl}
                onChange={(e) => setUploadForm({ ...uploadForm, thumbnailUrl: e.target.value })}
              />
              <input
                placeholder="Video URL (embed URL)"
                value={uploadForm.videoUrl}
                onChange={(e) => setUploadForm({ ...uploadForm, videoUrl: e.target.value })}
              />
              <textarea
                placeholder="Description"
                rows="3"
                value={uploadForm.description}
                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
              />
              <button type="submit" className="channel-action-button">Upload</button>
            </form>
          )}

          <div className="channel-videos-section">
            <div className="channel-videos-header">
              <div>
                <h2>{visibleVideos.length} Videos</h2>
                <p>Videos uploaded to your channel.</p>
              </div>
            </div>

            {visibleVideos.length === 0 ? (
              <div className="channel-no-videos">
                <p>No videos found for this channel.</p>
                <p>Upload videos to display them here.</p>
              </div>
            ) : (
              <div className="channel-videos">
                {visibleVideos.map((video) => (
                  <article key={video._id} className="channel-video-card">
                    <img src={video.thumbnailUrl} alt={video.title} />

                    <div>
                      {editingId === video._id ? (
                        <form
                          className="video-edit-form"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveEdit(video._id);
                          }}
                        >
                          <label>Title</label>
                          <input
                            value={editFields.title}
                            onChange={(e) => setEditFields({ ...editFields, title: e.target.value })}
                          />
                          <label>Category</label>
                          <input
                            value={editFields.category}
                            onChange={(e) => setEditFields({ ...editFields, category: e.target.value })}
                          />
                          <label>Thumbnail URL</label>
                          <input
                            value={editFields.thumbnailUrl}
                            onChange={(e) => setEditFields({ ...editFields, thumbnailUrl: e.target.value })}
                          />
                          <label>Video URL</label>
                          <input
                            value={editFields.videoUrl}
                            onChange={(e) => setEditFields({ ...editFields, videoUrl: e.target.value })}
                          />
                          <label>Description</label>
                          <textarea
                            rows="3"
                            value={editFields.description}
                            onChange={(e) => setEditFields({ ...editFields, description: e.target.value })}
                          />
                          <div className="channel-video-actions">
                            <button type="button" className="secondary-button" onClick={handleCancelEdit}>
                              Cancel
                            </button>
                            <button type="submit" className="channel-action-button">
                              Save
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div className="channel-video-meta">
                            <h3>{video.title}</h3>
                            <p>{video.category}</p>
                            <span>{(video.views || 0).toLocaleString()} views</span>
                          </div>
                          {isOwner && (
                            <div className="channel-video-actions">
                              <button type="button" onClick={() => handleVerifyEdit(video)}>
                                Edit
                              </button>
                              <button type="button" className="delete-button" onClick={() => handleDeleteVideo(video._id)}>
                                Delete
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
