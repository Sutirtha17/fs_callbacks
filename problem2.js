/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fsPromises = require('fs').promises;

const readFile = (filePath) => {
  return fsPromises.readFile(filePath, 'utf-8');
};

const writeFile = (filePath, upperCaseText) => {
  return fsPromises.writeFile(filePath, upperCaseText);
};

const appendToStorage = (storageFile, fileName) => {
  return fsPromises.appendFile(storageFile, fileName);
};

const deleteFiles = (fileName) => {
  //return fsPromises.unlink(fileName);
};

const lipsumProblem = (filePath) => {
  return new Promise((resolve, reject) => {
    const storageFile = 'filenames.txt';
    const lowerCaseFile = 'lowerCaseFile.txt';
    const upperCaseFile = 'upperCaseFile.txt';
    const sortedFile = 'sortedFile.txt';

    readFile(filePath)
      .then((data) => {
        const upperCaseText = data.toUpperCase();

        return writeFile(upperCaseFile, upperCaseText);
      })

      .then(() => {
        return writeFile(storageFile, upperCaseFile + '\n');
      })

      .then(() => {
        return readFile(upperCaseFile);
      })

      .then((data) => {
        const lowerCaseText = data.toLowerCase();
        const splitedSentences = lowerCaseText.split('. ').join('\n');

        return writeFile(lowerCaseFile, splitedSentences);
      })

      .then(() => {
        return appendToStorage(storageFile, lowerCaseFile + '\n');
      })

      .then(() => {
        return readFile(lowerCaseFile);
      })

      .then((data) => {
        const sortedData = data.split('\n').sort().join('\n');

        return writeFile(sortedFile, sortedData);
      })

      .then(() => {
        return appendToStorage(storageFile, sortedFile);
      })

      .then(() => {
        return readFile(storageFile);
      })

      .then((data) => {
        const fileNames = data.split('\n');

        fileNames.forEach((eachFile) => {
          deleteFiles(eachFile);
        });
      })

      .then(() => {
        resolve('Success!');
      })

      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = lipsumProblem;
