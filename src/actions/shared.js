import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { getInitialData } from '../utils/api';

export default function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());

    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
      dispatch(hideLoading());
    });
  };
}
