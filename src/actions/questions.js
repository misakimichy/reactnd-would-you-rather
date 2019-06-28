import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { saveQuestion } from '../utils/api';

export const ADD_QUESTION = 'ADD_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

function addQuestion(question) {
    return{
        type: ADD_QUESTION,
        question,
   }
}

export function handleAddQuestion (optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());

        const questionInfo = {
            author: authedUser,
            optionOne,
            optionTwo
        }

        return saveQuestion(questionInfo)
            .then(question => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    };
}

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}