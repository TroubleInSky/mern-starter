import PropTypes from 'prop-types';

export const commentType = PropTypes.shape({
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
});
