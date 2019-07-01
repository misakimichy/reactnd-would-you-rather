import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_USERS = 'RECEIVE_USERS';

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function handleAddUser(username, name, avatarURL) {
    return (dispatch) => {
        dispatch(showLoading());
        return handleAddUser({
            username,
            name,
            avatarURL
        }).then (users => dispatch(receiveUsers(users)))
        .then(dispatch(hideLoading()))
    }
}