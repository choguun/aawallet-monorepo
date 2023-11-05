'use client';

import axios from 'axios';
import Cookies from "js-cookie";

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