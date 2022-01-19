import React, {useEffect, useState} from 'react';
import './styles/App.css';

import twitterLogo from './assets/twitter-logo.svg';
import MyEpicNFT from './utils/MyEpicNft.json';
import { ethers } from 'ethers';

// Constants
const TWITTER_HANDLE = 'Evans Kimathi';
const TWITTER_LINK = `https://twitter.com/dedanxkim`;
const OPENSEA_LINK = 'https://testnets.opensea.io/collection/squarenft-jfbuitq3tu';
const TOTAL_MINT_COUNT = 50;

const CONTRACT_ADDRESS ="0xb418963989dbF10820325C44d55948582c0EC4e5";

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const checkIfWalletIsConnected = async() => {
    /*
    * First make sure we have access to window.ethereum
    */
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    /*
    *Check if we're authotized to access user's wallet
    */
    const accounts = await ethereum.request({method: 'eth_accounts'})
    /*
    *Use can have multiple authorized accounts, we grab the first
    */
    if (account.length !== 0){
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)

      setupEventListener();
    }else {
      console.log("No authorized account found");
    }
  }
  /*
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const {ethereum} = window;
      if(!ethereum){
        alert("Get Metamask");
        return
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0])
      setupEventListener()
    } catch(error) {
      console.log(error)
    }
  }

  const openCollection = () => {
    window.open(OPENSEA_LINK);
  }

  const setupEventListener = async () => {
    try {
      const {ethereum} = window;

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectWallet = new ethers.Contract(CONTRCT_ADDRESS, MyEpicNft.abi, signer);

        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey There! we've minted your NFT and sent it to your wallet. It may be blank right now. It can be a mix of 10 min to show on open sea. Here'/s the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });
        console.log("Setup event listener")
      } else {
        console.log("Ethereum object doesn't exist")
      }
    } catch(error){
      console.log(error)
    }
  }

  const askContractToMintNft = async() => {
    const CONTRACT_ADDRESS ="0xb418963989dbF10820325C44d55948582c0EC4e5";

    try {
      const {ethereum} = window;

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, MyEpicNFT.abi, signer);

        console.log("Going to open wallet now to pay gas....");
        let nftTxn = await connectedContract.makeAnEpicNFT();

        console.log('Mining .... please wait.')
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
      }
      else {
        console.log("Ethereum object doesn't exist")
      }
    } catch(error){
      console.log(error)
    }
  }
  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );
  /*
  *This runs our function when the page loads
  */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount === "" ? 
            renderNotConnectedContainer()
          : (
            <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
            Mint NFT
            </button>
          )}
          <div>
          <button onClick={openCollection} className="cta-button-Collection connect-wallet-button">View My NFT Collection</button>
          </div>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;