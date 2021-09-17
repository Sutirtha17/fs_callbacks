/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require('fs');

const createAndDeleteFiles = () => {
  return new Promise((resolve, reject) => {
    createDirectory()
      .then(() => {
        createAndDelete()
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createDirectory = () => {
  return new Promise((resolve, reject) => {
    fs.mkdir('./newDirectory', { recursive: true }, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log('directory is created');
      }
    });
    resolve();
  });
};

const createAndDelete = () => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < Math.floor(Math.random() * 500); i++) {
      const fileName = './newDirectory/random' + i + '.json';
      fs.writeFile(fileName, '', (error) => {
        if (error) {
          reject(error);
        } else {
          console.log(`${fileName} is created!`);
          deleteFiles(fileName);
        }
      });
    }
    resolve();
  });
};

const deleteFiles = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.unlink(fileName, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log(`${fileName} 'is deleted!`);
      }
    });
    resolve();
  });
};

module.exports = createAndDeleteFiles;
