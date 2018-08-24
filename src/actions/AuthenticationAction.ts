import * as constants from "../constants";

import { ILoginState } from "../screens/LoginScreen";
import { IRegisterState } from "../screens/RegisterScreen";

export interface ILoginSuccess {
    type: constants.LOGIN_SUCCESS;
    payload: string;
}

export type AuthenticationAction = ILoginSuccess;

export function login(data: ILoginState): ILoginSuccess {
    return {
        type: constants.LOGIN_SUCCESS,
        payload: "5ce9e3de-34a6-4d60-8bf7-f8fd5809ac3a",
    };
}

export function register(data: IRegisterState): ILoginSuccess {
    return {
        type: constants.LOGIN_SUCCESS,
        payload: "5ce9e3de-34a6-4d60-8bf7-f8fd5809ac3a",
    };
}
