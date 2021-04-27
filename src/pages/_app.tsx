import React from 'react'
import {AppProps} from 'next/app'
import "@styles/tailwind.css"
import Head from "next/head";
import {AuthProvider} from "@client/auth";

const App = ({Component, pageProps}: AppProps) => (
  <div className="antialiased">
    <Head>
      <title>TUCMC Club Registeration System</title>
    </Head>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </div>
)

export default App