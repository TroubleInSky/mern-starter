import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './CommentCreateWidget.css';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';


class CommentCreateWidget extends Component {


  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className={styles['form-content']}>
        <h2 className={styles['form-title']}><FormattedMessage id="addComment" /></h2>
        <form onSubmit={this.handleSubmit}>
          <input className={styles['form-field']} type="text" placeholder={this.props.intl.messages.yourName} ref={'author'} />
          <textarea className={styles['form-field']} cols="30" placeholder={this.props.intl.messages.yourText} rows="3" ref={'text'} />
          <button className={styles['comment-submit-button']} type={'submit'}><FormattedMessage id="submit" /></button>
        </form>
      </div>
    );
  }

}

CommentCreateWidget.propTypes = {
  intl: intlShape.isRequired,

};


export default connect()(injectIntl(CommentCreateWidget));
