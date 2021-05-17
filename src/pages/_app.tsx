import React, {useEffect} from 'react'
import {AppProps} from 'next/app'
import "@styles/tailwind.css"
import Head from "next/head";
import {ToastProvider} from "@components/common/Toast/ToastContext";

const App = ({Component, pageProps}: AppProps) => {

  return (
    <div className="antialiased">
      <Head>
        <title>TUCMC Club Registeration System (สำหรับตรวจสอบข้อมูลเท่านั้น ห้ามเผยแพร่)</title>
      </Head>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </div>)

}

export default App