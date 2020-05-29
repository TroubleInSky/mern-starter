import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './CommentCreateWidget.css';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { addCommentRequest, editCommentRequest } from '../../CommentActions';
import { getShowAddPost } from '../../../App/AppReducer';
import { getPost, getPosts } from '../../../Post/PostReducer';
import { getPostComments } from '../../CommentReducer';
import { commentType } from '../../types';


class CommentCreateWidget extends Component {

  state = {
    errors: []
  };

  showError(name) {
    return this.state.errors.findIndex(error => error === name ) > -1;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({errors: []})
    const errors = [];
    const {author, text} = this.refs;
    if ( author.value.length < 3 ) errors.push('author');
    if ( text.value.length < 3 ) errors.push('text');
    console.log(errors);
    if (errors.length) this.setState({errors});
    else {
      console.log(author.value, text.value);
      const comment = {
        author: author.value,
        text:text.value,
        post: this.props.id,
        id: this.props.edit,
      };

      this.props.edit ?
        this.props.dispatch(editCommentRequest(comment)) :
        this.props.dispatch(addCommentRequest(comment));
    }

  };



  componentDidUpdate( prevProps, prevState, snapshot ) {
    if (prevProps.edit !== this.props.edit) {
      const {author, text} = this.refs;
      if (this.props.edit) {
        const comment = this.props.comments.find(comment => comment._id === this.props.edit);
        console.log(comment);
        author.value = comment.author;
        text.value = comment.text;
      } else {
        author.value = '';
        text.value = '';
      }
    }


  }

  render() {
    return (
      <div className={styles['form-content']}>

        <h2 className={styles['form-title']} onClick={this.props.removeEditing}><FormattedMessage id={this.props.edit ? "editComment" : "addComment"}  /></h2>
        <form onSubmit={this.handleSubmit}>
          <input className={styles['form-field']} type="text" placeholder={this.props.intl.messages.yourName} ref={'author'} />
          {this.showError('author') ? (<p className={styles['form-error']}><FormattedMessage id="authorError" /></p>) : null}
          <textarea className={styles['form-field']} cols="30" placeholder={this.props.intl.messages.yourText} rows="3" ref={'text'} />
          {this.showError('text') ? (<p className={styles['form-error']}><FormattedMessage id="textError" /></p>) : null}
          <button className={styles['comment-submit-button']} type={'submit'}><FormattedMessage id="submit" /></button>
        </form>
      </div>
    );
  }

}

CommentCreateWidget.propTypes = {
  intl: intlShape.isRequired,
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  removeEditing: PropTypes.func.isRequired,
  edit: PropTypes.string,
  comments: PropTypes.arrayOf(commentType).isRequired,
};
function mapStateToProps(state, props) {
  return {
    comments: getPostComments(state, {_id:props.id}),
  };
}

export default injectIntl(connect(mapStateToProps)(CommentCreateWidget));
