'use client';

import React from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

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
                        <Image className="float-right" src='https://assets.coingecko.com/coins/images/325/standard/Tether.png' width={40} height={40} alt="" />
                        <span className="text-md font-semibold">Protocol: <a href="https://www.pendle.finance" target="_blank">Pendle Finance</a></span><a className="ml-1" data-tooltip-id="my-tooltip" data-tooltip-content="Tokenise yield bearing token"><FontAwesomeIcon icon={faCircleInfo}/></a>
                            <Tooltip id="my-tooltip" /><br/>
                        <div className="">
                            <span className="font-semibold text-md">Maturity:  27 Jun 2024 (239d)</span>
                        </div>
                        <div>
                            <span className="text-md font-semibold">Yield: </span>
                            <span className="text-green-500 text-md font-semibold">4.789% Fixed APY</span>
                        </div>
                        <div>
                            <span className="text-md font-semibold">Liquidity: </span>
                            <span className="text-md text-green-500 font-semibold">High </span>
                        </div>
                        <div>
                            <span className="text-md font-semibold">Risk: </span>
                            <span className="text-md text-green-500 font-semibold">Low </span>
                        </div>
                        {/* <div className="ml-3 border-l border-black h-[100px] border-2"></div> */}
                        <span className="font-semibold text-md">Underlying Asset: ibUSDT</span>
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
                        <Image className="float-right" src='https://assets.coingecko.com/coins/images/6319/standard/usdc.png' width={40} height={40} alt="" />
                        <span className="text-md font-semibold"><a href="https://goldfinch.finance/" target="_blank">Protocol: Gold Finch</a></span>
                        <a className="ml-1" data-tooltip-id="my-tooltip" data-tooltip-content="Lending moeny to business with collateral to get loan"><FontAwesomeIcon icon={faCircleInfo}/></a>
                            <Tooltip id="my-tooltip" /><br/>
                        <div className="">
                            <span className="font-semibold text-md">Maturity:  Open-ended</span>
                        </div>
                        <div>
                            <span className="text-md font-semibold">Yield: </span>
                            <span className="text-green-500 text-md font-semibold">7.41% Variable APY</span>
                        </div>
                        <div>
                            <span className="text-md font-semibold">Liquidity: </span>
                            <span className="text-md text-red-500 font-semibold">Low </span>
                        </div>
                        <div>
                            <span className="text-md font-semibold">Risk: </span>
                            <span className="text-md text-yellow-500 font-semibold">Medium </span>
                        </div>
                        {/* <div className="ml-3 border-l border-black h-[100px] border-2"></div> */}
                        <span className="font-semibold text-md">Underlying Asset: Private Credit</span>
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