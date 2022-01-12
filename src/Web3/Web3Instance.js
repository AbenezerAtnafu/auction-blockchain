import Web3 from "web3";
import { ABI, ADDRESS } from "../contracts/contract";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const accounts = new Promise(async (resolve, reject) => {
  try {
    const payload = await web3.eth.getAccounts();
    resolve(payload);
  } catch (error) {
    reject(error);
  }
});

const auction = new web3.eth.Contract(ABI, ADDRESS);

export default {
  web3,
  accounts,
  auction,
};
