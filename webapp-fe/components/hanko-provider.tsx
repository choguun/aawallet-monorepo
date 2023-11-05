'use client';

import { Hanko } from '@teamhanko/hanko-elements';

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL!;

export async function useHakoProfile() {
    const hanko = new Hanko(hankoApi);
    const {id, email} = await hanko.user.getCurrent();

    return {id, email};
};