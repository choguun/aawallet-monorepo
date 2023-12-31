'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/NavBar';
import { getAccount } from '@/lib/service';
import { ethers } from 'ethers';
import ReactLoading from 'react-loading';
import toast from 'react-hot-toast';
import { swap } from '@/lib/store';
import { nanoid } from "nanoid";
import { get } from "@github/webauthn-json";
import { Button } from '@/components/ui/button';

const SwapPage = () => {
    const router = useRouter();

    const [account, setAccount] = useState<any>({});
    const [token1, setToken1] = useState<string>('');
    const [token2, setToken2] = useState<string>('');
    const [amount1, setAmount1] = useState<string>('');
    const [amount2, setAmount2] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/737a357547e14224aa61a4b97d2754ef');

    function clean(str: any) {
        return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }

    function generateChallenge() {
        return clean(btoa(nanoid(32)));
    }

    const handleSwap = async () => {
        console.log('handleSwap')
        const challenge = generateChallenge();

        try {
            const credential = await get({
                publicKey: {
                challenge,
                timeout: 60000,
                userVerification: "required",
                rpId: process.env.NEXT_PUBLIC_DOMAIN!,
                },
            });

            if(credential?.response.signature.length > 0) {
                setIsLoading(true);
                const result = await swap(account, token1, amount1, token2, amount2);
                toast.success(`Transaction hash: ${result}`);
                router.push('/wallet');
            } else {
                toast.error(`Try Again.`);
            }

        } catch(error : any) {
            console.error(error);
            toast.error(error?.response?.data);
        } finally {
            setIsLoading(false);
        }
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
            } catch(error : any) {
                console.error(error);
                router.push('/login');
            }
        }
        //if(token.length > 0) {
            getAccountData();
        //}
      }, [])

    return (
        <div className="bg-gray-200 h-screen min-h-fint w-[600px]">
             { (isLoading) &&
                 <ReactLoading className="absolute top-1/3 left-1/3 md:left-1/2 z-50" type="spin" height={100} width={100} color="grey" />
            }
                <div className="bg-gray-200">
                    <div className="bg-black text-center p-4">
                            <span className="text-white inline-block text-xl font-semibold">Swap</span>
                    </div>
                    <div className="w-full mt-3">
                    <div className="container mx-auto max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Swap Tokens</h1>

      {/* <input
        placeholder="Input Token Address"
        value={token1}
        onChange={(e) => setToken1(e.target.value)}
        className="mb-2 w-full"
      /> */}
{/* 
    const USDCToken = '0x52D800ca262522580CeBAD275395ca6e7598C014';
    const USDTToken = "0x1fdE0eCc619726f4cD597887C9F3b4c8740e19e2";
    const WETHToken = "0xc199807AF4fEDB02EE567Ed0FeB814A077de4802";
*/}
<span>From: </span>
        <select className="w-full p-1" value={token1} onChange={(e) => setToken1(e.target.value)}>
            <option value="">Select Token 1</option>
            <option value="0x52D800ca262522580CeBAD275395ca6e7598C014">USDC</option>
            <option value="0x1fdE0eCc619726f4cD597887C9F3b4c8740e19e2">USDT</option>
            <option value="0xc199807AF4fEDB02EE567Ed0FeB814A077de4802">WETH</option>
            {/* <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option> */}
        </select>

        <input
        placeholder="Amount In"
        type="number"
        value={amount1}
        onChange={(e) => setAmount1(e.target.value)}
        className="mb-2 w-full mt-2 border border-black p-1"
      />

     <div className="mt-5"></div>
     <span>To: </span>
<select className="w-full p-1" value={token2} onChange={(e) => setToken2(e.target.value)}>
            <option value="">Select Token 2</option>
            <option value="0x52D800ca262522580CeBAD275395ca6e7598C014">USDC</option>
            <option value="0x1fdE0eCc619726f4cD597887C9F3b4c8740e19e2">USDT</option>
            <option value="0xc199807AF4fEDB02EE567Ed0FeB814A077de4802">WETH</option>
            {/* <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option> */}
        </select>


        <input
        placeholder="Amount Out"
        type="number"
        value={amount2}
        onChange={(e) => setAmount2(e.target.value)}
        className="mb-2 w-full mt-2 border border-black p-1"
      />

      <Button
        onClick={handleSwap}
        className="w-full"
      >
        Swap
      </Button>

      {/* {receipt && (
        <Text>Swap transaction successful: {receipt.transactionHash}</Text>
      )} */}
    </div>
                    </div>
                </div>
            {/* Bottom Navbar */}
            <NavBar path={'/swap'} />
        </div>
    )
}

export default SwapPage