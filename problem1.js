/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fsPromises = require('fs').promises;

const createAndDeleteFiles = () => {
  return new Promise((resolve, reject) => {
    createDirectory()
      .then(() => {
        return createAndDelete();
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createDirectory = () => {
  return fsPromises.mkdir('./newDirectory', { recursive: true });
};

const deleteFiles = (fileName) => {
  return fsPromises.unlink(fileName).then(() => {
    console.log(fileName.split('/')[2] + ' is deleted.');
  });
};
const createAndDelete = () => {
  for (let i = 0; i < 500 + Math.floor(Math.random() * 500); i++) {
    const fileName = './newDirectory/random' + i + '.json';
    fsPromises.writeFile(fileName, '').then(() => {
      console.log(fileName.split('/')[2] + ' is created.');
      deleteFiles(fileName);
    });
  }
};

module.exports = createAndDeleteFiles;
