import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

function createConfig(token){
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

function getBalance(token) {
    const promise = axios.get(`${BASE_URL}/balance`, createConfig(token));
    return promise;

}

function newTransaction(token, body) {
    const promise = axios.post(`${BASE_URL}/transactions`, body, createConfig(token));
    return promise;
}

const apiTransactions = { getBalance, newTransaction }

export default apiTransactions;