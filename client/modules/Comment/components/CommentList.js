
import React from 'react';
import CommentItem from './CommentItem/CommentItem';
import PropTypes from 'prop-types';
import { commentType } from '../types';


export default function CommentsList({ comments }) {
  return (
    <div>
    {comments.map(comment => (
      <CommentItem
        author={comment.author}
        text={comment.text}
      />
    ))}
    </div>
  );
}
CommentsList.propTypes = {
  comments: PropTypes.arrayOf(commentType).isRequired,
};
