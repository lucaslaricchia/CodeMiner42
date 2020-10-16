import { ValidationError } from 'yup'

const errorHandler = (error, request, response) => {
  if (error instanceof ValidationError) {
    let errors = {}

    error.inner.forEach((err) => {
      errors[err.path] = err.errors
    })
    return response.status(400).json({ message: 'Validation Fails', errors })
  }

  console.error(error)

  return response.status(500).json({ message: 'Internal Server Error' })
}

export default errorHandler
