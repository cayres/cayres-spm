import { Reducer } from "redux";
import { AuthenticationActionTypes, AuthenticationState } from "./types";

const INITITAL_STATE: AuthenticationState = {
    token: "",
    email: "",
    errors: undefined,
};

const reducer: Reducer<AuthenticationState> = ( state = INITITAL_STATE, action) => {
    console.log("########## REDUCER ##########");
    console.log(action.type);
    console.log(action.payload);
    console.log("########## REDUCER ##########");
    switch (action.type) {
        case AuthenticationActionTypes.LOGIN_SUCCESS:
            const {token, email} = action.payload;
            return {...state, token, email, errors: ""};
        case AuthenticationActionTypes.LOGIN_ERROR:
            return {...INITITAL_STATE, errors: action.payload};
        default:
            return state;
    }
};

export {reducer as AuthenticationReducer};
