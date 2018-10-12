'use strict';
const Queue = require('./QueueClass');
const catsJSON = require('./cats.json');

function makeCats() {
  const cats = new Queue();
  for (let i = 0; i < catsJSON.length; i++) {
    cats.enqueue(catsJSON[i]);
  }
  return cats;
}

module.exports = makeCats();