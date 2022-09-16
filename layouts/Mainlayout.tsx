import Head from 'next/head'
import React from 'react'

const Mainlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Bill Board Display</title>
            </Head>

            <div className=" ">
                {children}
            </div>
        </React.Fragment>
    )
}

export default Mainlayout