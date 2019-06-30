import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export const ADD_QUESTION = 'ADD_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

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

function answerQuestion(authedUser, answer, qid) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        answer,
        qid,
    }
}

export function handleAnswerQuestion (answer, question) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());

        const answerInfo = {
            authedUser,
            answer,
            qid: question.id,
        };

        return saveQuestionAnswer (answerInfo)
        .then(question => dispatch(answerQuestion(authedUser, answer, question)))
        .then(() => dispatch(hideLoading()))
    };
}