import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions';

export default function questions (state = {}, action) {
    switch(action.type) {
        case ADD_QUESTION :
        return {
            ...state,
            [action.question.id]: action.question
        }

        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }

        default :
            return state
    }
}