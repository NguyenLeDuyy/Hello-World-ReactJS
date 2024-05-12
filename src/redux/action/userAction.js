export const FETCH_USER_LOGIN_SUCCES = 'FETCH_USER_Thanh_CONG_OHYEAH';

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCES,
        payload: data
    }
}