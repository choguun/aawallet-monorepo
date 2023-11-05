'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/NavBar';
import { getAccount } from '@/lib/service';

const HistoryPage = () => {
    const router = useRouter();

    const [account, setAccount] = useState<any>({});
    const [savingWalletAddress, setSavingWalletAddress] = useState<string>('');
    const [cryptoWalletAddress, setCryptoWalletAddress] = useState<string>('');


    useEffect(() => {
        const getAccountData = async () => {
            try {
                const data = await getAccount();    

               let account = {
                    crypto_wallet_address :  data.crypto_wallet_address,
                    saving_wallet_address : data.saving_wallet_address,
                    crypto_wallet_salt : data.crypto_wallet_salt,
                    saving_wallet_salt : data.saving_wallet_salt,
                };
                
                setAccount(account);
                setSavingWalletAddress(data.saving_wallet_address);
                setCryptoWalletAddress(data.saving_wallet_address);
            } catch(error : any) {
                console.error(error);
                router.push('/login');
            }
        }
        // if(token.length > 0) {
          getAccountData();
        // }
      }, []);

    return (
        <div className="bg-gray-200 w-[600px]">
            <div className="mt-3 mb-3 text-center">
                <span className="text-2xl font-semibold">History</span>
            </div>
            <div className="p-6">
                <span className="text-xl font-semibold">Saving Account Wallet</span><br/>
                <span className="underline mb-5"><a href={`https://mumbai.polygonscan.com/address/${savingWalletAddress}`} target="_blank">Explorer</a></span><br/><br/>
                <span className="text-xl font-semibold mt-5">Crypto Wallet</span><br/>
                <span className="underline"><a href={`https://mumbai.polygonscan.com/address/${cryptoWalletAddress}`} target="_blank">Explorer</a></span>
            </div>
            {/* Bottom Navbar */}
            <NavBar path={'/history'} />
        </div>
    )
}

export default HistoryPage