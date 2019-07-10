import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import NotFound from './NotFound';
import QuestionDetail from './QuestionDetail';
import { handleAnswerQuestion } from '../actions/questions';

class Question extends Component {
    state = {
        answer: false,
    }
    
    handleAnswer = answer => {
        const { dispatch, question } = this.props;
        dispatch(handleAnswerQuestion(question.id, answer))
    }

    render() {
        const { question, user } = this.props;
        
        return (
            <Fragment>
                {question
                ? <div>
                    <h1 className='center'>Question</h1>
                    <div className='question-card'>
                        <div className='author-info'>
                            <img
                                className='question-card-avatar'
                                src={user.avatarURL}
                                alt={`avatar of ${question.author}`}
                            />
                            <div className='question-author'>{question.author}</div>
                        </div>
                        <div className='option-container'>
                            <QuestionDetail
                                questionId={question.id}
                                optionName="optionOne"
                                onClick={this.handleAnswer}
                            />
                            <span>or</span>
                            <QuestionDetail
                                questionId={question.id}
                                optionName="optionTwo"
                                onClick={this.handleAnswer}
                            />
                        </div>
                    </div>
                </div>
                : <NotFound />

            }
            </Fragment>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }, props) {
    const { question_id } = props.match.params;
    const question = questions[question_id];
    const user = users[question.author];

    return {
        authedUser,
        question,
        user,
    };
}

export default connect(mapStateToProps)(Question);