import Comment from '../models/comment';

export function addComment(req, res) {
  Comment.findAll().exec((err, comments) => {
    res.json(comments);
  });
}
export function editComment(req, res) {
  res.json([true]);
}
export function deleteComment(req, res) {
  res.json([true]);
}
