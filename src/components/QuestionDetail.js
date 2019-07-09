import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class QuestionDetail extends Component {
    handleClick = event => {
        event.preventDefault();
        const { onClick, optionName } = this.props;
        onClick(optionName);
    }

    render() {
        const { option, showResult, isVoted, percentage } = this.props
        const { text, votes } = option;

        return (
            showResult === false
                ? <Link to='#' onClick={this.handleClick}>
                    <div className={isVoted ? ('selected') : ''}>
                        <h1 className='detail-option-one'>{text}</h1>
                        {showResult === true &&
                            (<div className='result'>
                                Number of Votes: {votes.length} ({percentage}%)
                            </div>)
                        }
                        <div></div>
                    </div>
                </Link>
                : <div className={isVoted ? ('selected') : ''}>
                    <h1 className='detail-option-one'>{text}</h1>
                    {showResult === true &&
                        (<div className='result'>
                            Number of Votes: {votes.length} ({percentage}%)
                        </div>)
                    }
                </div>
        )
    }
}

function mapStateToProps ({ authedUser, questions, users }, { questionId, optionName }) {
    const question = questions[questionId];
    const currentUser = users[question.author];
    const option = question[optionName];
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;

    return {
        option,
        optionName,
        isVoted: option.votes.includes(currentUser.id),
        percentage: ((option.votes.length / (optionOneVotes + optionTwoVotes)) * 100),
        showResult: Object.keys(currentUser.answers).includes(questionId),
    }
}

export default connect(mapStateToProps)(QuestionDetail);