import express from 'express';
const router = express.Router();

let posts = [
  { id: 1, title: 'post one' },
  { id: 2, title: 'post two' },
  { id: 3, title: 'post three' },
];

// get all posts
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit);

  //   get a limit on how many posts shown
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// get specific posts
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      message: `A post with the id of ${id} was not found`,
    });
  }
  res.status(200).json(post);
});

export default router;
