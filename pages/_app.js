import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client/react'
import {client} from '../lib/apollo'

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider
     client={client}>
     
     
  <Component {...pageProps} />
  
  </ApolloProvider>
  )
}



