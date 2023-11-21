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

const SwapPage = () => {
    const router = useRouter();
    const today = new Date();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
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
                setLoading(true);
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
            setLoading(false);
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
             { (isLoading || loading || loading2) &&
                 <ReactLoading className="absolute top-1/3 left-1/3 md:left-1/2 z-50" type="spin" height={100} width={100} color="grey" />
            }
                <div className="bg-gray-200">
                    <div className="bg-black text-center p-4">
                            <span className="text-white inline-block text-xl font-semibold">Swap</span>
                    </div>
                    <div className="w-full mt-3">
                    <div className="container mx-auto max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Swap Tokens</h1>

      <input
        placeholder="Input Token Address"
        value={token1}
        onChange={(e) => setToken1(e.target.value)}
        className="mb-2"
      />

      <input
        placeholder="Output Token Address"
        value={token2}
        onChange={(e) => setToken2(e.target.value)}
        className="mb-2"
      />

      <input
        placeholder="Amount Out"
        type="number"
        value={amount2}
        onChange={(e) => setAmount2(e.target.value)}
        className="mb-2"
      />

      <input
        placeholder="Amount In Max"
        type="number"
        value={amount1}
        onChange={(e) => setAmount1(e.target.value)}
      />

      <button
        onClick={handleSwap}
        className="mt-2"
      >
        Swap
      </button>

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