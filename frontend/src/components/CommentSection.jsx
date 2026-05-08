import React, { useState, useEffect } from 'react';
import CommentItem from './CommentItem';
import client from '../api/client';

const CommentSection = ({ videoId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const response = await client.get(`/comments/${videoId}`);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert('Please enter a comment');
      return;
    }

    setLoading(true);
    try {
      const response = await client.post('/comments', {
        videoId,
        text: newComment
      });

      setComments([response.data.comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert(error.response?.data?.message || 'Error adding comment');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      await client.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert(error.response?.data?.message || 'Error deleting comment');
    }
  };

  const handleUpdateComment = async (commentId, newText) => {
    try {
      const response = await client.put(`/comments/${commentId}`, {
        text: newText
      });

      setComments(comments.map(c =>
        c._id === commentId ? response.data.comment : c
      ));
    } catch (error) {
      console.error('Error updating comment:', error);
      alert(error.response?.data?.message || 'Error updating comment');
    }
  };

  return (
    <div className="comment-section">
      <h2>Comments ({comments.length})</h2>

      <form onSubmit={handleAddComment} className="comment-form">
        <textarea
          className="comment-input"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="3"
        />
        <button
          type="submit"
          className="comment-submit"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem
              key={comment._id}
              comment={comment}
              currentUserId={user._id}
              onDelete={handleDeleteComment}
              onUpdate={handleUpdateComment}
            />
          ))
        ) : (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
