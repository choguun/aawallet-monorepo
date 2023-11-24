'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import QRCode from 'react-qr-code';
import ReactLoading from 'react-loading';
import { getAccount } from '@/lib/service';

type Wallet = {
    wallet_name: string;
    saving_wallet_address: string;
}

const WalletReceivePage = () => {
    const [walletAddress, setWalletAddress] = useState('0x0000000000000000000000000000000000000000');
    // const [token, setToken] = useState<string>('');

    // useEffect(() => {
    //     const token = Cookies.get("hanko");
    //     if (token) {
    //         setToken(token);
    //     }
    //   }, []);

    const { data, isLoading, isError } = useQuery({
        queryKey: [walletAddress],
        queryFn: async () => {
          const data = await getAccount();
          setWalletAddress(data.saving_wallet_address);

          return data;
        },
        retry: 1,
    });

    const router = useRouter();

    return (
        <div className="bg-gray-200 w-screen md:w-[600px]">
            { isLoading &&
                 <ReactLoading className="absolute top-1/3 md:top-1/2 left-1/3 md:left-1/2 z-50" type="spin" height={100} width={100} color="grey" />
            }
            { !isLoading &&
                <div>
                    <div className="bg-black text-center p-4">
                        <span className="text-white inline-block float-left text-2xl font-semibold cursor-pointer" onClick={() => router.push('/wallet')}>{'<'}</span>
                        <span className="text-white inline-block text-xl font-semibold">Receive</span>
                    </div>
                    <div className="p-6">
                        <div className="mt-3">
                            <QRCode className="w-full mx-auto" value={walletAddress} />
                        </div>
                        <div className="mt-3 text-center text-xl">
                            <p className="break-words">{walletAddress}</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default WalletReceivePage