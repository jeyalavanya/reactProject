import { useNavigate } from 'react-router-dom';

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <article className="video-card" onClick={handleClick}>
      <img src={video.thumbnailUrl} alt={video.title} className="video-thumbnail" />
      <div className="video-info">
        <h3>{video.title}</h3>
        <p>{video.channelName}</p>
        <span>{video.views.toLocaleString()} views</span>
      </div>
    </article>
  );
}
