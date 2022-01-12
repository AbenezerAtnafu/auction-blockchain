const { spawn } = require("child_process");

const run = async () => {
  console.log("📄 Deploying and updating contracts...");
  try {
    spawn(
      "cd Truffle && truffle migrate --reset --compile-all && node scripts/contractInfo.js",
      {
        shell: true,
        stdio: "inherit",
      }
    );
  } catch (e) {
    console.log("=========================++++++ Error +++++++++++++++++++++++++===========================")
    console.log(e);
  }
};
run();
