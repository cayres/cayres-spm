
import { action } from "typesafe-actions";
import { AuthenticationActionTypes } from "./types";

export const loginSuccess = (token: string) =>
    action(AuthenticationActionTypes.LOGIN_SUCCESS, token);
export const loginError = (message: string) =>
    action(AuthenticationActionTypes.LOGIN_ERROR, message);
