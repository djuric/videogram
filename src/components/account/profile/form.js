import React, { useState } from "react"

function Form({
  queryData,
  mutationLoading,
  mutationError,
  mutationData,
  onSave,
}) {
  const [formData, setFormData] = useState({
    firstName: queryData.user.firstName ? queryData.user.firstName : "",
    lastName: queryData.user.lastName ? queryData.user.lastName : "",
    email: queryData.user.email ? queryData.user.email : "",
  })

  let error
  let success

  if (mutationError) {
    error = mutationError.networkError
      ? "A network error occured."
      : unescape(mutationError.graphQLErrors[0].message)
  }

  if (mutationData) {
    success = "Profile updated."
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSave(formData)
  }

  const handleFieldChange = ({ target: { name, value } }) => {
    const newFormData = { ...formData }
    newFormData[name] = value
    setFormData(newFormData)
  }

  const { firstName, lastName, email } = formData

  return (
    <div className="row">
      <div className="col-md-10">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="form-control"
              value={firstName}
              onChange={handleFieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="form-control"
              value={lastName}
              onChange={handleFieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              value={email}
              onChange={handleFieldChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={mutationLoading}
          >
            {mutationLoading ? "Loading..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
