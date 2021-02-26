const validateEmail = (email) => {
  if (email == null) return false
  const emailValidatorRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return (emailValidatorRegex.test(email) === true)
}

const validateNumber = (value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) => {
  const parsedValue = Number.parseInt(value)
  return !(Number.isNaN(parsedValue) || parsedValue < min || parsedValue > max)
}

export {
  validateEmail,
  validateNumber
}
