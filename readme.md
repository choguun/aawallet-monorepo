
# Unify Wallet

A smart wallet that utilizes ERC-4337 standard to increase User experience and onboard web2 users to web3. It has features like a savings account, investing within a single click(zap) to crypto’s interest-bearing token and daily use to pay merchants with a smart wallet. 

## Project Structure

- webapp-fe
```
webapp-fe is frontend, It built with NextJS, Ethers, passkey and integrate with stackup infrastructure for erc4337
```
- smartcontract
```
smartcontract is contract in solidity, It contains of factory and account countract that use erc4337 standard
```
- keygen-api
```
keygen-api is api that is used for generate(init) smart contract wallet for user
```

## How to start project

#### webapp-fe

```
cd webapp-fe
cp .env.example .env
yarn
yarn run dev
```

#### smartcontract

```
cd smartcontract
cp .env.example .env
yarn
yarn run compile
yarn run deploy
```
#### keygen-api

```
cd keygen-api
yarn
yarn run dev
```
