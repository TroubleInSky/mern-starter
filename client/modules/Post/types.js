import PropTypes from 'prop-types';

export const postType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  cuid: PropTypes.string.isRequired,
});
