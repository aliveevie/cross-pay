const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Create a new random wallet
  const wallet = ethers.Wallet.createRandom();
  
  console.log("Account generated!");
  console.log("Address:", wallet.address);
  console.log("Private Key:", wallet.privateKey);
  
  // Optionally save to .env file
  const envContent = `PRIVATE_KEY=${wallet.privateKey}\n`;
  
  try {
    fs.writeFileSync('.env', envContent, { flag: 'a' });
    console.log('Private key saved to .env file');
  } catch (err) {
    console.error('Error saving to .env:', err);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 