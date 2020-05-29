import Comment from '../models/comment';
import Post from '../models/post';
import sanitizeHtml from 'sanitize-html';

export function addComment(req, res) {
  if (!req.body.comment.author || !req.body.comment.text || !req.body.comment.post) {
    res.status(403).end();
  }

  Post.findOne({ _id: req.body.comment.post }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    const newComment = new Comment(req.body.comment);

    newComment.author = sanitizeHtml(newComment.author);
    newComment.text = sanitizeHtml(newComment.text);

    newComment.save((errC, saved) => {
      if (errC) {
        res.status(500).send(errC);
      }

      post.comments.addToSet(saved);
      post.save();
      res.json({ comment: saved });
    });
  });
}

export function editComment(req, res) {
  if (!req.body.comment.author || !req.body.comment.text || !req.body.comment.id) {
    res.status(403).end();
  }
  Comment.findOne({ _id: req.body.comment.id }).exec((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    const comment = data;
    comment.author = sanitizeHtml(req.body.comment.author);
    comment.text = sanitizeHtml(req.body.comment.text);

    comment.save((errC, saved) => {
      if (errC) {
        res.status(500).send(errC);
      }
      res.json({ comment: saved });
    });
  });
}

export function deleteComment(req, res) {
  Comment.findOne({ _id: req.params.id }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }
    Post.findOne({ _id: comment.post }).exec((errP, data) => {
      if (errP) {
        res.status(500).send(errP);
      }
      const post = data;
      post.comments = post.comments.filter(cm => cm !== comment._id);

      post.save();
      comment.remove(() => {
        res.status(200).end();
      });
    });
  });
}
