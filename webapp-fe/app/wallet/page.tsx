'use client';

import { useState, useEffect, useCallback } from 'react';
import { TokenList } from '@/components/TokenList';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/NavBar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactLoading from 'react-loading';
import { ethers } from 'ethers';
import erc20Abi from '@/assets/abis/erc20.abi.json';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


type Wallet = {
    wallet_name: string;
    saving_wallet_address: string;
    crypto_wallet_address: string;
}

const WalletPage = () => {
    const router = useRouter();

    const [savingWalletAddress, setSavingWalletAddress] = useState<string>('');
    const [cryptoWalletAddress, setCryptoWalletAddress] = useState<string>('');
    const [savingBalance, setSavingBalance] = useState<number>(0);
    const [cryptoBalance, setCryptoBalance] = useState<number>(0);
    const [APY, setAPY] = useState<number>(0);
    const [token, setToken] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [tokenList, setTokenList] = useState<any[]>([]);

    const aUSDCToken = '0x4086fabeE92a080002eeBA1220B9025a27a40A49';
    const USDCToken = '0x52D800ca262522580CeBAD275395ca6e7598C014';
    const USDTToken = "0x1fdE0eCc619726f4cD597887C9F3b4c8740e19e2";
    const WETHToken = "0xc199807AF4fEDB02EE567Ed0FeB814A077de4802";

    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/737a357547e14224aa61a4b97d2754ef');

    useEffect(() => {
        const token = Cookies.get("hanko");
        if (token) {
            setToken(token);
        }
      }, []);
    
    useEffect(() => {
        const getSavingBalance = async () => {
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
            setAPY(2.5);
            setLoading(false);
        };

        const getCryptoBalance = async () => {
            try {
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

                setTokenList(tokenList);

                setCryptoBalance(totalBalance);
                setLoading2(false);
            } catch(error : any) {
                console.error(error);
                toast.error('Please wait 1-2 minute and refresh again. Exceed Coingecko API Limit');
            }
        };

        if(savingWalletAddress.length > 0) {
            getSavingBalance();
            getCryptoBalance();
        }

    }, [savingWalletAddress]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [token],
        queryFn: async () => {
          const response = await axios.get<Wallet>("/api/get-account", { headers: { Authorization: `Bearer ${token}` }});
          const data = response.data;

          setSavingWalletAddress(data.saving_wallet_address);
          setCryptoWalletAddress(data.crypto_wallet_address);

          return data;
        },
        retry: 1,
    });

    const error2: any = error;

    if(isError) {
        if(error2?.response?.data === "Not Found")
            router.push('/onboarding');
    }

    const onCopy = useCallback(() => {
        setCopied(true);
        toast.success('Copied to clipboard');
      }, [])

  return (
    <>
        <div className="bg-gray-200 w-[600px]">
            { (isLoading || loading || loading2) &&
                 <ReactLoading className="absolute top-1/3 left-1/3 md:left-1/2 z-50" type="spin" height={100} width={100} color="grey" />
            }
            <div className="px-4 py-1">
                <span className="float-right text-sm">on Mumbai Testnet</span>
            </div>
            <div className="p-6">
                {/* Wallet Card */}
                <div className="border border-neutral-500 mb-6 w-full rounded-xl bg-black min-h-[200px]">
                    <div className="p-5">
                        <div className="mb-3">
                            <div className="w-1/2 md:w-1/4 inline-block">
                                <span className="text-white text-md">
                                    Saving Account:
                                </span>  
                            </div>
                            <div className="w-1/2 md:w-3/4 inline-block">
                                {
                                isLoading ? (
                                    <Skeleton className="float-right" width={'75%'} count={1} />
                                    ) : (
                                    <>
                                    <span className="text-white text-md">{data?.wallet_name}</span>
                                    </>
                                )}
                                <CopyToClipboard onCopy={onCopy} text={savingWalletAddress}>
                                    <span className="text-white float-right text-xs cursor-pointer underline">Copy Wallet Address</span>
                                </CopyToClipboard>
                            </div>
                        </div>
                        <div>
                            <div className="w-1/2 md:w-1/4 inline-block">
                                <span className="text-white font-semibold text-2xl md:text-3xl">
                                    Balance:
                                </span>  
                            </div>
                            <div className="w-1/2 md:w-3/4 inline-block">
                                {
                                isLoading ? (
                                    <Skeleton className="float-right" width={'75%'} count={1} />
                                    ) : (
                                    <>
                                    <span className="text-white font-semibold text-2xl md:text-3xl">{savingBalance.toLocaleString(undefined, {minimumFractionDigits: 2})} USD</span>
                                    <br className="md:hidden" />
                                    <span className="hidden md:inline-block">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span className="text-green-500 text-xs md:text-base"> APY : {APY.toLocaleString(undefined, {minimumFractionDigits: 2})} %</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <span className="text-sm text-white">
                            *Not include crypto wallet balance (only aUSDC)
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 cursor-pointer">
                        <span className="text-black text-md inline-block p-4 w-1/2 text-center" onClick={() => router.push('/wallet/pay')}>
                            Pay
                        </span>
                        <span className="border-l border-black text-black text-md inline-block p-4 w-1/2 text-center" onClick={() => router.push('/wallet/withdraw')}>
                            Withdraw
                        </span>
                    </div>
                </div>
                <hr className="border-black border mb-4 w-full"/>
                {/* Wallet Card */}
                <div className="border border-neutral-500 mb-6 w-full p-5 rounded-xl bg-black min-h-[200px]">
                    <div className="mb-3">
                        <span className="text-white text-md">
                            Crypto Wallet
                        </span>
                        <CopyToClipboard onCopy={onCopy} text={cryptoWalletAddress}>
                            <span className="text-white float-right text-xs cursor-pointer underline">Copy Wallet Address</span>
                        </CopyToClipboard><br/>
                        <span className="mt-2 float-right">
                            <a href="https://app.aave.com/faucet/" target="_blank">
                                <span className="text-xs underline text-white">faucet</span>
                            </a>
                        </span>
                    </div>
                    <div>
                        <div className="w-1/2 md:w-1/4 inline-block">
                                <span className="text-white font-semibold text-2xl md:text-3xl">
                                    Balance:
                                </span>  
                        </div>
                        <div className="w-1/2 md:w-3/4 inline-block">
                            {
                            isLoading ? (
                                <Skeleton className="float-right" width={'75%'} count={1} />
                                ) : (
                                <>
                                <span className="text-white font-semibold text-2xl md:text-3xl">{cryptoBalance.toLocaleString(undefined, {minimumFractionDigits: 2})} USD</span>
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-white">
                            *Not include saving account balance (Show only some assets                             <a data-tooltip-id="my-tooltip" data-tooltip-content="MATIC, WETH, USDT, USDC"><FontAwesomeIcon icon={faCircleInfo}/></a>)
                            <Tooltip id="my-tooltip" />
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 cursor-pointer mt-10 text-center">
                        <span className="text-black text-md inline-block p-4 w-1/2 text-center mx-auto" onClick={() => router.push('/wallet/deposit')}>
                            Deposit to Saving Account
                        </span>
                    </div>
                </div>
                {/* Token Balance List */}
                { tokenList.length > 0 &&
                    <TokenList tokens={tokenList}/>
                }
            </div>
            <NavBar path={'/wallet'}/>
        </div>
    </>
  )
}

export default WalletPage