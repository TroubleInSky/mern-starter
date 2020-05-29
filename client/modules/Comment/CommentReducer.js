
// Initial State
import { ADD_COMMENT, ADD_COMMENTS, ADD_COMMENTS_WITH_FILTER, DELETE_COMMENT, EDIT_COMMENT } from './CommentActions';

const initialState = { data: [] };

const CommentReducer = (state = initialState, action) => {
  const { data } = state;
  switch (action.type) {
    case ADD_COMMENT :
      return {
        data: [action.comment, ...state.data],
      };
    case ADD_COMMENTS :
      return {
        data: action.comments,
      };

    case ADD_COMMENTS_WITH_FILTER :


      for (const comment of action.comments) {
        const index = data.findIndex(c => c._id === comment._id);
        if (index > -1) data[index] = comment;
        else data.push(comment);
      }
      return { data };

    case EDIT_COMMENT : {
      const i = state.data.findIndex(comment => comment._id === action.comment._id);

      if (i) {
        state.data[i] = action.comment;
      } else {
        state.data.push(action.comment);
      }
      return {
        data: state.data,
      };
    }
    case DELETE_COMMENT :
      return {
        data: state.data.filter(comment => comment._id !== action.id),
      };

    default:
      return state;
  }
};
export const getPostComments = (state, post) => state.comments.data.filter(comment => post._id === comment.post);

export default CommentReducer;
