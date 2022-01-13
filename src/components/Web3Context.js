import React, { createContext, useEffect, useState } from "react";
import Web3Instance from "../Web3/Web3Instance";

const Web3Context = createContext();

export { Web3Context };

const Web3ContextProvider = ({ children }) => {
  const [accounts, setAccounts] = useState();
  const [auction, setAuction] = useState();

  const loadBlockChain = async () => {
    // setAuction(await Web3Instance.auction);
    // setAccounts(await Web3Instance.accounts);
    return new Promise(async (resolve,reject) =>{
      try {
        const auction = await Web3Instance.auction;
        const accounts = await Web3Instance.accounts;
        resolve({auction, accounts});
      } catch (error) {
        console.log(error);
        reject(error)
      }
    })
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
