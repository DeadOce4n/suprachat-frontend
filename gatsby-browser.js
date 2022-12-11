import React from 'react'
import Layout from './src/components/Layout'
import QueryClientProvider from './src/components/QueryClientProvider'

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>
}

export const wrapRootElement = ({ element }) => (
  <QueryClientProvider>{element}</QueryClientProvider>
)
