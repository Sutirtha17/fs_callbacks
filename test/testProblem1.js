const createAndDeleteFiles = require('../problem1');

createAndDeleteFiles((error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});
