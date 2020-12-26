import React, { useState, useContext } from "react"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import { signInValidate } from "../utils/validation"
import { useMutation, gql } from "@apollo/client"
import { navigate } from "gatsby"
import { unescape } from "lodash"
import { AuthContext } from "../context/auth"

const SignIn = () => {
  const [formData, setformData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")

  const USER_LOGIN = gql`
    mutation LOGIN_USER($input: LoginInput!) {
      login(input: $input) {
        authToken
        refreshToken
        user {
          email
          id
          firstName
          lastName
          nicename
        }
      }
    }
  `

  const { login: userLogin } = useContext(AuthContext)

  const [login, { loading }] = useMutation(USER_LOGIN, {
    onError(err) {
      const errorMessage = err.networkError
        ? "A network error occured."
        : unescape(err.graphQLErrors[0].message)
      setError(errorMessage)
    },
    onCompleted(data) {
      if (data) {
        userLogin(data.login)
        navigate("/account/profile")
      }
    },
  })

  const handleSubmit = e => {
    e.preventDefault()
    const { error } = signInValidate(formData)
    if (error) {
      const errorMessage = error.details[0].message
      setError(errorMessage)
    } else {
      setError("")
      login({
        variables: {
          input: {
            clientMutationId: "",
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
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleFieldChange}
                  value={formData.username}
                  className="form-control"
                  autoFocus
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
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SignIn
