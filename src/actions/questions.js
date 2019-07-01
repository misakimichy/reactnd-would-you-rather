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

export function handleAddQuestion (question) {
    return (dispatch) => {
        dispatch(showLoading());
        return saveQuestion(question)
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

function answerQuestion(questionAnswer) {
    return {
        type: ANSWER_QUESTION,
        questionAnswer
    }
}

export function handleAnswerQuestion (questionAnswer) {
    return (dispatch) => {
        dispatch(showLoading());

        return saveQuestionAnswer (questionAnswer)
        .then(() => dispatch(answerQuestion(questionAnswer)))
        .then(() => dispatch(hideLoading()))
    };
}