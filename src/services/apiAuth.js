import axios from "axios";

const BASE_URL=process.env.REACT_APP_API_URL;

function signIn(body){
    const promise = axios.post(`${BASE_URL}/signin`, body);
    return promise;
}

function signUp(body){
    const promise = axios.post(`${BASE_URL}/signup`, body);
    return promise;
}

const apiAuth = { signIn, signUp };

export default apiAuth;