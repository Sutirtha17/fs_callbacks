const lipsumFilePath = '../data/lipsum.txt';
const lipsumProblem = require('../problem2.js');

lipsumProblem(lipsumFilePath)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });
