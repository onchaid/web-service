'use client'

import React, { useState, useEffect } from 'react';
import css from '../css/home.module.css';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider'
import IdentificationBox from '../components/Identity';

const Index: React.FC = () => {
  /******************************************************************************************************/
  /* Variables and constants */
  /******************************************************************************************************/
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [] }
  const [wallet, setWallet] = useState(initialState)
  let accounts;
  let connectWalletLabel = "Sign up";

  /******************************************************************************************************/
  /* Events */
  /******************************************************************************************************/
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))
    }

    getProvider()
  }, []) 

  /******************************************************************************************************/
  /* Functions */
  /******************************************************************************************************/

  const updateWallet = async (accounts:any) => {     
    setWallet({ accounts })                          
  }                                                  

  const handleConnect = async () => {     
    accounts = await window.ethereum.request({   
      method: "eth_requestAccounts",                 
    });                    
    updateWallet(accounts);
    connectWalletLabel = accounts[0];
    const divAccount: HTMLElement | null = document.getElementById('divAccount');
    if (divAccount != null) {
        divAccount.innerHTML = "Connected account: " + connectWalletLabel;
    }

    const seccion: HTMLElement | null = document.getElementById('CreateYourIdentity');
    if (seccion) {
        seccion.scrollIntoView({ behavior: 'smooth' });
    }

    const connectWallet = document.getElementById('divConnect');
    if (connectWallet) {
        connectWallet.style.display = "none";
    }
  }

  let currentPosition: number = 0;
  const moverCarrusel = (direction: number) => {
    alert(direction);
    const carrusel: HTMLElement | null = document.getElementById('carrusel');
    const steps: NodeListOf<HTMLElement> | undefined = document.querySelectorAll('step');
    alert(steps.length);
    if (carrusel && steps !== undefined) {
        currentPosition += direction;
        alert(currentPosition);
        currentPosition = Math.max(0, Math.min(currentPosition, steps.length - 1));
        alert(currentPosition);
        const stepWidth: number | undefined = steps[currentPosition]?.offsetWidth;
        alert(stepWidth);

        if (stepWidth !== undefined) {
            alert("translateX");
            carrusel.style.transform = `translateX(${-currentPosition * stepWidth}px)`;
        }
    }
  };

  const [identificationBoxVisible, setIdentificationBoxVisible] = useState(false);

  const openIdentificationBox = () => {
    setIdentificationBoxVisible(true);
  };

  const closeIdentificationBox = () => {
    setIdentificationBoxVisible(false);
  };

  return (
    <div className={css.bodyClass}>
        <header className={css.header}>
            <div className={css.accountInfo} id="divAccount"></div>
            
            <nav className={css.nav}>
                <ul>
                    <li className={css.navItem}><a className={css.navLink} href="#AboutAs">About us</a></li>
                    <li className={css.navItem}><a className={css.navLink} href="#Vision">Vision</a></li>
                    <li className={css.navItem}><a className={css.navLink} href="#WhatIs">What is</a></li>
                    <li className={css.navItem}><a className={css.navLink} href="#Team">Team</a></li>
                    <li className={css.navItem}><a className={css.navLink} href="#FollowUs">Follow us</a></li>
                </ul>
            </nav>
        </header>

        <div className={css.divHeader}>
            <img className={css.background} alt="background" />
            <img className={css.blackLens} alt="blackLens" />

            <div className={css.faceMesh}></div>

            <div className={css.logo}>
                <img className={css.logo} alt="Logo" />
            </div>

            <div className={css.divSlogan}>        
                <label className={css.slogan}>Decentralized identity as human right</label>
            </div>

            <div className={css.divConnect} id='divConnect'>        
                <label className={css.connectButton} onClick={openIdentificationBox}>{connectWalletLabel}</label>
            </div>
        </div>
      
            {identificationBoxVisible && <IdentificationBox onClose={closeIdentificationBox} />}


        <section className={css.divSection} id="AboutAs">
            <div className={css.divTitle}>
                <label className={css.title}>About us</label>
            </div>

            <div className={css.divContent}>
                <div className={css.divIntroImg}>
                    <img className={css.introImg} alt="img1" />
                </div>
                <div className={css.divIntro}>
                    <p>OnchaID's decentralized identity provide users and institutions with a robust framework to meet the challenges of the interconnected world while maintaining the highest standards of security and authentication without storing private user data.</p>
                    <br></br>
                    <p>As the Internet continues to evolve into Web3, decentralized systems, blockchain technology, and digital assets, the need for robust identity solutions becomes paramount.</p>
                    <br></br>
                    <p>In this new landscape, users and institutions need a means of ensuring the integrity and authenticity of digital identities.</p>                
                </div>      
            </div>
        </section>

        <section className={css.divSection} id="Vision">
            <div className={css.divTitle}>
                <label className={css.title}>Our vision</label>
            </div>

            <div className={css.divContent}>
                <div className={css.divIntro}>
                    <p>As the Internet continues to evolve into Web3, decentralized systems, blockchain technology, and digital assets, the need for robust identity solutions becomes paramount.</p>
                    <br></br>
                    <p>In this new landscape, users and institutions need a means of ensuring the integrity and authenticity of digital identities.</p>
                    <br></br>
                    <p>OnchaID's decentralized identity provide users and institutions with a robust framework to meet the challenges of the interconnected world while maintaining the highest standards of security and authentication without storing private user data.</p>
                </div>
            </div>
        </section>

        <section className={css.divSection} id="WhatIs">
            <div className={css.divTitle}>
                <label className={css.title}>What is decentralized identity?</label>
            </div>

            <div className={css.divContent}>
                <div className={css.divIntro}>
                    <p>Decentralized Identity, often referred to as DID, is a digital identity framework that empowers individuals and organizations to own, control, and share their identity information in a secure, trustless, and decentralized manner.</p>
                    <br></br>
                    <p>In the context of Web3 and Blockchain technology, DID leverages cryptographic principles and distributed ledger systems to eliminate the need for centralized identity authorities, offering users unparalleled control over their personal data and enabling seamless, secure interactions within the decentralized ecosystem.</p>
                    <br></br>
                    <p>OnchaID is at the forefront of advancing decentralized identity solutions for a more secure and interconnected digital world.</p>
                </div>

                <div className={css.divIntroImg}>
                    <img className={css.whatIsImg} alt="decentralizeIdentityImg" />
                </div>
            </div>

            <div className={css.divTitle}>
                <label className={css.title}>What is a Sybil attack?</label>
            </div>

            <div className={css.divContent}>
                <div className={css.divIntroImg}>
                    <img className={css.sybilAttackImg} alt="sybilAttackImg" />
                </div>

                <div className={css.divIntro}>
                    <p>A Sybil attack is a malicious strategy in a decentralized network where an adversary creates multiple fake or pseudonymous identities, nodes, or accounts to gain disproportionate influence, control, or benefits within the network.</p>
                    <br></br>
                    <p>In the context of Web3 and blockchain-based systems, Sybil attacks pose a significant threat, as they can potentially undermine the integrity, trustworthiness, and security of decentralized operations.</p>
                    <br></br>
                    <p>OnchaID's innovative approach mitigates the risk of Sybil attacks by providing robust decentralized identity solutions, ensuring the authenticity and accountability of participants in the network.</p>
                </div>
            </div>
        </section>
        
        <section className={css.divSection} id="Team">
            <div className={css.divTitle}>
                <label className={css.title}>Our Team</label>
            </div>

            <div className={css.divContent}>
                <div className={css.divColumn}>
                    <img className={css.teamImg1} alt="Ludovico_Sforza"/>
                    <label className={css.subTitle}>Ludovico Sforza</label>
                </div>

                <div className={css.divColumn}>
                    <img className={css.teamImg2} alt="Santiago"/>
                    <label className={css.subTitle}>Santiago Yanzon</label>
                </div>

                <div className={css.divColumn}>
                    <img className={css.teamImg3} alt="David_Gimenez"/>
                    <label className={css.subTitle}>David Gimenez</label>
                </div>

                <div className={css.divColumn}>
                    <img className={css.teamImg4} alt="Alex_Sabogal"/>
                    <label className={css.subTitle}>Alex Sabogal</label>
                </div>

                <div className={css.divColumn}>
                    <img className={css.teamImg5} alt="Daniel_Ruiz"/>
                    <label className={css.subTitle}>Daniel Ruiz</label>
                </div>
            </div>
        </section>
        
        <section className={css.divSection} id="FollowUs">
            <div className={css.divTitle}>
                <label className={css.title}>Follow us</label>
            </div>

            <div className={css.divContent}>
                <div className={css.divFollowUs}>
                    <div className={css.divSocialNetwork}>
                        <img className={css.twitterImg} alt="twitterImg" />
                        <div className={css.divSocialNetworkLink}>
                            <a href='https://twitter.com/onchaid'>Twitter</a>
                        </div>
                    </div>
                    <br></br>
                    <div className={css.divSocialNetwork}>
                        <img className={css.githubImg} alt="githubImg" />
                        <div className={css.divSocialNetworkLink}>
                        <a href='https://github.com/onchaid'>Github</a>
                        </div>
                    </div>
                    <br></br>
                    <div className={css.divSocialNetwork}>
                        <img className={css.youtubeImg} alt="youtubeImg" />
                        <div className={css.divSocialNetworkLink}>
                            <a href='https://www.youtube.com/'>Youtube</a>
                        </div>
                    </div>
                </div>

                <div className={css.divFollowUsImg}>
                    <img className={css.followUsImg} alt="followUsImg" />
                </div>
            </div>
        </section>
    </div>
  );
};

export default Index;
