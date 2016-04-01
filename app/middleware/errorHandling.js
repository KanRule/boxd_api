let errorHandlers = {
  ValidationError(err) {
    let errors = _.map(err.errors, (val) => {
      return { message: val.message, path: val.path }
    })

    return { status: 400, errors }
  }
}

function defaultHandler(err) {
  let status = err.status || 500
  let errors = Array.isArray(err) ? err : [err]

  errors = _.map(errors, (val) => {
    return { message: val.message }
  })

  if (status === 500) {
      console.error(err.stack)
      errors = [{ message: 'Internal Server Error' }]
  }

  return { status, errors }
}

function handleErrors(err, req, res, next) {
  if (res.headersSent) return next(err)
  let handler = errorHandlers[err.name] || defaultHandler
  let { status, errors } = handler(err)
  res.status(status).json({ errors })
}

function routeNotFound(req, res, next) {
  next(_.$err("Requested route doesn't exist.", 404))
}

module.exports = { handleErrors, routeNotFound }