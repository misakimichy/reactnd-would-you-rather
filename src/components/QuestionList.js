import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class QuestionList extends Component {
    render() {
        const { authedUser, users, question } = this.props;
        const { id, optionOne, optionTwo } = question;

        return (
            <Link to={`/question/question_${id}`}>
                <div className='question-list'>
                    <img
                        className='avatar'
                        src={users[question.author].avatarURL}
                        alt={`avatar of ${question.author}`}
                    />
                    <span className='username'>{users[question.author].name}</span>
                    <div className='option-one'>{optionOne.text}</div>
                    <span id='or'>or</span>
                    <div className='option-two'>{optionTwo.text}</div>
                </div>
            </Link>
        );
    }
}

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
    return {
        authedUser,
        users,
        question: questions[id]
    };
}

export default connect(mapStateToProps)(QuestionList);
