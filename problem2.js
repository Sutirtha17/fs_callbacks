/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/
const fs = require('fs');
const os = require('os');

const lipsumProblem = (filePath, cb) => {
  const storageFile = 'filenames.txt';

  writeFile(storageFile, '', (error, data) => {
    if (error) {
      cb(error);
    } else {
      readFile(filePath, (error, data) => {
        if (error) {
          cb(error);
        } else {
          const upperCaseFile = 'upperCaseFile.txt';
          const upperCaseText = data.toUpperCase();
          writeFile(upperCaseFile, upperCaseText, (error, data) => {
            if (error) {
              cb(error);
            } else {
              appendToStorage(
                storageFile,
                upperCaseFile + os.EOL,
                (error, data) => {
                  if (error) {
                    cb(error);
                  } else {
                    readFile(upperCaseFile, (error, data) => {
                      if (error) {
                        cb(error);
                      } else {
                        const splitedSentences = data
                          .toLowerCase()
                          .replace(/\.+/g, '.|')
                          .replace(/\?/g, '?|')
                          .replace(/\!/g, '!|')
                          .split('|')
                          .join('\n');
                        // console.log(lowerCaseText);
                        // const splitedSentences = [lowerCaseText, '\n'].join('');
                        // console.log(splitedSentences);
                        const lowerCaseFile = 'lowerCaseFile.txt';
                        writeFile(
                          lowerCaseFile,
                          splitedSentences,
                          (error, data) => {
                            if (error) {
                              cb(error);
                            } else {
                              // console.log(data);
                              appendToStorage(
                                storageFile,
                                lowerCaseFile + os.EOL,
                                (error, data) => {
                                  if (error) {
                                    cb(error);
                                  } else {
                                    // console.log(data);
                                    readFile(lowerCaseFile, (error, data) => {
                                      if (error) {
                                        cb(error);
                                      } else {
                                        const sortedData = data
                                          .split('\n')
                                          .sort()
                                          .join('\n');
                                        // console.log(sortedData);
                                        const sortedFile = 'sortedFile.txt';
                                        writeFile(
                                          sortedFile,
                                          sortedData,
                                          (error, data) => {
                                            if (error) {
                                              cb(error);
                                            } else {
                                              appendToStorage(
                                                storageFile,
                                                sortedFile + os.EOL,
                                                (error, data) => {
                                                  if (error) {
                                                    cb(error);
                                                  } else {
                                                    // console.log(data);
                                                    readFile(
                                                      storageFile,
                                                      (error, data) => {
                                                        if (error) {
                                                          cb(error);
                                                        } else {
                                                          const fileNames =
                                                            data.split('\n');
                                                          for (
                                                            let i = 0;
                                                            i <
                                                            fileNames.length;
                                                            i++
                                                          )
                                                            deleteFiles(
                                                              fileNames[i],
                                                              (error, data) => {
                                                                if (error) {
                                                                  cb(error);
                                                                } else {
                                                                  console.log(
                                                                    data
                                                                  );
                                                                }
                                                              }
                                                            );
                                                        }
                                                      }
                                                    );
                                                  }
                                                }
                                              );
                                            }
                                          }
                                        );
                                      }
                                    });
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    });
                  }
                }
              );
            }
          });
        }
      });
    }
  });
};

const readFile = (filePath, callback) => {
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      callback(error);
    } else {
      callback(null, data);
    }
  });
};

const writeFile = (filePath, upperCaseText, callback) => {
  fs.writeFile(filePath, upperCaseText, (error, data) => {
    if (error) {
      callback(error);
    } else {
      callback(null, '');
    }
  });
};

const appendToStorage = (storageFile, fileName, callback) => {
  fs.appendFile(storageFile, fileName, (error, data) => {
    console.log(fileName);
    if (error) {
      callback(error);
    }
    data = 'Saved!';
    callback(null, data);
  });
};

const deleteFiles = (fileName, callback) => {
  if (fileName != '') {
    fs.unlink(fileName, (error, data) => {
      if (error) {
        callback(error);
      } else {
        data = `${fileName} is deleted!`;
        callback(null, data);
      }
    });
  }
};

module.exports = lipsumProblem;
