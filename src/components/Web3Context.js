import React, { createContext, useEffect, useState } from 'react';
import Web3Instance from '../Web3/Web3Instance';

const Web3Context = createContext();

export { Web3Context };

const Web3ContextProvider = ({ children }) => {
  window.ethereum.on('accountsChanged', function (accounts) {
    window.location.reload();
  })

  const loadBlockChain = async () => {
    return new Promise(async (resolve,reject) =>{
      try {
        const auction = await Web3Instance.auction;
        const accounts = await Web3Instance.accounts;
        window.document.cookie = `pk=${accounts[0]}`
        const hasAccount = await auction.methods.getUser(accounts[0]).call();
        window.document.cookie = `hasAccount=${!(hasAccount._userAddress.toString() === "0x0000000000000000000000000000000000000000")}`
        resolve({auction, accounts});
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  useEffect(async () => {
    await loadBlockChain();
  }, []);

  return (
    <Web3Context.Provider value={loadBlockChain}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
