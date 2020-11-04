import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { receiveUsers } from './users';

export const ADD_QUESTION = 'ADD_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';

const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

export const addQuestionAnswer = (authedUser, qid, answer) => {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
};

export const handleAddQuestion = (optionOneText, optionTwoText) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((res) => {
      dispatch(addQuestion(res.formattedQuestion));
      dispatch(receiveUsers(res.users));
      dispatch(hideLoading());
    });
  };
};

export const handleAnswerQuestion = (authedUser, qid, answer) => {
  return (dispatch) => {
    const answerInfo = {
      authedUser,
      qid,
      answer,
    };

    return saveQuestionAnswer(answerInfo).then((res) => {
      dispatch(addQuestionAnswer(authedUser, qid, answer));
      dispatch(receiveUsers(res.users));
      dispatch(receiveQuestions(res.questions));
    });
  };
};
