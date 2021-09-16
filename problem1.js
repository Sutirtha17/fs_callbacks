/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require('fs');

const createAndDeleteFiles = (cb) => {
  createDirectory((error, data) => {
    if (error) {
      cb(error);
    } else {
      cb(null, data);
      createAndDelete((error, data) => {
        if (error) {
          cb(error);
        } else {
          cb(null, data);
        }
      });
    }
  });
};

const createDirectory = (callback) => {
  fs.mkdir('./newDirectory', { recursive: true }, (error) => {
    if (error) {
      callback(error);
    } else {
      callback(null, 'Directory created!');
    }
  });
};

const createAndDelete = (callback) => {
  for (let i = 0; i < Math.floor(Math.random() * 500); i++) {
    const fileName = './newDirectory/random' + i + '.json';
    fs.writeFile(fileName, '', (error) => {
      if (error) {
        callback(error);
      } else {
        callback(null, `${fileName} is created!`);
        deleteFiles(fileName, callback);
      }
    });
  }
};

const deleteFiles = (fileName, callback) => {
  fs.unlink(fileName, (error) => {
    if (error) {
      callback(error);
    } else {
      callback(null, `${fileName} 'is deleted!`);
    }
  });
};

module.exports = createAndDeleteFiles;
