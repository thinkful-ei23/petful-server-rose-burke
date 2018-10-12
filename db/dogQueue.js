'use strict';
const Queue = require('./QueueClass');
const dogsJSON = require('./dogs.json');

function makeDogs() {
  const dogs = new Queue();
  for (let i = 0; i < dogsJSON.length; i++) {
    dogs.enqueue(dogsJSON[i]);
  }
  return dogs;
}

module.exports = makeDogs();