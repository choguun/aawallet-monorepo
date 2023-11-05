'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const NavBar = (props : any) => {
    const { path } = props;
    return (
        <>
            {/* Bottom Navbar */}
            <div className="w-full md:w-[600px] bg-white fixed bottom-0 cursor-pointer">
                <Link href={'/wallet'}>
                    <div className={twMerge('p-3 border border-black inline-block w-1/4 text-center',  path === '/wallet' ? 'bg-black text-white' : 'bg-white text-black')}>
                        <span>Wallet</span>
                    </div>
                </Link>
                <Link href={'/invest'}>
                    <div className={twMerge('p-3 border border-black inline-block w-1/4 text-center',  path === '/invest' ? 'bg-black text-white' : 'bg-white text-black')}>
                        <span>Invest</span>
                    </div>
                </Link>
                <Link href={'/history'}>
                    <div className={twMerge('p-3 border border-black inline-block w-1/4 text-center',  path === '/history' ? 'bg-black text-white' : 'bg-white text-black')}>
                        <span>History</span>
                    </div>
                </Link>
                <Link href={'/account'}>
                    <div className={twMerge('p-3 border border-black inline-block w-1/4 text-center',  path === '/account' ? 'bg-black text-white' : 'bg-white text-black')}>
                        <span>Account</span>
                    </div>
                </Link>
            </div>
        </>
    )
};