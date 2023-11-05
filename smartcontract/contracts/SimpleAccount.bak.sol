// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

/* solhint-disable avoid-low-level-calls */
/* solhint-disable no-inline-assembly */
/* solhint-disable reason-string */

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./core/BaseAccount.sol";
import "./callback/TokenCallbackHandler.sol";
import "./interfaces/IPool.sol";

/**
  * minimal account.
  *  this is sample minimal account.
  *  has execute, eth handling methods
  *  has a single signer that can send requests through the entryPoint.
  */
contract SimpleAccountbak is BaseAccount, TokenCallbackHandler, UUPSUpgradeable, Initializable {
    using ECDSA for bytes32;
    using Counters for Counters.Counter;

    address public owner;

    IEntryPoint private immutable _entryPoint;

      address public globalLockdownAddress;
    bool public lockdown = false;

    address payable private savingsAccount;
    uint256 private savingsThreshold;
    uint8 private savingsPercentage;

    mapping(address => bool) private recoveryVoters;
    Counters.Counter private totalVoters;
    bool private votersUninitialized;

    struct RecoveryProposal {
        address recoveryAddress;
        uint256 proposalTime;
        address[] votes;
    }

    struct AddVoterProposal {
        address voterAddress;
        uint256 proposalTime;
        address[] vetos;
    }

    struct RemoveVoterProposal {
        address voterAddress;
        uint256 proposalTime;
        address[] vetos;
    }

    RecoveryProposal private recoveryProposal;
    AddVoterProposal private addVoterProposal;
    RemoveVoterProposal private removeVoterProposal;

    event SimpleAccountInitialized(IEntryPoint indexed entryPoint, address indexed owner);
    event Lockdown();
    event LockdownLifted();
    event LockdownAddressSet(address indexed lockdownAddress);
    event SavingsAccountSet(address indexed savingsAccount, uint256 savingsThreshold, uint8 savingsPercentage);
    event Invest(address indexed token, uint256 amount);
    event RecoveryProposed(address indexed recoveryAddress);
    event RecoveryExecuted(address indexed recoveryAddress);
    event RecoveryVoted(address indexed voter);
    event VotersInitialized(address[] indexed voters);
    event AddVoterProposed(address indexed voter);
    event VoterAdded(address indexed voter);
    event AddVoterVetoed(address indexed voter);
    event RemoveVoterProposed(address indexed voter);
    event VoterRemoved(address indexed voter);
    event RemoveVoterVetoed(address indexed voter);

    modifier onlyOwner() {
        _onlyOwner();
        _;
    }

    /// @inheritdoc BaseAccount
    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }


    // solhint-disable-next-line no-empty-blocks
        //Savings account logic runs on ETH transfers in
    receive() external payable {
        // if(savingsAccount != address(0) && msg.value > savingsThreshold){
        //     savingsAccount.transfer(((msg.value * savingsPercentage) / 100));
        // }
        // TODO : automaticlly zap native token to USDC.
        supply();
    }

    address USDCTokenAddress = 0x52D800ca262522580CeBAD275395ca6e7598C014;
    address aavePoolAddress = 0xcC6114B983E4Ed2737E9BD3961c9924e6216c704;
    address borrowTokenAddress;

    function setSavingsAccount(address payable _savingsAccount, uint256 _savingsThreshold, uint8 _savingsPercentage) external {
        _requireFromEntryPointOrOwner();
        require(savingsPercentage <= 100, "Savings percentage must be between 0 and 100");
        savingsAccount = _savingsAccount;
        savingsThreshold = _savingsThreshold;
        savingsPercentage = _savingsPercentage;
        emit SavingsAccountSet(_savingsAccount, _savingsThreshold, _savingsPercentage);
    }
    
    function supply() public {
        // _requireFromEntryPointOrOwner(); 
        // 1. Set amountToDrain to the contract's supplyTokenAddress balance
        uint amountToDrain = IERC20(USDCTokenAddress).balanceOf(address(this));

        // 2. Approve Aave pool to access amountToDrain from this contract 
        IERC20(USDCTokenAddress).approve(aavePoolAddress, amountToDrain);

        // 3. Supply amountToDrain to Aave pool
        IPool(aavePoolAddress).supply(USDCTokenAddress, amountToDrain, address(this), 0);
    }

    function withdrawAToken(address token, uint256 amount) public returns (bool) {
        _requireFromEntryPointOrOwner(); 
        IPool(aavePoolAddress).withdraw(token, amount, address(this));

        return true;
    }

    function transferSavingAccountTo(uint256 amount, address recipient) public returns (bool) {
        _requireFromEntryPointOrOwner(); 
        IERC20(USDCTokenAddress).approve(recipient, amount);
        IERC20(USDCTokenAddress).transfer(recipient, amount);

        return true;
    }

    function borrow() public returns (bool) {
        // Borrow 0.3 DAI
        IPool(aavePoolAddress).borrow(borrowTokenAddress, 0.3 ether, 2, 0, address(this));

        return true;
    }

    constructor(IEntryPoint anEntryPoint) {
        _entryPoint = anEntryPoint;
        _disableInitializers();
    }

    function _onlyOwner() internal view {
        //directly from EOA owner, or through the account itself (which gets redirected through execute())
        require(msg.sender == owner || msg.sender == address(this), "only owner");
    }

    /**
     * execute a transaction (called directly from owner, or by entryPoint)
     */
    function execute(address dest, uint256 value, bytes calldata func) external {
        _requireFromEntryPointOrOwner();
        _call(dest, value, func);
    }

    /**
     * execute a sequence of transactions
     * @dev to reduce gas consumption for trivial case (no value), use a zero-length array to mean zero value
     */
    function executeBatch(address[] calldata dest, uint256[] calldata value, bytes[] calldata func) external {
        _requireFromEntryPointOrOwner();
        require(dest.length == func.length && (value.length == 0 || value.length == func.length), "wrong array lengths");
        if (value.length == 0) {
            for (uint256 i = 0; i < dest.length; i++) {
                _call(dest[i], 0, func[i]);
            }
        } else {
            for (uint256 i = 0; i < dest.length; i++) {
                _call(dest[i], value[i], func[i]);
            }
        }
    }

    /**
     * @dev The _entryPoint member is immutable, to reduce gas consumption.  To upgrade EntryPoint,
     * a new implementation of SimpleAccount must be deployed with the new EntryPoint address, then upgrading
      * the implementation by calling `upgradeTo()`
     */
    function initialize(address anOwner) public virtual initializer {
        _initialize(anOwner);
    }

    function _initialize(address anOwner) internal virtual {
        owner = anOwner;
        lockdown = false;
        votersUninitialized = true;
        emit SimpleAccountInitialized(_entryPoint, owner);
    }

    // Require the function call went through EntryPoint or owner
    function _requireFromEntryPointOrOwner() internal view {
        require(msg.sender == address(entryPoint()) || msg.sender == owner, "account: not Owner or EntryPoint");
    }

    /// implement template method of BaseAccount
    function _validateSignature(UserOperation calldata userOp, bytes32 userOpHash)
    internal override virtual returns (uint256 validationData) {
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        if (owner != hash.recover(userOp.signature))
            return SIG_VALIDATION_FAILED;
        return 0;
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value : value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    /**
     * check current account deposit in the entryPoint
     */
    function getDeposit() public view returns (uint256) {
        return entryPoint().balanceOf(address(this));
    }

    /**
     * deposit more funds for this account in the entryPoint
     */
    function addDeposit() public payable {
        entryPoint().depositTo{value : msg.value}(address(this));
    }

    /**
     * withdraw value from the account's deposit
     * @param withdrawAddress target to send to
     * @param amount to withdraw
     */
    function withdrawDepositTo(address payable withdrawAddress, uint256 amount) public onlyOwner {
        entryPoint().withdrawTo(withdrawAddress, amount);
    }

    function _authorizeUpgrade(address newImplementation) internal view override {
        (newImplementation);
        _onlyOwner();
    }
}

