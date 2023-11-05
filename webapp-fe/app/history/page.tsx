'use client';

import React from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/NavBar';

const HistoryPage = () => {
    const router = useRouter();

    return (
        <div className="bg-gray-200 w-[600px]">
            <div className="mt-3 mb-3 text-center">
                <span className="text-2xl font-semibold">History</span>
            </div>
            <div className="p-6">
                <span className="text-xl font-semibold">Saving Account Wallet</span><br/>
                <span className="underline mb-5"><a href="https://mumbai.polygonscan.com/address/0xC89382FDDADebde2a28c17ab94BE5Cc04eF07766" target="_blank">Explorer</a></span><br/><br/>
                <span className="text-xl font-semibold mt-5">Crypto Wallet</span><br/>
                <span className="underline"><a href="https://mumbai.polygonscan.com/address/0x0Cb0eb853B521e94Be0d9D18A1B4C432fee13aD3" target="_blank">Explorer</a></span>
            </div>
            {/* Bottom Navbar */}
            <NavBar path={'/history'} />
        </div>
    )
}

export default HistoryPage