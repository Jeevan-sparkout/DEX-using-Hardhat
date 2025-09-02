const hre = require("hardhat");

async function main() {
//  // Get the contract factory using hre.ethers
 const LaxceFactory = await hre.ethers.getContractFactory("BX_Factory");
    
//  // Define constructor parameters
 const feeToSetter = "0x61C2897ceF370fba33D8aA7270861f949D7fA5dc";
 const taxReciever = "0x61C2897ceF370fba33D8aA7270861f949D7fA5dc";
 const taxPercentage = 1;
 
//  // Deploy the contract with constructor parameter
 const factory = await LaxceFactory.deploy(feeToSetter);
 
//  // Wait for deployment to complete
//  await factory.waitForDeployment();
 
//  // Log the deployed address
 console.log("Factory Contract deployed to:", await factory.getAddress());

    let weth = "0xA7da3055DAc8BA56e08F5987652A19B68a013822";
    const FACTORY_ADDRESS = await factory.getAddress();

    const LaxceRouter = await hre.ethers.getContractFactory("BX_Router");

    // Deploy the contract with constructor parameter
    const router = await LaxceRouter.deploy(FACTORY_ADDRESS, weth);

     // Wait for deployment to complete
    await router.waitForDeployment();
    
    // Log the deployed address
    console.log("Router Contract deployed to:", await router.getAddress());

}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });