'use client'

import React from 'react';
import { Button, Typography } from '@mui/material';
import { Face, Fingerprint, AccountBalanceWallet, Check, HourglassEmpty, CheckCircle } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Webcam from "react-webcam";
import css from '../css/home.module.css';

interface IdentificationBoxProps {
  onClose: () => void;
}

const IdentificationBox: React.FC<IdentificationBoxProps> = ({ onClose }) => {
  const [walletConnected, setWalletConnected] = useState(false)
  const [account, setAccount] = useState(null)

  const handleLogin = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: any) => {
          console.log(result[0]);
          setAccount(result[0]);
          setWalletConnected(true);

        })
        .catch((error: any) => {
          console.log("Could not detect Account", error);
        });
    }
  };

  const [loading, setLoading] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleLogin2 = () => {
    // Your existing login logic
    // ...

    // Start the verification process
    setLoading(true);
    setSubmitDisabled(true);

    // Simulate progress for 5 seconds
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 1;
      setProgress(progressValue);

      if (progressValue >= 100) {
        clearInterval(interval);
        setLoading(false);
        setVerificationComplete(true);
        setSubmitDisabled(false);
      }
    }, 10);
  };

  const handleSubmit = () => {

  }

  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowTick(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust opacity here
      zIndex: 9999, // Ensure it's on top
    }}>
    <div className={css.customBackground}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>Verify your identity</Typography>
      <div style={{ textAlign: 'center', margin: '20px', position: 'relative' }}>
          <div style={{  top: '50%', left: '50%'}}>
            <Webcam style={{ width: '100%', height: 'auto', borderRadius: '2.5%' }} />
            {verificationComplete && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: ' rgba(0, 0, 0, 0.5)', borderRadius: '50%', padding: '2px' }}>
                <CheckCircle style={{ fontSize: '64px', color: 'rgba(255, 255, 255, 1)' }} />
              </div>
            )}
            {//loading && !verificationComplete && (
              <div style={{ width: '100%', position: 'absolute' }}>
                <div style={{ backgroundColor: 'white', width: `${progress}%`, height: '20px', borderRadius: '8px' }} />
              </div>
            //)
            }
          </div>
      </div>

      
      {loading && (
              <HourglassEmpty style={{fontSize: '64px', color: 'black' }} />
            )}
      {walletConnected ? <Typography className="relative flex" color="white" variant="h5"> Linked wallet: {account}</ Typography> : <></>}
      <Button variant="outlined" color={verificationComplete ? "success" : "primary"} fullWidth startIcon={<Face />} onClick={handleLogin2} style={{ marginTop: '10px'}}>Validate Face</Button>
      <Button variant="outlined" color="secondary" fullWidth startIcon={<Fingerprint />}>Validate Fingerprint</Button>
      <Button variant="outlined" color={walletConnected ? "success" : "secondary"} fullWidth startIcon={<AccountBalanceWallet />} onClick={handleLogin}>Connect Wallet</Button>
      <Button variant="outlined" color="success" fullWidth style={{ marginTop: '10px' }} startIcon={<Check />} onClick={onClose} disabled={!verificationComplete || submitDisabled}>Submit</Button>
    </div>
    </div>
  );
};

export default IdentificationBox
