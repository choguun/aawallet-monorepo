'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { Hanko } from '@teamhanko/hanko-elements';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createAccount, updateAccount } from '@/lib/service';
import toast from 'react-hot-toast';
import { NavBar } from '@/components/NavBar';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

import { LogoutBtn } from '@/components/LogoutButton';

const schema = yup
.object({
  uid: yup.string().required(),
  email: yup.string().required(),
  account_name: yup.string().required(),
  pin: yup.number().positive().integer().required(),
  confirm_pin: yup.number().positive().integer().required(),
})
.required();

type Profile = {
    uid: string;
    email: string;
    wallet_name: string;
    pin: number;
    confirm_pin: number;
}

const AccountPage = () => {
    const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL!;
    const hanko = new Hanko(hankoApi);

    const [Email, setEmail] = useState<string>('');
    const [Uid, setUid] = useState<string>('');
    const [token, setToken] = useState<string>('');

    const {
        register,
        handleSubmit,
        setValue
      } = useForm({
        resolver: yupResolver(schema)
      });

    const router = useRouter();

    const onSubmit: SubmitHandler<any> = async (data : any) => {
        try {
            await updateAccount(data, token);
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
            console.log(`user-id: ${id}, email: ${email}`);
        
            setEmail(email);
            setUid(id);
            setValue('uid', id);
            setValue('email', email);
        };

        getAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { data, isLoading } = useQuery({
        queryKey: [token],
        queryFn: async () => {
          const response = await axios.get<Profile>("/api/get-account", {headers: { Authorization: `Bearer ${token}`  }});
          return response.data;
        }
    });

    return (
        <div>
            <div className="bg-gray-200 min-h-screen w-[600px] p-6">
                <div className="mb-3 text-center">
                    <span className="text-2xl font-semibold">Account Profile</span>
                </div>
                {
                isLoading ? (
                    <Skeleton count={8} />
                    ) : (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                <input className="w-full rounded-md border border-black p-1" value={data?.wallet_name} disabled></input>
                            </div>
                            <div className="mt-3">
                                <span className="font-semibold">PIN: </span>
                                <input className="w-full rounded-md border border-black p-1" type="password" maxLength={6} value={data?.pin} disabled></input>
                            </div>
                            <div className="mt-3">
                                <span className="font-semibold">Confirm PIN: </span>
                                <input className="w-full rounded-md border border-black p-1" type="password" maxLength={6} value={data?.confirm_pin} disabled></input>
                            </div>
                            <div className="mt-3">
                                <Button className="w-full" type="submit" disabled>Update Profile</Button>
                            </div>
                            <div className="mt-3">
                                <div className="bg-red-500 text-center w-full py-2 rounded-sm">
                                    <LogoutBtn/>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
            {/* Bottom Navbar */}
            <NavBar path={'/account'} />
         </div>
    )
}

export default AccountPage