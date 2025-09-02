const { ethers } = require("hardhat");

async function main() {
  // --- Config ---
  const routerAddress = "0x537472d101A051C058A361312356cf434DBAD5E8";   // replace
  const tokenAAddress = "0xaed19707C01b4100e437b4fbE968acf63C200DCD";   // replace
  const tokenBAddress = "0x406dD1D39877aA66fD8F3f129e520393AB75f3a9";   // replace

  const amountA = ethers.parseUnits("1000", 18);
  const amountB = ethers.parseUnits("1000", 18);

  const [deployer] = await ethers.getSigners();

  console.log("Deployer:", deployer.address);

  // --- Get contracts ---
  const router = await ethers.getContractAt("IBX_Router", routerAddress);
 const tokenA = await ethers.getContractAt(
  "contracts/core/contractss/interfaces/IERC20.sol:IERC20",
  tokenAAddress
);

const tokenB = await ethers.getContractAt(
  "contracts/core/contractss/interfaces/IERC20.sol:IERC20",
  tokenBAddress
);


  // --- Approve router to spend tokens ---
  console.log("Approving Router...");
  let tx = await tokenA.approve(routerAddress, amountA);
  await tx.wait();
  tx = await tokenB.approve(routerAddress, amountB);
  await tx.wait();
  console.log("Approval done.");

  // --- Add Liquidity ---
  console.log("Adding liquidity...");
  tx = await router.addLiquidity(
    tokenAAddress,
    tokenBAddress,
    amountA,      // amountADesired
    amountB,      // amountBDesired
    0,            // amountAMin (slippage)
    0,            // amountBMin
    deployer.address, // who receives LP tokens
    Math.floor(Date.now() / 1000) + 60 * 10 // deadline
  );

  const receipt = await tx.wait();
  console.log("Liquidity added. Tx:", receipt.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
