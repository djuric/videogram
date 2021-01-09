import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import { signUpValidate } from "../utils/validation"
import { useMutation, gql } from "@apollo/client"
import { unescape } from "lodash"
import { navigate } from "gatsby"

const SignUp = () => {
  const [formData, setformData] = useState({
    email: "",
    username: "",
    password: "",
  })
  const [error, setError] = useState("")

  const USER_REGISTER = gql`
    mutation REGISTER_USER($input: RegisterUserInput!) {
      registerUser(input: $input) {
        user {
          id
          name
        }
      }
    }
  `

  const [register, { loading }] = useMutation(USER_REGISTER, {
    onError(err) {
      const errorMessage = err.networkError
        ? "A network error occured."
        : unescape(err.graphQLErrors[0].message)
      setError(errorMessage)
    },
    onCompleted() {
      navigate("/signin")
    },
  })

  const handleSubmit = e => {
    e.preventDefault()
    const { error } = signUpValidate(formData)
    if (error) {
      const errorMessage = error.details[0].message
      setError(errorMessage)
    } else {
      setError("")
      register({
        variables: {
          input: {
            clientMutationId: "RegisterUser",
            email: formData.email,
            username: formData.username,
            password: formData.password,
          },
        },
      })
    }
  }

  const handleFieldChange = e => {
    const newFormData = { ...formData }
    newFormData[e.target.name] = e.target.value
    setformData(newFormData)
  }

  return (
    <Layout>
      <SEO />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            {error && (
              <div className="alert alert-danger">
                <div dangerouslySetInnerHTML={{ __html: error }} />
              </div>
            )}
            <form method="post" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleFieldChange}
                  value={formData.email}
                  className="form-control"
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleFieldChange}
                  value={formData.username}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleFieldChange}
                  value={formData.password}
                  className="form-control"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SignUp
