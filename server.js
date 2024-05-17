const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

// setup static folder
// app.use(express.static(path.join(__dirname, 'public')));

let posts = [
  { id: 1, title: 'post one' },
  { id: 2, title: 'post two' },
  { id: 3, title: 'post three' },
];

// get all posts
app.get('/api/posts', (req, res) => {
  const limit = parseInt(req.query.limit);

  //   get a limit on how many posts shown
  if (!isNaN(limit) && limit > 0) {
    res.status(200).res.json(posts.slice(0, limit));
  } else {
    res.status(200).res.json(posts);
  }
});

// get specific posts
app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  res.status(200).res.json(posts.filter((post) => post.id === id));
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
