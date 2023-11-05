import axios from 'axios';
import Cookies from "js-cookie";
import { Hanko } from '@teamhanko/hanko-elements';

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL!;

export async function getHakoProfile() {
    const hanko = new Hanko(hankoApi);
    const {id, email} = await hanko.user.getCurrent();

    return {id, email};
}

export async function createAccount(data : any) {
    try {
        const result = await axios.post(`/api/create-account`, data,
            { headers: {'content-type': 'application/json', 'Authorization': `Bearer ${Cookies.get("hanko")}` } }
        );

        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function updateAccount(data: any) {
    try {
        const result = await axios.put(`/api/update-account`, data,
            { headers: {'content-type': 'application/json', 'Authorization': `Bearer ${Cookies.get("hanko")}` } }
        );

        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAccount() {
    try {
        const result = await axios.get(`/api/get-account`,
            { headers: {'content-type': 'application/json', 'Authorization': `Bearer ${Cookies.get("hanko")}` } }
        );

        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}