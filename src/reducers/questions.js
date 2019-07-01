import {
    RECEIVE_QUESTIONS,
    ADD_QUESTION,
    ANSWER_QUESTION
} from '../actions/questions';

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
        
        case ANSWER_QUESTION :
            const {authedUser, qid, answer} = action.questionAnswer;
            let optionOne = state[qid].optionOne;
            let optionTwo = state[qid].optionTwo;

            if(answer === 'optionOne') {
                optionOne = {
                    ...optionOne,
                    votes: [...optionOne.votes.concat([authedUser])]
                }
                optionTwo = {
                    ...optionTwo,
                    votes: [...optionTwo.votes.filter(authedId => authedId !== authedId)]
                }
            }

            if(answer === 'optionTwo') {
                optionOne = {
                    ...optionOne,
                    votes: [...optionOne.votes.filter(authedId => authedId !== authedId)]
                }
                optionTwo = {
                    ...optionTwo,
                    votes: [...optionTwo.votes.concat([authedUser])]
                }
            }
            const option = {
                ...state[qid],
                optionOne,
                optionTwo
            };
            return {
                ...state,
                [qid]:option
            }
        default :
            return state
    }
}