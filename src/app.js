import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';
// import bodyParser from 'body-parser';

import { router } from './config/routes';

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/knowt',
  { useNewUrlParser: true }
);
const app = express();
const PORT = 3000;

// enablling middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(logger('dev'));
app.use('/api', router);
// global error handeling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.message = 'Invaild route';
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
