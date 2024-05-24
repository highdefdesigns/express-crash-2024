import express from 'express';
const router = express.Router();

let posts = [
  { id: 1, title: 'post one' },
  { id: 2, title: 'post two' },
  { id: 3, title: 'post three' },
];

// get all posts
router.get('/', (req, res, next) => {
  const limit = parseInt(req.query.limit);
  //   get a limit on how many posts shown
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// get specific posts
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
});

// Create new post
router.post('/', (req, res, next) => {
  const data = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!data.title) {
    const error = new Error('Please include a title');
    error.status = 400;
    return next(error);
  }
  posts.push(data);

  res.status(201).json(posts);
});

// PUT
router.put('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);
});

// DELETE a post
router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});

export default router;
