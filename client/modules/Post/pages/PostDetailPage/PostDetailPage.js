import React, {Component} from 'react';
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
import {
  deleteCommentRequest,
} from '../../../Comment/CommentActions';

class PostDetailPage extends Component {



  constructor(props) {
    super(props);
    this.state = {
      commentEdit: null
    };
    this.commentUpdateHandler = this.commentUpdateHandler.bind(this);
    this.commentRemoveHandler = this.commentRemoveHandler.bind(this);
  }

  handleRemoveEditing = () => {
    console.log(1);
    if (this.state.commentEdit) this.setState({commentEdit: null})
  };

  commentUpdateHandler(_id) {
    this.setState({commentEdit: _id});
  }
  commentRemoveHandler(_id) {
    if (confirm('Do you want to delete this comment')) { // eslint-disable-line
      this.props.dispatch(deleteCommentRequest(_id))
    }

  }
  render() {
    const {props} = this;
    return (
        <div>
          <Helmet title={props.post.title} />
          <div className={`${styles['single-post']} ${styles['post-detail']}`}>
            <h3 className={styles['post-title']}>{props.post.title}</h3>
            <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
            <p className={styles['post-desc']}>{props.post.content}</p>
          </div>
          <CommentList
              comments={props.comments}
              update={this.commentUpdateHandler}
              remove={this.commentRemoveHandler}
          />
          <CommentCreateWidget removeEditing={this.handleRemoveEditing} edit={this.state.commentEdit} id={props.post._id} />
        </div>
    );
  }
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
