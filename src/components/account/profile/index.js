import React, { useContext } from "react"
import { useQuery, useMutation, gql } from "@apollo/client"
import { getAuthToken, decodeAuthToken } from "../../../utils/auth"
import { AuthContext } from "../../../context/auth"
import ProfileForm from "./form"
import ProgressBar from "./../../progress-bar"

const GET_USER = gql`
  query User($id: ID!) {
    user(idType: DATABASE_ID, id: $id) {
      email
      id
      firstName
      lastName
      nicename
    }
  }
`
const UPDATE_USER = gql`
  mutation User($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        email
        firstName
        lastName
      }
    }
  }
`

const Profile = () => {
  const { user, setUser } = useContext(AuthContext)

  const token = getAuthToken()
  const tokenDecoded = decodeAuthToken(token)

  const { data: { user: { id = 0 } = {} } = {} } = tokenDecoded

  const {
    loading: queryLoading,
    data: queryData,
    error: queryError,
  } = useQuery(GET_USER, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  })

  const [
    updateUser,
    { loading: mutationLoading, data: mutationData, error: mutationError },
  ] = useMutation(UPDATE_USER, {
    onError: () => null,
  })

  if (queryLoading) {
    return <ProgressBar />
  }

  if (queryError) {
    return (
      <div className="alert alert-danger">
        There was an error while trying to get your data. Try logging in again.
      </div>
    )
  }

  const onSave = formData => {
    updateUser({
      variables: {
        input: {
          clientMutationId: "UpdateUser",
          id: user.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
      },
    })

    const newUserData = { ...user }
    for (const field in formData) {
      if (user.hasOwnProperty(field)) {
        newUserData[field] = formData[field]
      }
    }
    setUser(newUserData)
  }

  return (
    <ProfileForm
      queryData={queryData}
      mutationLoading={mutationLoading}
      mutationError={mutationError}
      mutationData={mutationData}
      updateUser={updateUser}
      onSave={onSave}
    />
  )
}

export default Profile
