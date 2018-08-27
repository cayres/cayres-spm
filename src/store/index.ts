import { createStackNavigator } from "react-navigation";
import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { AuthenticationReducer, AuthenticationState } from "./authentication";
import { PasswordListReducer, SiteUserPassword } from "./passwords";

export interface ApplicationState {
    authentication: AuthenticationState;
    passwords: SiteUserPassword[];
}

export const rootReducer = combineReducers<ApplicationState>({
    authentication: AuthenticationReducer,
    passwords: PasswordListReducer,
});

const store = createStore(rootReducer);

export default store;
