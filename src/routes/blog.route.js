import {
    addBlogHandler,
    deleteBlogHandler,
    getAllBlogHandler,
    getMyBlogsHandler,
    updateBlogHandler,
} from '#controllers/blog.controller';
import express from 'express';

const router = express.Router();

router.post('/blog', addBlogHandler);
router.patch('/blog/:blog_id', updateBlogHandler);
router.delete('/blog/:blog_id', deleteBlogHandler);
router.get('/blog/my', getMyBlogsHandler);
router.get('/blog', getAllBlogHandler);

export default router;
