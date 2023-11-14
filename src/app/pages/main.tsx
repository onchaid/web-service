'use client'

import { Button, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useState } from 'react';
import IdentificationBox from '../components/Identity';

export default function MainPage(): ReactNode {
    const [identificationBoxVisible, setIdentificationBoxVisible] = useState(false);

    const openIdentificationBox = () => {
      setIdentificationBoxVisible(true);
    };
  
    const closeIdentificationBox = () => {
      setIdentificationBoxVisible(false);
    };

    return <div>
        <div className="font-mono" style={{ alignContent: 'left', margin: '20px' }}>
            <Typography className="relative flex" variant="h2">Onchaid</Typography>
            <Typography className="relative flex" variant="h5">Some description</Typography>
        </div>

        <Button variant="contained" color="primary" onClick={openIdentificationBox}>Check Identity</Button>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
            <a
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                    About{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Find in-depth information about Next.js features and API.
                </p>
            </a>
            <a
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                    etc...{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Find in-depth information about Next.js features and API.
                </p>
            </a>
        </div>
        {identificationBoxVisible && <IdentificationBox onClose={closeIdentificationBox} />}
    </div>;
}