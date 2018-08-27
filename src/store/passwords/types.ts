export type ApiResponse = Record<string, any>;

export const enum PasswordActionTypes {
    ADD_INFO = "ADD_INFO",
    CHANGE_INFO = "CHANGE_INFO",
    REMOVE_INFO = "REMOVE_INFO",
    FETCH_LIST = "FETCH_LIST",
}

export interface SiteUserPassword {
    url: string;
    user: string;
    id: number;
    password: string;
}
