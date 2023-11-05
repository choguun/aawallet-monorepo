const express = require('express');
const fs = require('fs');

import { ethers } from "ethers";
import { Presets } from "userop";
// @ts-ignore
import config from "./config.json";

const app = express();

app.get('/key', async (req: any, res: any) => {
 // const wallet = ethers.Wallet.createRandom();
 // const key = wallet.privateKey;
	
 const rawdata = fs.readFileSync('./salt.json');
 const jsonData = JSON.parse(rawdata);
 const salt = jsonData.salt;

 const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
        config.paymaster.rpcUrl,
        config.paymaster.context
 );

  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    new ethers.Wallet(config.signingKey),
    config.rpcUrl,
    {
        paymasterMiddleware,
        entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
        factory: config.factory,
        salt: salt
    },
  );

  const crypto_wallet_address = simpleAccount.getSender();
  const crypto_wallet_salt = salt;

  const simpleAccount2 = await Presets.Builder.SimpleAccount.init(
	  new ethers.Wallet(config.signingKey),
	  config.rpcUrl,
	  {
	  	paymasterMiddleware,
		entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
		factory: config.factory,
		salt: salt+1
	  }
  );
  
  const saving_wallet_address = simpleAccount2.getSender();
  const saving_wallet_salt = salt+1

  jsonData.salt = salt + 2;

  const jsonString = JSON.stringify(jsonData);

  fs.writeFileSync('./salt.json', jsonString);

  res.json({'crypto_wallet_salt': salt, 'crypto_wallet_address': crypto_wallet_address, 'saving_wallet_address': saving_wallet_address, 'saving_wallet_salt': saving_wallet_salt});
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})

