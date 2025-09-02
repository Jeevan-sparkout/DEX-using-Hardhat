pragma solidity >=0.5.0;

interface IBX_Callee {
    function BX_Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
}
