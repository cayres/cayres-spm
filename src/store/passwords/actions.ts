
import { action } from "typesafe-actions";
import { PasswordActionTypes, SiteUserPassword } from "./types";

export const addInfo = (info: SiteUserPassword, email: string) =>
    action(PasswordActionTypes.ADD_INFO, {...info, email});
export const changeInfo = (info: SiteUserPassword, index: number, email: string) =>
    action(PasswordActionTypes.CHANGE_INFO, {...info, index, email});
export const removeInfo = (id: number, email: string) =>
    action(PasswordActionTypes.REMOVE_INFO, {id, email});
export const fechList = (list: SiteUserPassword[]) =>
    action(PasswordActionTypes.FETCH_LIST, list);
