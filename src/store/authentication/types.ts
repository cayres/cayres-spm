export type ApiResponse = Record<string, any>;

export const enum AuthenticationActionTypes {
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_ERROR = "LOGIN_ERROR",
}

export interface AuthenticationState {
    readonly token: string;
    readonly errors?: string;
    readonly email: string;
}
