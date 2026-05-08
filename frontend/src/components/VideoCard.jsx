export default function VideoCard({ video }) {
  return (
    <article className="video-card">
      <img src={video.thumbnailUrl} alt={video.title} className="video-thumbnail" />
      <div className="video-info">
        <h3>{video.title}</h3>
        <p>{video.channelName}</p>
        <span>{video.views.toLocaleString()} views</span>
      </div>
    </article>
  );
}
