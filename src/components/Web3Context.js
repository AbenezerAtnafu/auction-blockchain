import React, { createContext, useEffect, useState } from "react";
import Web3Instance from "../Web3/Web3Instance";
import { useCookies } from "react-cookie";
import { notification } from "antd";
const Web3Context = createContext();

export { Web3Context };

const Web3ContextProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies();
  window.ethereum.on("accountsChanged", function (accounts) {
    window.location.reload();
  });

  const loadBlockChain = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const auction = await Web3Instance.auction;
        const accounts = await Web3Instance.accounts;
        const auctionEvents = await auction.events;
        const hasAccount = await auction.methods.getUser(accounts[0]).call();

        setCookie("pk", accounts[0]);
        setCookie(
          "hasAccount",
          !(
            hasAccount._userAddress.toString() ===
            "0x0000000000000000000000000000000000000000"
          )
        );

        resolve({ auction, accounts, auctionEvents });
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
