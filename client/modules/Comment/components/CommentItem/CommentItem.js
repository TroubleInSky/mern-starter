import PropTypes from 'prop-types';
import React from 'react';


export default function CommentItem({ author, text }) {
  return (
    <div>
      <div>{author}</div>
      <div>{text}</div>
    </div>
  );
}

CommentItem.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
