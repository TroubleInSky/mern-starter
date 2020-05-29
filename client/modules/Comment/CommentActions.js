import callApi from '../../util/apiCaller';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_COMMENTS_WITH_FILTER = 'ADD_COMMENTSWITHFILTER';

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}
export function addComments(comments, filter = false) {
  return {
    type: filter ? ADD_COMMENTS_WITH_FILTER : ADD_COMMENTS,
    comments,
  };
}
export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  };
}
export function addCommentRequest(comment) {
  return (dispatch) => {
    return callApi('comments', 'post', { comment }).then(res => dispatch(addComment(res.comment)));
  };
}
export function editCommentRequest(comment) {
  return (dispatch) => {
    return callApi('comments', 'put', { comment }).then(res => dispatch(editComment(res.comment)));
  };
}
export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id,
  };
}

export function deleteCommentRequest(id) {
  return (dispatch) => {
    return callApi(`comments/${id}`, 'delete').then(() => dispatch(deleteComment(id)));
  };
}
