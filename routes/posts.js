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

// Create new post
router.post('/', (req, res) => {
  const data = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!data) {
    return res.status(400).json({ message: 'Please include a title' });
  }
  posts.push(data);

  res.status(201).json(posts);
});

// PUT
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(400)
      .json({ message: `A post with the id of ${id} was not found` });
  }

  post.title = req.body.title;
  res.status(200).json(posts);
});

// DELETE a post
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(400)
      .json({ message: `A post with the id of ${id} was not found` });
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});

export default router;
