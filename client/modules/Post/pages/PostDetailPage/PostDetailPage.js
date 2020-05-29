import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';
import CommentCreateWidget from '../../../Comment/components/CommentCreateWidget/CommentCreateWidget';
import CommentList from '../../../Comment/components/CommentList';
import { postType } from '../../types';
import { commentType } from '../../../Comment/types';
import { getPostComments } from '../../../Comment/CommentReducer';

export function PostDetailPage(props) {
  return (
    <div>
      <Helmet title={props.post.title} />
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
        <h3 className={styles['post-title']}>{props.post.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
        <p className={styles['post-desc']}>{props.post.content}</p>
      </div>
      <CommentList comments={props.comments} />
      <CommentCreateWidget cuid={props.post.cuid} />
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  const post = getPost(state, props.params.cuid);
  return {
    post,
    comments: getPostComments(state, post),
  };
}

PostDetailPage.propTypes = {
  post: postType.isRequired,
  comments: PropTypes.arrayOf(commentType).isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
