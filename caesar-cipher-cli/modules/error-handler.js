function errorHandler(err, exitNum) {
  err = err.ENOENT ? err.ENOENT : err;
  process.stderr.write(`${err}\n`);

  process.exit(exitNum);
}


module.exports = errorHandler;
