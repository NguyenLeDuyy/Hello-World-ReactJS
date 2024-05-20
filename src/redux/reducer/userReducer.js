import { FETCH_USER_LOGIN_SUCCES, FETCH_USER_LOGOUT_SUCCES } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        image: '',
        role: '',
        username: '',
        email: ''
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCES:
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    image: action?.payload?.DT?.image,
                    ROLE: action?.payload?.DT?.role,
                    username: action?.payload?.DT?.username,
                    email: action?.payload?.DT?.email
                },
                isAuthenticated: true
            };

        case FETCH_USER_LOGOUT_SUCCES:
            return {
                ...state, account: {
                    access_token: '',
                    refresh_token: '',
                    image: '',
                    role: '',
                    username: '',
                    email: ''
                },
                isAuthenticated: false
            };
        default: return state;
    }
};

export default userReducer;