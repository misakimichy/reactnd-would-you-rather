import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleAnswerQuestion } from '../actions/questions';
import NotFound from './NotFound';

class Question extends Component {
    state = {
        vote: false,
    }

    handleClickAnswered = event => {
        event.preventDefault();
        const { vote } = this.state;
        const { dispatch, question } = this.props;
        //Invoke handleAnsweredQuestion
        dispatch(handleAnswerQuestion(question.id, vote))
    }
    
    render() {
        const { question, user, option, showResult, percentage, votes } = this.props;
        
        return (
            <div>
                {question
                    ? <div>
                            <h1>Would You Rather</h1>
                            <div>{user.name}</div>
                            <div>
                                {/* Work on this section!!! */}
                                <Link to='#' onClick={this.handleClickAnswered}>
                                    <div>
                                        {showResult === true &&
                                            <div>Numver of Votes: {votes.length} ({percentage}%)</div>
                                        }
                                    </div>
                                </Link>
                            </div>
                    </div>
                    : <NotFound />
                }
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions, qId, optionName }, props) {
    const user = users[authedUser];
    const questionId = props.match.params;
    const question = questions[qId];
    const option = question[optionName]
    
    return {
        authedUser,
        question,
        showResult: Object.keys(user.answer).includes(questionId),
        option,
        optionName,
        isVoted: option.voted.includes(authedUser),
        showResult: Object.keys(user.answers).includes(qId),
        percentage: ((option.votes.lenght / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100),
    };
}

export default connect(mapStateToProps)(Question);