const Auction = artifacts.require("Auction");
const SafeMath = artifacts.require("SafeMath");

module.exports = function(deployer){
    deployer.deploy(Auction);
    deployer.deploy(SafeMath);
}