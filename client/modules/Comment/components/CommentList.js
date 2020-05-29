
import React from 'react';
import CommentItem from './CommentItem/CommentItem';
import PropTypes from 'prop-types';
import { commentType } from '../types';


export default function CommentsList({ comments, update, remove }) {
  return (
    <div>
      <h2>Comments</h2>
    {comments.map((comment, i) => (
      <CommentItem
        key={i}
        author={comment.author}
        text={comment.text}
        update={() => { update(comment._id); }}
        remove={() => { remove(comment._id); }}
      />
    ))}
    </div>
  );
}
CommentsList.propTypes = {
  comments: PropTypes.arrayOf(commentType).isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
