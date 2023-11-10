'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/NavBar';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Image from 'next/image';
import IconSavingAccount from '@/assets/icons/saving-account.svg';
import IconCrypto from '@/assets/icons/cryptocurrency.svg';
import IconInvestment from '@/assets/icons/investment.svg';
import { useQuery } from '@tanstack/react-query';
import { getAccount } from '@/lib/service';
import { ethers } from 'ethers';
import axios from 'axios';
import ReactLoading from 'react-loading';
import erc20Abi from '@/assets/abis/erc20.abi.json';
import toast from 'react-hot-toast';

ChartJS.register(...registerables);

const PortfolioPage = () => {
    const router = useRouter();
    const today = new Date();

    const [savingWalletAddress, setSavingWalletAddress] = useState<string>('');
    const [cryptoWalletAddress, setCryptoWalletAddress] = useState<string>('');
    const [investWalletAddress, setInvestWalletAddress] = useState<string>('');
    const [savingBalance, setSavingBalance] = useState<number>(0);
    const [cryptoBalance, setCryptoBalance] = useState<number>(0);
    const [investBalance, setInvestBalance] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const aUSDCToken = '0x4086fabeE92a080002eeBA1220B9025a27a40A49';
    const USDCToken = '0x52D800ca262522580CeBAD275395ca6e7598C014';
    const USDTToken = "0x1fdE0eCc619726f4cD597887C9F3b4c8740e19e2";
    const WETHToken = "0xc199807AF4fEDB02EE567Ed0FeB814A077de4802";
    const ptToken = '0xE8c886C4C737A867Da5f1E5D233c84f3B6938841';

    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/737a357547e14224aa61a4b97d2754ef');


    useEffect(() => {
        const getSavingBalance = async () => {
            setLoading(true);

            const erc20aUSDC = new ethers.Contract(aUSDCToken, erc20Abi, provider);
            const erc20USDC = new ethers.Contract(USDCToken, erc20Abi, provider);
            const [balanceaUSDC, decimalsaUSDC, balanceUSDC, decimalsUSDC] = await Promise.all([
                erc20aUSDC.balanceOf(savingWalletAddress),
                erc20aUSDC.decimals(),
                erc20USDC.balanceOf(savingWalletAddress),
                erc20USDC.decimals(),
            ]);

            const totalBalance = Number(balanceaUSDC/10**decimalsaUSDC) + Number(balanceUSDC/10**decimalsUSDC);
             
            setSavingBalance(totalBalance);
            setLoading(false);
        };

        const getCryptoBalance = async () => {
            try {
                setLoading(true);
                const priceData = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=matic-network%2Cethereum&vs_currencies=usd');
                const maticPrice = priceData.data['matic-network'].usd;
                const ethereumPrice = priceData.data.ethereum.usd;

                const balance = await provider.getBalance(cryptoWalletAddress);
                const wei = ethers.BigNumber.from(balance);
                const nativeTokenAmount = Number(ethers.utils.formatEther(wei));
                const nativeTokenBalance = nativeTokenAmount * maticPrice;
    
                const erc20USDC = new ethers.Contract(USDCToken, erc20Abi, provider);
                const erc20USDT = new ethers.Contract(USDTToken, erc20Abi, provider);
                const erc20WETH = new ethers.Contract(WETHToken, erc20Abi, provider);
                const [balanceUSDT, decimalsUSDT, balanceWETH, decimalsWETH, balanceUSDC, decimalsUSDC] = await Promise.all([
                    erc20USDT.balanceOf(cryptoWalletAddress),
                    erc20USDT.decimals(),
                    erc20WETH.balanceOf(cryptoWalletAddress),
                    erc20WETH.decimals(),
                    erc20USDC.balanceOf(cryptoWalletAddress),
                    erc20USDC.decimals(),
                ]);

                const totalBalance = Number(balanceUSDT/10**decimalsUSDT) + Number(balanceUSDC/10**decimalsUSDC) + Number(balanceWETH*ethereumPrice/10**decimalsWETH) + nativeTokenBalance;
                    
                let tokenList = [];

                tokenList.push({ name: "matic" , amount: nativeTokenAmount, balance: nativeTokenBalance, price: maticPrice, logo: 'https://assets.coingecko.com/coins/images/4713/standard/polygon.png' });
                tokenList.push({ name: "ethereum" , amount: balanceWETH/10**decimalsWETH, balance: balanceWETH*ethereumPrice/10**decimalsWETH, price: ethereumPrice, logo: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png' });
                tokenList.push({ name: "usdt" , amount: balanceUSDT/10**decimalsUSDT, balance: balanceUSDT/10**decimalsUSDT, price: 1, logo: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png' });
                tokenList.push({ name: "usdc" , amount: balanceUSDC/10**decimalsUSDC, balance: balanceUSDC/10**decimalsUSDC, price: 1, logo: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png' });


                setCryptoBalance(totalBalance);
                setLoading2(false);
            } catch(error : any) {
                console.error(error);
                toast.error('Please wait 1-2 minute and refresh again. Exceed Coingecko API Limit');
            } finally {
                setLoading(false);
            }
        };

        const getInvestBalance = async () => {
            setLoading(true);
            const erc20PTUSDT = new ethers.Contract(ptToken, erc20Abi, provider);

            const [balanceaPTUSDT, decimalsaPTUSDT] = await Promise.all([
                erc20PTUSDT.balanceOf(investWalletAddress),
                erc20PTUSDT.decimals()
            ]);

            const totalBalance = Number(balanceaPTUSDT/10**decimalsaPTUSDT);
            
            setInvestBalance(totalBalance);
            setLoading(false);
        };

        if(savingWalletAddress.length > 0) {
            getSavingBalance();
            getCryptoBalance();
            getInvestBalance();
        }

    }, [savingWalletAddress]);


    const chartData = {
        labels: ['Saving', 'Crypto', 'Invest'],
        datasets: [
          {
            label: 'Investment Ratio',
            data: [savingBalance, cryptoBalance, investBalance],
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };


    const { data, isLoading, isError, error } = useQuery({
        queryKey: [savingWalletAddress],
        queryFn: async () => {
          const data = await getAccount();

          setSavingWalletAddress(data.saving_wallet_address);
          setCryptoWalletAddress(data.crypto_wallet_address);
          setInvestWalletAddress(data.invest_wallet_address);

          return data;
        },
        retry: 2,
    });

    return (
        <div className="bg-gray-200 h-screen min-h-fint w-[600px]">
             { (isLoading || loading || loading2) &&
                 <ReactLoading className="absolute top-1/3 left-1/3 md:left-1/2 z-50" type="spin" height={100} width={100} color="grey" />
            }
              <div className="bg-gray-200">
                    <div className="bg-black text-center p-4">
                            <span className="text-white inline-block text-xl font-semibold">Portfolios</span>
                    </div>
                    <div className="w-[300px] mt-5 justify-center text-center mx-auto">
                        <Doughnut
                            data={chartData}
                            width={1}
                            height={1}
                        />
                        <div className="text-center mt-5">
                            <span className="text-xl font-semibold">Total value</span><br/>
                            <span className="text-2xl font-semibold">{(savingBalance+cryptoBalance+investBalance).toLocaleString(undefined, {minimumFractionDigits: 2})} USD</span>
                        </div>
                        <div>
                            <div className="inline-block mt-3">
                                <span>{(savingBalance*100/(savingBalance+cryptoBalance+investBalance)).toFixed(2)}%</span><br/>
                                <span className="font-semibold">Saving</span>
                            </div>
                            <div className="inline-block ml-5">
                                <span>{(cryptoBalance*100/(savingBalance+cryptoBalance+investBalance)).toFixed(2)}%</span><br/>
                                <span className="font-semibold">Crypto</span>
                            </div>
                            <div className="inline-block ml-5">
                                <span>{(investBalance*100/(savingBalance+cryptoBalance+investBalance)).toFixed(2)}%</span><br/>
                                <span className="font-semibold">Invest</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span>Updated at: {today.toLocaleString('en-US', {timeZone: 'Asia/Bangkok'})}</span>
                        </div>
                    </div>
                    <div className="w-full mt-3">
                    <hr className="border-gray-500 border h-full px-4" />
                        <div className="w-full p-2 px-6 border-b border-gray-200">
                            <span className="float-left font-semibold">Total Value</span>
                            <span className="float-right font-semibold">{(savingBalance+cryptoBalance+investBalance).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div><br/>
                        <div className="w-full p-2 px-6">
                            <div className="float-left inline-block">
                                <Image className="inline-block" src={IconSavingAccount} width={20} height={20} alt=""/>
                                <span className="ml-1">Saving</span>
                            </div>
                            <span className="float-right inline-block">{savingBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div><br/>
                        <div className="w-full p-2 px-6">
                            <div className="float-left inline-block">
                                <Image className="inline-block" src={IconCrypto} width={20} height={20} alt=""/>
                                <span className="ml-1">Crypto</span>
                            </div>
                            <span className="float-right">{cryptoBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div><br/>
                        <div className="w-full p-2 px-6">
                        <div className="float-left inline-block">
                                <Image className="inline-block" src={IconInvestment} width={20} height={20} alt=""/>
                                <span className="ml-1">Invest</span>
                            </div>
                            <span className="float-right">{investBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div>
                    </div>
                </div>
            {/* Bottom Navbar */}
            <NavBar path={'/portfolio'} />
        </div>
    )
}

export default PortfolioPage