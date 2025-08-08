import { ethers } from "hardhat";

async function main() {
  

  const WritingRegistry = await ethers.getContractFactory("WritingRegistry");

  const contract = await WritingRegistry.deploy(); // Explicitly cast certificateURI

  // Ensure the contract is deployed
  await contract.waitForDeployment();

  // Retrieve and log contract address
  const contractAddress = await contract.getAddress();
  console.log(`CourseCertificateNFT deployed to: ${contractAddress}`);
}

// Execute deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });