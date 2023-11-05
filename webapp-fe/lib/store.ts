import { ethers } from "ethers";
import { Presets, ICall, Client, IClient } from "userop";
import accountAbi from "./abi.json";
import { getAccount } from './service';
import ERC20_ABI from '@/assets/abis/erc20.abi.json';
import AAVE_ABI from '@/assets/abis/aave.abi.json';
import config from '@/config.json';

const signingKey = process.env.NEXT_PUBLIC_SIGNING_KEY!;
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL!;
const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL!;
const entryPoint = process.env.NEXT_PUBLIC_ENTRY_POINT!;
const factory = process.env.NEXT_PUBLIC_FACTORY!;

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);


// const dosupplyAave = async (_amount: any, from: any, to: any): Promise<Array<ICall>> => {
//     const usdc = new ethers.Contract(usdcToken, ERC20_ABI, provider);
//     const ausdc = new ethers.Contract(ausdcToken, ERC20_ABI, provider);
//     const aave = new ethers.Contract(aaveaddress, AAVE_ABI, provider);

//     const decimals = await Promise.all([usdc.decimals()]);
//     const amount = ethers.utils.parseUnits(_amount, decimals);

//     const approveUSDC = {
//         to: usdc.address,
//         value: 0,
//         data: usdc.interface.encodeFunctionData("approve", [aave.address, amount])
//     };

//     const supplyUSDC = {
//         to: aave.address,
//         value: 0,
//         data: aave.interface.encodeFunctionData("supply", [usdc.address, amount, to, 0])
//     };

//     // const approveAToken = {
//     //     to: atoken.address,
//     //     value: 0,
//     //     data: atoken.interface.encodeFunctionData("approve", [to, amount])
//     // };

//     // const sendAToken = {
//     //     to: atoken.address,
//     //     value: 0,
//     //     data: atoken.interface.encodeFunctionData("transfer", [to, amount])
//     // };
    
//     return [approveUSDC, supplyUSDC];
// }

const usdcToken = '0x52D800ca262522580CeBAD275395ca6e7598C014';
const ausdcToken = '0x4086fabeE92a080002eeBA1220B9025a27a40A49';
const aaveaddress = '0xcC6114B983E4Ed2737E9BD3961c9924e6216c704';

const transfer = async (account: any, amount: any, to: any) => {
    const { saving_wallet_address, crypto_wallet_address, crypto_wallet_salt, saving_wallet_salt } = account;
    console.log(account);

    const client = await Client.init(rpcUrl, {
        entryPoint: entryPoint
    });

    const paymasterMiddleware = paymasterUrl
    ? Presets.Middleware.verifyingPaymaster(paymasterUrl, {
        type: "payg",
      })
    : undefined;

    const simpleAccount = await Presets.Builder.SimpleAccount.init(
        new ethers.Wallet(signingKey),
        rpcUrl,
        {   
            paymasterMiddleware,
            entryPoint: entryPoint,
            factory: factory,
            salt: saving_wallet_salt
        }
    );

    // const usdc = new ethers.Contract(usdcToken, ERC20_ABI, provider);
    const ausdc = new ethers.Contract(ausdcToken, ERC20_ABI, provider);
    const aave = new ethers.Contract(aaveaddress, AAVE_ABI, provider);

    const decimals = await Promise.all([ausdc.decimals()]);
    const amount2 = ethers.utils.parseUnits(amount, decimals);

    let dest: Array<string> = [];
    let data: Array<string> = [];

    dest = [ausdc.address, ausdc.address];
    data = [
        ausdc.interface.encodeFunctionData("approve", [
        to,
        amount2,
      ]),
      ausdc.interface.encodeFunctionData("transfer", [
        to,
        amount2
      ]),
    ];

    const res = await client.sendUserOperation(
      simpleAccount.executeBatch(dest, data), {
        onBuild: (op) => console.log("Signed UserOperation:", op),
    });

    console.log(`UserOpHash: ${res.userOpHash}`);

    console.log("Waiting for transaction...");
    const ev = await res.wait();
    console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);


    return ev?.transactionHash ?? null;
};

const supplyAave = async (account: any, amount: any) => {
    const { saving_wallet_address, crypto_wallet_address, crypto_wallet_salt, saving_wallet_salt } = account;
    console.log(account);

    const client = await Client.init(rpcUrl, {
        entryPoint: entryPoint
    });

    const paymasterMiddleware = paymasterUrl
    ? Presets.Middleware.verifyingPaymaster(paymasterUrl, {
        type: "payg",
      })
    : undefined;

    const simpleAccount = await Presets.Builder.SimpleAccount.init(
        new ethers.Wallet(signingKey),
        rpcUrl,
        {   
            paymasterMiddleware,
            entryPoint: entryPoint,
            factory: factory,
            salt: crypto_wallet_salt
        }
    );

    //const calls = await dosupplyAave(amount, crypto_wallet_address, saving_wallet_address);

    const usdc = new ethers.Contract(usdcToken, ERC20_ABI, provider);
    //const ausdc = new ethers.Contract(ausdcToken, ERC20_ABI, provider);
    const aave = new ethers.Contract(aaveaddress, AAVE_ABI, provider);

    const decimals = await Promise.all([usdc.decimals()]);
    const amount2 = ethers.utils.parseUnits(amount, decimals);

    let dest: Array<string> = [];
    let data: Array<string> = [];

    dest = [usdc.address, aave.address];
    data = [
      usdc.interface.encodeFunctionData("approve", [
        aave.address,
        amount2,
      ]),
      aave.interface.encodeFunctionData("supply", [
        usdc.address,
        amount2,
        saving_wallet_address,
        0
      ]),
    ];

    const res = await client.sendUserOperation(
      simpleAccount.executeBatch(dest, data), {
        onBuild: (op) => console.log("Signed UserOperation:", op),
    });

    console.log(`UserOpHash: ${res.userOpHash}`);

    console.log("Waiting for transaction...");
    const ev = await res.wait();
    console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);


    return ev?.transactionHash ?? null;
};

/*
  * @param asset The address of the underlying asset to withdraw
   * @param amount The underlying amount to be withdrawn
   *   - Send the value type(uint256).max in order to withdraw the whole aToken balance
   * @param to The address that will receive the underlying, same as msg.sender if the user
*/
const withdrawAave = async (account: any, amount: any) => {
    const { saving_wallet_address, crypto_wallet_address, crypto_wallet_salt, saving_wallet_salt } = account;
    console.log(account);

    const client = await Client.init(rpcUrl, {
        entryPoint: entryPoint
    });

    const paymasterMiddleware = paymasterUrl
    ? Presets.Middleware.verifyingPaymaster(paymasterUrl, {
        type: "payg",
      })
    : undefined;

    const simpleAccount = await Presets.Builder.SimpleAccount.init(
        new ethers.Wallet(signingKey),
        rpcUrl,
        {   
            paymasterMiddleware,
            entryPoint: entryPoint,
            factory: factory,
            salt: saving_wallet_salt
        }
    );

    //const calls = await dosupplyAave(amount, crypto_wallet_address, saving_wallet_address);

    const usdc = new ethers.Contract(usdcToken, ERC20_ABI, provider);
    const ausdc = new ethers.Contract(ausdcToken, ERC20_ABI, provider);
    const aave = new ethers.Contract(aaveaddress, AAVE_ABI, provider);

    const decimals = await Promise.all([ausdc.decimals()]);
    const amount2 = ethers.utils.parseUnits(amount, decimals);

    let dest: Array<string> = [];
    let data: Array<string> = [];

    dest = [ausdc.address, aave.address];
    data = [
        ausdc.interface.encodeFunctionData("approve", [
        aave.address,
        amount2,
      ]),
      aave.interface.encodeFunctionData("withdraw", [
        usdc.address,
        amount2,
        crypto_wallet_address
      ]),
    ];

    const res = await client.sendUserOperation(
      simpleAccount.executeBatch(dest, data), {
        onBuild: (op) => console.log("Signed UserOperation:", op),
    });

      console.log(`UserOpHash: ${res.userOpHash}`);
      console.log("Waiting for transaction...");
      const ev = await res.wait();
      console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);

      return ev?.transactionHash ?? null;
};

// const submitUserOp = async (token: any, operation: string, uData: any) => {

//     const data = await getAccount(token);
//     const { salt, address } = data;

//     const simpleAccount = await Presets.Builder.SimpleAccount.init(
//     new ethers.Wallet(signingKey),
//         rpcUrl,
//         {
//             paymasterMiddleware,
//             entryPoint: entryPoint,
//             factory: factory,
//             salt: salt
//         },
//     );

//     const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
//     const client = await Client.init(rpcUrl,{
//         entryPoint: entryPoint
//     });

//     const accountContract = new ethers.Contract(address, accountAbi, provider);

//     let encodedData : any;

//     if(operation === "setSavingsAccount") {
//         encodedData = accountContract.interface.encodeFunctionData("setSavingsAccount", ['0x118b0f8c268b066300594E0dd0028a3717d7B9e9', 5, 30]);
//     }
//     else if(operation === "invest") {
//         encodedData = accountContract.interface.encodeFunctionData("invest", ['', '']);
//     }
//     else if(operation === "deposit") {
//         encodedData = accountContract.interface.encodeFunctionData("deposit", ['', '']);
//     }

//     const res = await client.sendUserOperation(
//         simpleAccount.execute(
//         address,
//         0,
//         encodedData
//         ),
//         {
//         dryRun: false,
//         onBuild: (op) => console.log("Signed UserOperation:", op),
//         }
//     );

//     console.log(`UserOpHash: ${res.userOpHash}`);
//     console.log("Waiting for transaction...");
//     const ev = await res.wait();
//     console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);

//     return ev?.transactionHash ?? null;
// }

export { supplyAave, withdrawAave, transfer }