'use client';

import React from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const InvestPage = () => {
    const router = useRouter();

    return (
        <div className="bg-gray-200 w-[600px]">
                <div className="mt-3 mb-3 text-center">
                    <span className="text-2xl font-semibold">Invest</span>
                </div>
            <div className="p-6">
                <div>
                    <div className="text-black text-xl font-semibold">
                        Earn Fixed Yield
                    </div>
                    <div className="w-full bg-white rounded-xl p-6 mt-2">
                        <span className="text-md font-semibold">Protocol: Pendle Finance</span><br/>
                        <div>
                            <div className="">
                                <span className="font-semibold text-xl">Maturity</span>
                            </div>
                            <div>
                                27 Jun 2024 (239d)<br/>
                                <span className="text-green-500">4.789% Fixed APY</span>
                            </div>
                        </div>
                        {/* <div className="ml-3 border-l border-black h-[100px] border-2"></div> */}
                        <Image src='https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png' width={30} height={30} alt="" />
                        <span className="font-semibold">Underlying Asset: USDT</span>
                        <Button className="w-full" disabled>
                            Invest This
                        </Button>
                    </div>
                </div>
                <hr className="w-full border-black mt-4 mb-3"/>
                <div className="mb-10">
                    <div className="text-black text-xl font-semibold">
                        RWA
                    </div>
                    <div className="w-full bg-white rounded-xl p-6 mt-2">
                        <span className="text-md font-semibold">Protocol: Gold Finch</span><br/>
                        <div>
                            <div className="">
                                <span className="font-semibold text-xl">Maturity</span>
                            </div>
                            <div>
                                27 Jun 2024 (239d)<br/>
                                <span className="text-green-500">7.6% APY</span>
                            </div>
                        </div>
                        {/* <div className="ml-3 border-l border-black h-[100px] border-2"></div> */}
                        {/* <Image src='https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png' width={30} height={30} alt="" /> */}
                        <span className="font-semibold">Underlying Asset: Private Credit</span>
                        <Button className="w-full" disabled>
                            Invest This
                        </Button>
                    </div>
                </div>
            </div>
            {/* Bottom Navbar */}
            <NavBar path={'/invest'} />
        </div>
    )
}

export default InvestPage