import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();


router.route('/comments').post(CommentController.addComment);
router.route('/comments/:comment_id').put(CommentController.editComment);
router.route('/posts/:comment_id').delete(CommentController.deleteComment);

export default router;
