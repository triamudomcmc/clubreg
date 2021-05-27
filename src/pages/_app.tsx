import React, {useEffect} from 'react'
import {AppProps} from 'next/app'
import "@styles/tailwind.css"
import Head from "next/head";
import {AuthProvider} from "@client/auth";
import {ToastProvider} from "@components/common/Toast/ToastContext";

const App = ({Component, pageProps}: AppProps) => {

  return (
  <div className="antialiased">
    <Head>
      <title>TUCMC Club Registration System</title>
    </Head>
    <AuthProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </AuthProvider>
  </div>)

}

export default App