import React from 'react'
import {AppProps} from 'next/app'

import "@styles/tailwind.css"
import Head from "next/head";

const App = ({Component, pageProps}: AppProps) => (
    <div className="antialiased">
        <Head>
            <title>TUCMC Club Registeration System</title>
        </Head>
        <Component {...pageProps} />
    </div>
)

export default App