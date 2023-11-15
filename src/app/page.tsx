import MainPage from './pages/main'
import Index from './pages/index';

import { ethers } from "ethers";
import MetaMaskOnboarding from "@metamask/onboarding";

import { useState } from "react";

/**
 * <main className="flex min-h-screen flex-col justify-between p-24">
      <MainPage/>   
      <p> uwuwuwuw</p>
    </main>
 */

const renderPage = () => {
    return <Index />;
};

export default function Home() {
    return (
        <div>
            {renderPage()}
        </div>
    );
}
