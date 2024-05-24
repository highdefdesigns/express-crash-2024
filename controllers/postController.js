let posts = [
  { id: 1, title: 'post one' },
  { id: 2, title: 'post two' },
  { id: 3, title: 'post three' },
];

/**
 *
 * @desc Get All Posts
 * @route GET api/posts
 */
export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);
  //   get a limit on how many posts shown
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

/**
 *
 * @desc Get Single Posts
 * @route GET api/posts/:id
 */
export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
};

/**
 *
 * @desc Create New Posts
 * @route POST api/posts
 */
export const createPost = (req, res, next) => {
  const data = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!data.title) {
    const error = new Error('Please include a title');
    error.status = 400;
    return next(error);
  }
  // when you create a post you can get duplicate ids if id: 2 is deleted and you have 3 posts. If you create another post you will havwe 2 ids with the id of 3
  posts.push(data);
  res.status(201).json(posts);
};

/**
 *
 * @desc Update Single Post
 * @route PUT api/posts/:id
 */
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);
};

/**
 *
 * @desc Delete Single Post
 * @route DELETE api/posts/:id
 */
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
};
