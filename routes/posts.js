import express from 'express';
const router = express.Router();
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
// GET all posts
router.get('/', getPosts);

// get specific posts
router.get('/:id', getPost);

// Create new post
router.post('/', createPost);

// PUT
router.put('/:id', updatePost);

// DELETE a post
router.delete('/:id', deletePost);

export default router;
