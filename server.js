import express from 'express';
import path from 'path';
import posts from './routes/posts.js';
const port = process.env.PORT || 8000;

const app = express();

// Body parser middleware
// allows us to POST data
// takes care of raw json
app.use(express.json());
// takes care of form data (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));

// setup static folder
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server is running on port ${port}`));
