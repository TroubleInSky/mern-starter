import PropTypes from 'prop-types';
import React from 'react';
import styles from './CommentItem.css';


export default function CommentItem({ author, text, update, remove }) {
  return (
    <div className={styles['comment']}>
      <div className={styles['actions']}>
        <a className={styles['action-update']} onClick={update}>Update</a>
        <a className={styles['action-remove']} onClick={remove}>Remove</a>
      </div>
      <div className={styles['author']}>{author}</div>
      <div className={styles['text']}>{text}</div>
    </div>
  );
}

CommentItem.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
