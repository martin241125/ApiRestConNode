function logError(err, req, res, next) {
  console.error(err);
  next(err);
}

function handlerError(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if(err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)

  }
}

module.exports = { handlerError, logError, boomErrorHandler } ;
