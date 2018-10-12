'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

// const cats = require('./db/cats.json');
// const dogs = require('./db/dogs.json');

const catQueue = require('./db/catQueue');
const dogQueue = require('./db/dogQueue');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/api/cat', (req, res, next) => {
  const firstCat = catQueue.peek();
  console.log(firstCat);
  res.send(firstCat);
});

app.delete('/api/cat', (req, res, next) => {
  catQueue.dequeue();
  res.status(204).end();
  console.log(catQueue.peek());
  // res.send(cats.shift());
});

app.get('/api/dog', (req, res, next) => {
  const firstDog = dogQueue.peek();
  console.log(firstDog);
  res.send(firstDog); 
});

app.delete('/api/dog', (req, res, next) => {
  dogQueue.dequeue();
  res.status(204).end();
  // res.send(dogs.shift());
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  // dbConnect();
  runServer();
}

module.exports = { app };
