'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { withdrawAave } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import erc20Abi from '@/assets/abis/erc20.abi.json';
import toast from 'react-hot-toast';
import ReactLoading from 'react-loading';
import { getAccount } from '@/lib/service';
import { supported, create, get } from "@github/webauthn-json";
import { nanoid } from "nanoid";

const WithdrawPage = () => {
    const router = useRouter();

    // const [token, setToken] = useState<string>('');
    const [account, setAccount] = useState<any>({});
    const [amount, setAmount] = useState<number>(0);
    const [savingWalletAddress, setSavingWalletAddress] = useState<string>('');
    const [usdCBalance, setUSDCBalance] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    function clean(str: any) {
        return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
      }
      
    function generateChallenge() {
        return clean(btoa(nanoid(32)));
    }

    const withdraw = async () => {
        const challenge = generateChallenge();

        try {
            const credential = await get({
                publicKey: {
                challenge,
                timeout: 60000,
                userVerification: "required",
                rpId: "aawallet-monorepo.vercel.app",
                },
            });

            if(credential?.response.signature.length > 0) {
                setLoading(true);
                const result = await withdrawAave(account, amount);
                toast.success(`Transaction hash: ${result}`);
                router.push('/wallet');
            } else {
                toast.error(`Try Again.`);
            }
        } catch(error : any) {
            console.error(error);
            toast.error(error?.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event : any) => {
        setAmount(event.target.value);
    };


      useEffect(() => {
        const getAccountData = async () => {
            try {
                const data = await getAccount();    

                let account = {
                    crypto_wallet_address:  data.crypto_wallet_address,
                    saving_wallet_address: data.saving_wallet_address,
                    invest_wallet_address: data.invest_wallet_address,
                    crypto_wallet_salt: data.crypto_wallet_salt,
                    saving_wallet_salt: data.saving_wallet_salt,
                    invest_wallet_salt: data.invest_wallet_salt
                };
                
                setAccount(account);
                setSavingWalletAddress(data.saving_wallet_address);
            } catch(error : any) {
                console.error(error);
                router.push('/login');
            }
        }
        // if(token.length > 0) {
          getAccountData();
        // }
      }, []);

      const aUSDCToken = '0x4086fabeE92a080002eeBA1220B9025a27a40A49';

      useEffect(() => {
        const getCryptoBalance = async () => {

            const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/737a357547e14224aa61a4b97d2754ef');
    
            const erc20USDC = new ethers.Contract(aUSDCToken, erc20Abi, provider);
            const [balanceUSDC, decimalsUSDC] = await Promise.all([
                erc20USDC.balanceOf(savingWalletAddress),
                erc20USDC.decimals(),
            ]);

            setUSDCBalance(balanceUSDC/10**decimalsUSDC);
            setLoading(false);
       };

        if(savingWalletAddress.length > 0) {
            getCryptoBalance();
        }

    }, [savingWalletAddress]);


    return (
        <div className="bg-gray-200 w-[600px]">
             { loading &&
                 <ReactLoading className="absolute top-1/3 left-1/3 md:left-1/2 z-50" type="spin" height={100} width={100} color="grey" />
            }
            <div className="bg-black text-center p-4">
                <span className="text-white inline-block float-left text-2xl font-semibold cursor-pointer" onClick={() => router.push('/wallet')}>{'<'}</span>
                <span className="text-white inline-block text-xl font-semibold">Withdraw</span>
            </div>
            <div className="p-6">
                <div className="bg-white p-4 rounded-md">
                    <span className="text-xl font-semibold mt-3 mb-3">From Crypto Wallet</span><br/>
                    <div className="mt-3 mb-3">
                        <span className="inline-block">Asset : </span>
                        <select className="inline-block border border-black p-1 ml-2 w-[120px]">
                            <option>
                                aUSDC
                            </option>
                        </select>
                    </div>
                    <div className="mt-3 mb-3">
                        <span className="inline-block">Avaliable : </span>
                        <span>{usdCBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="mt-3 mb-3">
                        <span className="inline-block">Amount : </span>
                        <input className="border-black border p-1 ml-2 w-[120px]" type="number" min="1" max={usdCBalance} value={amount} onChange={handleChange}></input>
                    </div>
                    <Button className="w-full p-2 mt-2" onClick={()=> withdraw()}>Withdraw to Crypto Wallet</Button>
                </div>
            </div>
        </div>
    )
}

export default WithdrawPage