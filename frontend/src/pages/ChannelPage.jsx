import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { videos } from '../data/videos';

export default function ChannelPage() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState(user?.channelName || '');
  const [channelDescription, setChannelDescription] = useState(user?.channelDescription || '');
  const [ownedVideos, setOwnedVideos] = useState(() =>
    user?.channelName ? videos.filter((video) => video.channelName === user.channelName) : []
  );
  const [editingId, setEditingId] = useState(null);
  const [editFields, setEditFields] = useState({ title: '', category: '', thumbnailUrl: '' });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (user.channelName) {
      setChannelName(user.channelName);
      setChannelDescription(user.channelDescription || '');
      setOwnedVideos(videos.filter((video) => video.channelName === user.channelName));
    }
  }, [user, navigate]);

  const channelCreated = Boolean(user?.channelName);

  const handleCreateChannel = (e) => {
    e.preventDefault();
    if (!channelName.trim()) {
      return;
    }

    const updatedUser = {
      ...user,
      channelName: channelName.trim(),
      channelDescription: channelDescription.trim() || 'Welcome to my channel!'
    };

    setUser(updatedUser);
  };

  const handleVerifyEdit = (video) => {
    setEditingId(video.id);
    setEditFields({
      title: video.title,
      category: video.category,
      thumbnailUrl: video.thumbnailUrl
    });
  };

  const handleSaveEdit = (videoId) => {
    setOwnedVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, ...editFields } : video
      )
    );
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDeleteVideo = (videoId) => {
    if (!window.confirm('Delete this video from your channel?')) {
      return;
    }
    setOwnedVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
  };

  const channelAvatar = user?.username?.charAt(0).toUpperCase() || 'U';
  const channelHandle = `@${user?.username?.replace(/\s+/g, '').toLowerCase()}`;

  return (
    <main className="channel-page">
      <section className="channel-banner">
        <div className="channel-banner-inner">
          <div className="channel-banner-avatar">{channelAvatar}</div>
          <div className="channel-banner-info">
            <h1>{channelCreated ? channelName : `${user?.username}'s Channel`}</h1>
            <p className="channel-handle">{channelHandle}</p>
            <p className="channel-description">
              {channelCreated
                ? channelDescription || 'Welcome to my channel!'
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
          <div className="channel-videos-section">
            <div className="channel-videos-header">
              <div>
                <h2>{ownedVideos.length} Videos</h2>
                <p>Videos uploaded to your channel.</p>
              </div>
            </div>

            {ownedVideos.length === 0 ? (
              <div className="channel-no-videos">
                <p>No videos found for this channel.</p>
                <p>You can still edit or delete videos once they are added to your channel.</p>
              </div>
            ) : (
              <div className="channel-videos">
                {ownedVideos.map((video) => (
                  <article key={video.id} className="channel-video-card">
                    <img src={video.thumbnailUrl} alt={video.title} />

                    <div>
                      {editingId === video.id ? (
                        <form
                          className="video-edit-form"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveEdit(video.id);
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
                            <span>{video.views.toLocaleString()} views</span>
                          </div>
                          <div className="channel-video-actions">
                            <button type="button" onClick={() => handleVerifyEdit(video)}>
                              Edit
                            </button>
                            <button type="button" className="delete-button" onClick={() => handleDeleteVideo(video.id)}>
                              Delete
                            </button>
                          </div>
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
