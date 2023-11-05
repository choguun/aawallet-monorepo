import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import LogoUnifyWallet from '@/assets/logos/unify-wallet.png';

const Index = () => {
  return (
    <div className="bg-gray-200 w-[600px]">
    <nav className="mb-3 p-4">
      <span className="text-black font-bold inline-block">
          Unify Wallet
      </span>
      <div className="float-right inline-block">
          <Link href={'/login'}>
            <Button>Sign in/ Sign up</Button>
          </Link>
      </div>
    </nav>
      <div className="p-6">
        <div className="mt-3">
          <Image className="mx-auto" src={LogoUnifyWallet} alt='' width={150} height={150} />
        </div>
        <div className="mt-5 text-center">
          <p>
            A smart wallet that utilizes ERC-4337 standard to increase User experience and onboard web2 users to web3. It has features like a savings account, investing within a single click(zap) to crypto’s interest-bearing token and daily use to pay merchants with a smart wallet. 
          </p>
          <br/>
          <Link href={'/login'}>
            <Button>Get Started</Button>
          </Link>
        </div>
        <div className="mt-8">
          <b className="text-xl">Features</b><br/>

        -Open Saving account wallet<br/>

        -Zap to invest<br/>

        -Pay to merchants<br/>

        -Show crypto balances<br/>

        -Gasless with Paymaster
        </div>
        <div className="mt-5">
        <b className="text-xl">Road Map</b><br/>
  <b> Phase 1</b><br/>
  -Integrate with AAVE(IbToken), Pendle Finance<br/>
  -Build Web App<br/>
  -EVM Multi Chain Support<br/>
  -Features: Passwordless authentication, Saving account wallet, Zap to invest, Pay to merchants and Gasless with Paymaster<br/><br/>
  <b> Phase 2</b><br/>
  -Build Mobile App<br/>
  -Integrate with more DeFi Protocol.<br/>
  -Add more features like portfolio, swap and NFT<br/>
  -On-ramp by credit cards<br/>
  -HSM(Hardware security module) to protect privatekey<br/><br/>
  <b>Phase 3</b><br/>
  -Unified USDC Gas Tank<br/>
  -Cross-chain Send<br/>
  -Integrate with RWA<br/>
        </div>
      </div>
      <footer className="bg-black">
        <div className="p-4">
          <div className="mt-3">
            <div className="text-center">
              <span className="text-white font-bold inline-block">
                  Unify Wallet
              </span>
            </div>
            <div className="mt-3 text-center">
              <span className="text-white font-bold inline-block">
                  © 2023 Unify Wallet<br/>
                  for only BANGKOK BUIDL 2023
              </span>
            </div>
            <div className="mt-3 text-center">
              <span className="text-white font-bold inline-block">
                  Want to invest contact: visaruth.s@gmail.com
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index