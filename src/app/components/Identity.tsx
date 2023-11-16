'use client'

import React from 'react';
import { Button, Typography } from '@mui/material';
import { Face, Fingerprint, AccountBalanceWallet, Check } from '@mui/icons-material';
import { useState } from 'react';
import Webcam from "react-webcam";

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
        .then((result) => {
          console.log(result[0]);
          setAccount(result[0]);
          setWalletConnected(true);

        })
        .catch((error) => {
          console.log("Could not detect Account", error);
        });
    } else {
      console.log("Need to install MetaMask");
      onboarding.startOnboarding();
    }
  };

  return (
    <div style={{ position: 'fixed', zIndex: 10, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', background: '#ffffff', borderRadius: '8px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>Identification Box</Typography>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <Face style={{ fontSize: '64px', color: '#333333' }} />
      </div>
      <Webcam allowTransparency />;
      {walletConnected ? <Typography className="relative flex" variant="h5" style={{color: "black"}}> wellcome {account}</ Typography> : <></>}
      <Button variant="outlined" color="primary" fullWidth startIcon={<Face />}>Validate Face</Button>
      <Button variant="outlined" color="secondary" fullWidth startIcon={<Fingerprint />}>Validate Fingerprint</Button>
      <Button variant="outlined" color={walletConnected ? "success" : "secondary"} fullWidth startIcon={<AccountBalanceWallet />} onClick={handleLogin}>Connect Wallet</Button>

      <Button variant="outlined" color="success" fullWidth style={{ marginTop: '10px' }} startIcon={<Check />} onClick={onClose}>Submit</Button>
    </div>
  );
};

export default IdentificationBox;
