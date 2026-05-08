import React, { useState } from 'react';

const CommentItem = ({ comment, currentUserId, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [isSaving, setIsSaving] = useState(false);

  const isOwner = comment.userId === currentUserId;

  const handleSaveEdit = async () => {
    if (!editText.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      await onUpdate(comment._id, editText);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving edit:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(comment.text);
    setIsEditing(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">{comment.username}</span>
        <span className="comment-date">{formatDate(comment.createdAt)}</span>
      </div>

      {isEditing ? (
        <div className="comment-edit">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="comment-edit-input"
          />
          <div className="comment-edit-actions">
            <button
              onClick={handleSaveEdit}
              className="save-btn"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancelEdit}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="comment-text">{comment.text}</p>
          {isOwner && (
            <div className="comment-actions">
              <button
                onClick={() => setIsEditing(true)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(comment._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentItem;
