import { getInitialData } from '../utils/api';
import { receiveQuestions} from '../actions/questions';
import { receiveUsers} from '../actions/users';
import { setAuthedUser } from '../actions/authedUser';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

// Todo: Add login screen and select user
const AUTHED_ID = 'sarah_edo';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())

        return getInitialData()
        .then(({ users, questions }) => {
            dispatch(receiveQuestions(questions))
            dispatch(receiveUsers(users))
            dispatch(setAuthedUser(AUTHED_ID))
            dispatch(hideLoading())
        })
    }
}
