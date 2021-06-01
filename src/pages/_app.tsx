import React, {useEffect} from 'react'
import {AppProps} from 'next/app'
import "@styles/tailwind.css"
import Head from "next/head";
import {AuthProvider} from "@client/auth";
import {ToastProvider} from "@components/common/Toast/ToastContext";
import {TrackerProvider} from "@client/tracker/context";

const App = ({Component, pageProps}: AppProps) => {

  return (
    <div className="antialiased">
      <Head>
        <title>ระบบลงทะเบียนชมรม โรงเรียนเตรียมอุดมศึกษา</title>
      </Head>
      <ToastProvider>
        <TrackerProvider>
          <Component {...pageProps} />
        </TrackerProvider>
      </ToastProvider>
    </div>)

}

export default App