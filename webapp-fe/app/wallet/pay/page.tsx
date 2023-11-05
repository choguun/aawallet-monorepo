'use client';

import { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { PNG } from 'pngjs/browser';
import jsQR from 'jsqr';
import { Buffer } from 'buffer';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const WalletPayPage = () => {
    const [QRData, setQRData] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const webcamRef = useRef<Webcam>(null);

    const router = useRouter();

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot(); // add null check
        if (imageSrc) {
            const imageBuffer = Buffer.from(imageSrc.slice('data:image/png;base64,'.length), 'base64');
            const png = PNG.sync.read(imageBuffer);
            const imageData = jsQR(Uint8ClampedArray.from(png.data), png.width, png.height);
            if (imageData) {
                setQRData(imageData.data);
            }
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

  return (
    <div className="bg-gray-200 w-[600px]">
        <div className="bg-black text-center p-4">
            <span className="text-white inline-block float-left text-2xl font-semibold cursor-pointer" onClick={() => router.push('/wallet')}>{'<'}</span>
            <span className="text-white inline-block text-xl font-semibold">Pay</span>
        </div>
        <div className="p-6">
          <div className="mt-3">
            <Webcam
                audio={false}
                ref={webcamRef}
                style={{ width: '100%'}}
                screenshotFormat="image/png"
                screenshotQuality={0.85}
                videoConstraints={videoConstraints}
              >
              </Webcam>
          </div>
        </div>
        <div className="p-6">
          <Button className="w-full" onClick={()=> router.push('/wallet/receive')}>Show MY QR</Button>
        </div>
    </div>
  )
}

export default WalletPayPage