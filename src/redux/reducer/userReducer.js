
import { INCREMENT, DECREMENT } from '../action/counterAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        image: '',
        role: '',
        username: ''
    },
    isAuthenticated: false
    //người dùng đăng nhập chưa
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_USER_LOGIN_SUCCES':
            console.log("check action: ", action)
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    image: action?.payload?.DT?.image,
                    ROLE: action?.payload?.DT?.role,
                    username: action?.payload?.DT?.username
                },
                isAuthenticated: true
            };

        case DECREMENT:
            return {
                ...state, count: state.count - 1,
            };
        default: return state;
    }
};

export default userReducer;