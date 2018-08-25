import { createStackNavigator } from "react-navigation";
import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { AuthenticationReducer, AuthenticationState } from "./authentication";

export interface ApplicationState {
    authentication: AuthenticationState;
}

export const rootReducer = combineReducers<ApplicationState>({
    authentication: AuthenticationReducer,
});

const store = createStore(rootReducer);

export default store;
