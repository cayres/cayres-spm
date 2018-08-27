import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store";
import { API_URI } from "./constants";
import RNSecureKeyStore from "react-native-secure-key-store";

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
