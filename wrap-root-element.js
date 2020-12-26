import React from "react"
import { ApolloProvider } from "@apollo/client"
import { client } from "./src/apollo/client"
import { AuthProvider } from "./src/context/auth"

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{element}</AuthProvider>
    </ApolloProvider>
  )
}
