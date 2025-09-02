const Router = artifacts.require('BX_Router.sol');
const WETH = artifacts.require('WETH.sol');

module.exports = async function (deployer, _network, addresses) {
  let weth;
  const FACTORY_ADDRESS = '0x80EfbC6C75687DDFeBD66eAC2dC89417426F6488';

  if(_network === 'mainnet' || _network === 'mainnet-fork') {
    weth = await WETH.at('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
  } else if(_network === 'ropsten-fork' || _network === 'rinkeby'){
    weth = await WETH.at('0xc778417E063141139Fce010982780140Aa0cD5Ab');
  } else if(_network === 'rinkeby-fork' || _network === 'rinkeby'){
    weth = await WETH.at('0xc778417E063141139Fce010982780140Aa0cD5Ab');
  } else if(_network === 'goerli'){
    weth = await WETH.at('0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6');
  } else if(_network === 'kovan'){
    weth = await WETH.at('0xd0A1E359811322d97991E03f863a0C30C2cF029C');
  }

  await deployer.deploy(Router, FACTORY_ADDRESS, weth.address);
};
