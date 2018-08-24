import { AuthenticationAction } from "../actions/authenticationAction";
import { LOGIN_SUCCESS } from "../constants";
import { IAuthenticationState } from "../types";

export function authentication(state: IAuthenticationState, action: AuthenticationAction): IAuthenticationState {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return state;
        default:
            return state;
    }
}
