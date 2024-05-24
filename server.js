import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import colors from 'colors';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
const port = process.env.PORT || 8000;

// Get the directory name workaround with type: module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Body parser middleware
// allows us to POST data
// takes care of raw json
app.use(express.json());
// takes care of form data (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));
app.use(logger);
// setup static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/posts', posts);

// error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is running on port ${port}`.cyan.bold.underline)
);
