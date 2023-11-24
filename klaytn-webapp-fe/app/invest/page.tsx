'use client';

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { investPendle } from '@/lib/store';
import toast from 'react-hot-toast';
import { getAccount } from '@/lib/service';
import ReactLoading from 'react-loading';
import { ethers } from 'ethers';
import erc20Abi from '@/assets/abis/erc20.abi.json';
import Modal from 'react-modal';
import { supported, create, get } from "@github/webauthn-json";
import { nanoid } from "nanoid";

const customStyles = {
  content: {
    top: '50%',
    width: '80%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const showPNL = (pnl: any) => {
    if(pnl > 0) {
        return (
        <>
            <span className="text-green-500">+ {pnl.toLocaleString(undefined, {maximumFractionDigits: 2})}%</span>
        </>)
    } else if(pnl === 0) {
        return (
            <>
                <span className="text-black">-</span>
            </>)
    } else if(pnl < 0) {
        return (
            <>
                <span className="text-red-500">- {pnl.toLocaleString(undefined, {maximumFractionDigits: 2})}%</span>
            </>)
    }
};


const InvestPage = () => {
    const router = useRouter();

    const [account, setAccount] = useState<any>({});
    const [investWalletAddress, setInvestWalletAddress] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [investBalance, setInvestBalance] = useState<number>(0);
    const [PNL, setPNL] = useState<number>(0);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleChangeAmount = (e : any) => {
        setAmount(e.target.value);
    }

    function clean(str: any) {
        return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
      
    function generateChallenge() {
        return clean(btoa(nanoid(32)));
    }

    const invest = async () => {

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
                const result = await investPendle(account, amount);
                toast.success(`Transaction hash: ${result}`);
            } else {
                toast.error(`Try Again.`);
            }
            
            // router.refresh();
            location.reload();
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
                setLoading(false);
                setInvestWalletAddress(data.invest_wallet_address)
            } catch(error : any) {
                console.error(error);
                router.push('/login');
            }
        }
        //if(token.length > 0) {
            getAccountData();
        //}
    }, []);

    const ptToken = '0xE8c886C4C737A867Da5f1E5D233c84f3B6938841';

    useEffect(() => {
        const getInvestBalance = async () => {

            const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/737a357547e14224aa61a4b97d2754ef');

            const erc20USDC = new ethers.Contract(ptToken, erc20Abi, provider);
            const [balancePT, decimalsPT] = await Promise.all([
                erc20USDC.balanceOf(investWalletAddress),
                erc20USDC.decimals(),
            ]);

            setInvestBalance(balancePT/10**decimalsPT);
            setLoading(false);
        };

        if(investWalletAddress.length > 0) {
            getInvestBalance();
        }

    }, [investWalletAddress]);

    return (
        <div className="bg-gray-200 w-[600px]">
               { loading &&
                 <ReactLoading className="absolute top-1/3 left-1/3 md:left-1/2 z-50" type="spin" height={100} width={100} color="grey" />
            }
                <div className="bg-black text-center p-4">
                        <span className="text-white inline-block text-xl font-semibold">Invest</span>
                </div>
            <div className="p-6">
                <div>
                    <span className="xs:text-md text-xl font-semibold">Total Investment: {investBalance.toLocaleString(undefined, {maximumFractionDigits: 2})} USD</span><br/>
                    <span className="text-md font-semibold">PNL: {showPNL(PNL)}</span>
                </div>
                <hr className="w-full border-black mt-4 mb-3"/>
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
                        { investBalance > 0 && 
                            <><Button className="w-1/2" onClick={()=> openModal()}>
                                Invest More
                            </Button>
                            <Button className="w-1/2" disabled>
                                Redeem
                            </Button>
                        </>
                        }
                        { investBalance === 0 && 
                            <Button className="w-full" onClick={()=> openModal()}>
                                Invest This
                            </Button>
                        }
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Investment Plan Modal"
            >
                <button className="float-right mb-3" onClick={closeModal}>close</button>
                <div className="mt-10">
                    <span>Please input USDT amount to invest.</span>
                    <input className="w-full border border-black mb-3 p-1" placeholder='amount' value={amount} onChange={handleChangeAmount}/>
                    <Button className="w-full" onClick={()=> invest()}>Invest</Button>
                </div>
            </Modal>
            {/* Bottom Navbar */}
            <NavBar path={'/invest'} />
        </div>
    )
}

export default InvestPage