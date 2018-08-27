import _ from "lodash";
import { Reducer } from "redux";
import { setSecurityPasswordList } from "../../util";
import { PasswordActionTypes, SiteUserPassword } from "./types";

const reducer: Reducer<SiteUserPassword[]> = ( state = [], action) => {
    let data = _.cloneDeep(state) as SiteUserPassword[];
    switch (action.type) {
        case PasswordActionTypes.FETCH_LIST:
            return action.payload;
        case PasswordActionTypes.ADD_INFO:
            data.push(action.payload);
            setSecurityPasswordList(data, action.payload.email);
            return data;
        case PasswordActionTypes.CHANGE_INFO:
            const {index, ...value} = action.payload;
            data.splice(index, 1, value);
            setSecurityPasswordList(data, action.payload.email);
            return data;
        case PasswordActionTypes.REMOVE_INFO:
            const { id } = action.payload;
            data = data.filter((item) => {
                return item.id !== id;
            });
            setSecurityPasswordList(data, action.payload.email);
            return data;
        default:
            return state;
    }
};

export {reducer as PasswordListReducer};
