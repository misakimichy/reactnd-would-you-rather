import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleAnswerQuestion } from '../actions/questions';

class QuestionDetail extends Component {
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

    handleClick = event => {
        event.preventDefault();
        const { optionName } = this.props
        this.handleClickAnswered(optionName)
    }

    render() {
        const { option, showResult, isVoted, percentage } = this.props
        const { text, votes } = option;

        return (
            showResult === false
                ? <Link
                    to='#'
                    onClick={this.handleClick}
                    >
                    Question Detail
                    <div className={isVoted ? ('selected') : ''}>
                        <h1>{text}</h1>
                        {showResult == true &&
                            (<div>Number of Votes: {votes.length} ({percentage}%)</div>)
                        }
                    </div>
                </Link>
                : <div>
                    <div className={isVoted ? ('selected') : ''}>
                        {showResult === true &&
                            <div>Number of Votes: {votes.length} ({percentage}%)</div>
                        }
                    </div>
                </div>
        )
    }
}

function mapStateToProps ({ authedUser, questions, users}, { questionId, optionName }) {
    const currentUser = users[authedUser];
    const question = questions[questionId];
    const option = question[optionName];

    return {
        option,
        optionName,
        isVoted: option.votes.includes(authedUser),
        percentage: ((option.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100),
        showResult: Object.keys(currentUser.answers).includes(questionId)
    }
}

export default connect(mapStateToProps)(QuestionDetail);