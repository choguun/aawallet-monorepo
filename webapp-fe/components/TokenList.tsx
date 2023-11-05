'use client';

import Image from 'next/image';

export const TokenList = (props: any) => {
    const {tokens} = props;
    //console.log(tokens);
    return (
        <>
           <div>
                {tokens.map((token: any) => {
                    <div className="border-b border-bg-black">
                        <div className="inline-block">
                            <Image src={token.logo} width={30} height={30} alt="" />
                        </div>
                        <div className="inline-block ml-2">
                            <span className="text-black font-semibold text-xl">
                                {token.name}
                            </span><br/>
                            <span>
                                ${token.price}
                            </span>
                        </div>
                        <div className="inline-block float-right">
                            <span>${token.balance}</span><br/>
                            <span>{token.amount} {token.name}</span>
                        </div>
                    </div>
                })}
            </div> 
        </>
    )
};