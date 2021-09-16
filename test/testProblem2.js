const lipsumFilePath = '../data/lipsum.txt';
const lipsumProblem = require('../problem2.js');

lipsumProblem(lipsumFilePath, (error, data) => {
  if (error) {
    console.log(error);
  }
});
