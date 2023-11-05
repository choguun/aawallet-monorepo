'use client';

import { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { Buffer } from 'buffer';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { transfer } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import erc20Abi from '@/assets/abis/erc20.abi.json';
import toast from 'react-hot-toast';
import ReactLoading from 'react-loading';
import { getAccount } from '@/lib/service';

const WalletPayPage = () => {
    const [account, setAccount] = useState<any>({});
    const [QRData, setQRData] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState(0);
    const [savingWalletAddress, setSavingWalletAddress] = useState<string>('');
    const [usdCBalance, setUSDCBalance] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const webcamRef = useRef<Webcam>(null);

    const router = useRouter();

    const transferTo = async () => {
      try {
        setLoading(true);
        const result = await transfer(account, amount, toAddress);
        toast.success(`Transaction hash: ${result}`);
        router.push('/wallet');
    } catch(error : any) {
        console.error(error);
        toast.error(error?.response?.data);
    } finally {
        setLoading(false);
    }
    };

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot(); // add null check
        if (imageSrc) {
            const imageBuffer = Buffer.from(imageSrc.slice('data:image/png;base64,'.length), 'base64');
            // const png = PNG.sync.read(imageBuffer);
            // const imageData = jsQR(Uint8ClampedArray.from(png.data), png.width, png.height);
            // if (imageData) {
            //     setQRData(imageData.data);
            // }
        }
    };

    const validateQRData = (data : any) => {
        if(data[0] !== '0' && data[1] !== 'x') {
          return false;
        }
  
        return true;
    };

    const videoConstraints = {
      facingMode: "environment"
    };
    
    useEffect(() => {
      const intervalId = setInterval(capture, 100); // Check for QR code every 100ms
      return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (QRData !== '' && validateQRData(QRData)) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [QRData]);

    const handleInputtoAddress = (event : any) => {
      setToAddress(event.target.value);
    };

    const handleInputAmount = (event: any) => {
      setAmount(event.target.value);
    };

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
          } catch(error : any) {
              console.error(error);
              router.push('/login');
          }
      }
      // if(token.length > 0) {
        getAccountData();
      // }
    }, [])

    const aUSDCToken = '0x4086fabeE92a080002eeBA1220B9025a27a40A49';

    useEffect(() => {
      const getCryptoBalance = async () => {

          const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/737a357547e14224aa61a4b97d2754ef');
  
          const erc20USDC = new ethers.Contract(aUSDCToken, erc20Abi, provider);
          const [balanceUSDC, decimalsUSDC] = await Promise.all([
              erc20USDC.balanceOf(savingWalletAddress),
              erc20USDC.decimals(),
          ]);

          setUSDCBalance(balanceUSDC/10**decimalsUSDC);
          setLoading(false);
     };

      if(savingWalletAddress.length > 0) {
          getCryptoBalance();
      }

  }, [savingWalletAddress]);

  return (
    <div className="bg-gray-200 w-[600px]">
         { loading &&
                 <ReactLoading className="absolute top-1/3 left-1/3 md:left-1/2 z-50" type="spin" height={100} width={100} color="grey" />
            }
        <div className="bg-black text-center p-4">
            <span className="text-white inline-block float-left text-2xl font-semibold cursor-pointer" onClick={() => router.push('/wallet')}>{'<'}</span>
            <span className="text-white inline-block text-xl font-semibold">Pay</span>
        </div>
        <div className="p-6">
          <div className="mt-3">
            {/* <Webcam
                audio={false}
                ref={webcamRef}
                style={{ width: '100%'}}
                screenshotFormat="image/png"
                screenshotQuality={0.85}
                videoConstraints={videoConstraints}
              >
              </Webcam> */}
              <span>Avaliable Balance:</span>
              <span>{usdCBalance}</span>
              <input placeholder="address" type="text" value={toAddress} onChange={handleInputtoAddress} className="w-full border border-black mt-2 p-1"></input>
              <input placeholder="amount" type="number" value={amount} onChange={handleInputAmount} className="w-full border border-black mt-2 p-1"></input>
              <Button className="w-full mt-3" onClick={() => transferTo()}>Pay/ Transfer</Button>
          </div>
        </div>
        <div className="p-6 bottom-0">
          <Button className="w-full" onClick={()=> router.push('/wallet/receive')}>Show MY QR</Button>
        </div>
    </div>
  )
}

export default WalletPayPage