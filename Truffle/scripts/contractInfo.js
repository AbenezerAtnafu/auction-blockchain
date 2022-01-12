var fs = require("fs");

// fs.copyFile("build/contracts/Migrations.json", "../src/contracts/contract.json", (err) => {
//   if (err) throw err;
//   console.log("✅ Your contract's ABI was copied to the frontend");
// });

let rawData = fs.readFileSync("build/contracts/Auction.json");
let data = JSON.parse(rawData);

let writtenData = {
  abi:data["abi"],
  address:data["networks"]['5777']['address']
}

let content = `export const ADDRESS = ${JSON.stringify(writtenData.address)}; export const ABI = ${JSON.stringify(writtenData.abi)}`;

try {
  fs.writeFileSync('../src/contracts/contract.js', content)
  //file written successfully
  console.log("✅ Your contract's ABI was copied to the frontend");
} catch (err) {
  console.error(err)
}