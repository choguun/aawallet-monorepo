'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { Hanko } from '@teamhanko/hanko-elements';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createAccount } from '@/lib/service';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import ReactLoading from 'react-loading';


const schema = yup
.object({
  uid: yup.string().required(),
  email: yup.string().required(),
  wallet_name: yup.string().required()
})
.required();

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL!;

const OnboardingPage = () => {
    const router = useRouter();
    const hanko = new Hanko(hankoApi);

    const [token, setToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState
      } = useForm({
        resolver: yupResolver(schema)
      });

      const { isSubmitting } = formState;

    const onSubmit: SubmitHandler<any> = async (data : any) => {
        try {
            await createAccount(data, token);
            router.push(`/wallet`);
        } catch(error : any) {
            console.error(error);
            toast.error(error?.response?.data);
        }
    }
   
    useEffect(() => {
        const token = Cookies.get("hanko");
        if (token) {
            setToken(token);
        }
    }, []);
   
    useEffect(() => { 
        const getAccount = async () => {
            const {id, email} = await hanko.user.getCurrent();
            // console.log(`user-id: ${id}, email: ${email}`);
        
            setValue('uid', id);
            setValue('email', email);
            setIsLoading(false);
        };
        try {
            getAccount();
        } catch(error : any) {
            router.push('/login');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-gray-200 w-[600px] p-6">
             { (isLoading || isSubmitting) &&
                <ReactLoading className="absolute top-1/3 left-1/3 z-50" type="spin" height={100} width={100} color="grey" />
            }
            <div className="mb-3 text-center">
                <span className="text-2xl font-semibold">Create Account</span>
            </div>
             <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <span className="font-semibold">UID: </span>
                        <input className="w-full rounded-md border border-black p-1" {...register("uid", { required: true })} disabled></input>
                    </div>
                    <div className="mt-3">
                        <span className="font-semibold">Email: </span>
                        <input className="w-full rounded-md border border-black p-1" {...register("email", { required: true })} disabled></input>
                    </div>
                    <div className="mt-3">
                        <span className="font-semibold">Account Name: </span>
                        <input className="w-full rounded-md border border-black p-1" {...register("wallet_name", { required: true })}></input>
                    </div>
                    <div className="mt-3">
                        <span className="font-semibold">PIN: </span>
                        <input className="w-full rounded-md border border-black p-1" type="password" maxLength={6}></input>
                    </div>
                    <div className="mt-3">
                        <span className="font-semibold">Confirm PIN: </span>
                        <input className="w-full rounded-md border border-black p-1" type="password" maxLength={6}></input>
                    </div>
                    <div className="mt-3">
                        <Button className="w-full" type="submit" onClick={()=> onSubmit} disabled={token.length === 0}>Create Account</Button>
                    </div>
                </div>
             </form>
        </div>
    )
}

export default OnboardingPage