import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();


router.route('/comments').post(CommentController.addComment);
router.route('/comments').put(CommentController.editComment);
router.route('/comments/:id').delete(CommentController.deleteComment);

export default router;
