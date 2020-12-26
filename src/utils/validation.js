import Joi from "joi"

const signUpValidate = data => {
  return Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
  }).validate(data)
}

const signInValidate = data => {
  return Joi.object({
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(1)
      .required()
      .label("Password"),
  }).validate(data)
}

export { signUpValidate, signInValidate }
