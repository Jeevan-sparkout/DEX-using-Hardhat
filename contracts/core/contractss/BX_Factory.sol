pragma solidity =0.5.16;

import './interfaces/IBX_Factory.sol';
import './BX_Pair.sol';

contract BX_Factory is IBX_Factory {
    address public feeTo;
    address public feeToSetter; //address allowed to change the feeTo

    mapping(address => mapping(address => address)) public getPair; //mapping for the pairs created
    address[] public allPairs; //array to store all the addresses of the deployed BX_Pair contract

    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }

    bytes32 public constant INIT_CODE_PAIR_HASH = keccak256(abi.encodePacked(type(BX_Pair).creationCode));
    
    function allPairsLength() external view returns (uint) {
        return allPairs.length; //returns the array length which is total pair added to the exchange
    }

    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, 'BX: IDENTICAL_ADDRESSES'); // validation for token with same address
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA); // re-arranging the pair based on addresses
        require(token0 != address(0), 'BX: ZERO_ADDRESS'); // validation for zero address 0x00000... 
        require(getPair[token0][token1] == address(0), 'BX: PAIR_EXISTS'); // Checking whether this pair exists using the getpair mapping
        bytes memory bytecode = type(BX_Pair).creationCode; // this gives the evm bytecode of the BX_Pair contract
        bytes32 salt = keccak256(abi.encodePacked(token0, token1)); // encoding the address of both tokens and hasing it for salt
        // assembly is used to access the evm native features, language used inside the assembly is yul,
        // here create2 is used because, they are deploying the BX_Pair contract using the create2, advantage of using
        // create2 is the address in which the smart contract going to deployed will be known.
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IBX_Pair(pair).initialize(token0, token1); //calling the initialize function in the contract deployed at the address(pair), referring the BX_Pair using IBX_Pair due to inheritance
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length); //emitting the event after creating the pair
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'BX: FORBIDDEN'); //validating the fee address and the current contract address should not be same
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'BX: FORBIDDEN'); //validating the fee address and the current contract address should not be same
        feeToSetter = _feeToSetter;
    }
}
