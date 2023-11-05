import axios from 'axios';

export async function createAccount(data : any, token : any) {
    try {
        const result = await axios.post(`/api/create-account`, data,
            { headers: {'content-type': 'application/json', 'Authorization': `Bearer ${token}` } }
        );

        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function updateAccount(data: any, token : any) {
    try {
        const result = await axios.put(`/api/update-account`, data,
            { headers: {'content-type': 'application/json', 'Authorization': `Bearer ${token}` } }
        );

        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAccount(token : any) {
    try {
        const result = await axios.get(`/api/get-account`,
            { headers: {'content-type': 'application/json', 'Authorization': `Bearer ${token}` } }
        );

        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}