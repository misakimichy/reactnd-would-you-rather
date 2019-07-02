import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/questions';
import NotFound from './NotFound';

class Question extends Component {
    state = {
        vote: false,
    }
    handleClickAnswered = event => {
        event.preventDefault();
        //Hande answered
    }
    
    render() {
        const { question, user } = this.props;
        
        return (
            <div>
                {question
                    ? (<div>
                            <h1>Would You Rather</h1>
                            <p>{user.name}</p>
                            
                        </div>)
                    : <NotFound />
                }
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, props){
    const questionId = props.match.params;
    const question = questions[questionId];
    const user = users[authedUser];
    console.log("This props: ", props);
    return {
        authedUser,
        question,
        showResult: Object.keys(user.answer).includes(questionId)
    };
}

export default connect(mapStateToProps)(Question);