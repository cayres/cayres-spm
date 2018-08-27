import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// @ts-ignore
import RNSecureKeyStore from "react-native-secure-key-store";
import store from "../store";
import { SiteUserPassword } from "../store/passwords";
import { API_URI } from "./constants";

type SuccessCallback = (response: AxiosResponse) => void;

type ErrorCallback = (error: AxiosError) => void;

export async function httpRequest(request: AxiosRequestConfig, onSuccess: SuccessCallback, onErr: ErrorCallback) {
    request.url = `${API_URI}${request.url}`;
    request.headers = request.headers || {};
    request.headers["Content-Type"] = "application/json";

    const token = store.getState().authentication.token;

    if (token) request.headers["Authorization"] = token;

    try {
        const response = await axios(request);
        onSuccess(response);
    } catch (error) {
        onErr(error);
    }
}

export const getSecurityPasswordList = async () => {
    const email = store.getState().authentication.email;
    try {
        console.log("TESTE");
        const value = await RNSecureKeyStore.get(`${email}passwordList`);
        return JSON.parse(value);
    } catch (error) {
        return [];
    }
};

export const setSecurityPasswordList = (value: SiteUserPassword[], email: string) => {
    const resp = RNSecureKeyStore.set(`${email}passwordList`, JSON.stringify(value));
    return;
};
