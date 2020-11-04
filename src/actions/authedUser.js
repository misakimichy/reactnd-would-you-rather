export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const SIGN_OUT = 'SIGN_OUT';

export const setAuthedUser = (id) => {
  return {
    type: SET_AUTHED_USER,
    id,
  };
};

export const signOut = (id) => {
  return {
    type: SIGN_OUT,
    id,
  };
};
