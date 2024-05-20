export const FETCH_USER_LOGIN_SUCCES = 'FETCH_USER_Thanh_CONG_OHYEAH';
export const FETCH_USER_LOGOUT_SUCCES = 'FETCH_USER_LOGOUT_SUCCES';


export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCES,
        payload: data
    }
}

export const doLogout = () => {
    return {
        type: FETCH_USER_LOGOUT_SUCCES,
    }
}