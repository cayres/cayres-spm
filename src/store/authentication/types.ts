export type ApiResponse = Record<string, any>;

export const enum AuthenticationActionTypes {
    LOGIN_REQUEST = "LOGIN_REQUEST",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_ERROR = "LOGIN_ERROR",
}

export interface AuthenticationState {
    readonly loading: boolean;
    readonly token: string;
    readonly errors?: string;
}
