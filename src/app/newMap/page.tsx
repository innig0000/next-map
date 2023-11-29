"use client"
import React from 'react';
import dynamic from 'next/dynamic';

const Home = () => {
    const MapWithNoSSR = dynamic(() => import("./Map"), {
        ssr: false
    });

    return(
        <>
            <MapWithNoSSR/>
        </>
    )
}
export default Home;