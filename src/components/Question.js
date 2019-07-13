import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import QuestionDetail from './QuestionDetail';
import { handleAnswerQuestion } from '../actions/questions';

class Question extends Component {
    state = {
        answered: this.props.answered,
        selectOption: '',
    }
    
    handleAnswer = answer => {
        const { dispatch } = this.props;
        dispatch(handleAnswerQuestion(this.props.authedUser, this.props.question.id, this.state.selectOption))
        this.setState({
            answered: true
        })
    }

    handleSelectOption = event => {
        event.preventDefault();
        this.setState({
            selectOption: event.target.value
        })
    }

    render() {
        const { question, user } = this.props;
        const { answered, selectOption} = this.state;
        const { optionOne, optionTwo } = question;

        if(question === null) {
            return <Redirect to='/NotFound' from='*' />
        }
        
        return (
            <Fragment>
                {answered &&
                    <div>
                        <h1 className='center'>Question</h1>
                        <div className='question-card'>
                            <div className='author-info'>
                                <img
                                    className='question-card-avatar'
                                    src={user.avatarURL}
                                    alt={`avatar of ${question.author}`}
                                />
                                <div className='question-author'>{question.author} asks</div>
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
                }
                {!answered &&
                    <form onSubmit={this.handleAnswer}>
                        <div>!answered</div>
                            <label>
                                <input
                                    type='radio'
                                    value='optionOne'
                                    checked={selectOption === 'optionOne'}
                                    onChange={this.handleSelectOption}
                                />
                                    {optionOne.text}
                            </label>
                            <span>or</span>
                            <label>
                                <input
                                    type='radio'
                                    value='optionTwo'
                                    checked={selectOption === 'optionTwo'}
                                    onChange={this.handleSelectOption}
                                />
                                    {optionTwo.text}
                            </label>
                            <button
                                className='button'
                                type='submit'
                                disabled={selectOption === ''}
                            >
                                Vote
                            </button>
                    </form>
                }
            </Fragment>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }, props) {
    console.log('this props: ', props);
    const { question_id } = props.match.params;
    const question = questions[question_id];
    const user = users[question.author];
    let answered = false;
    if (question) {
        answered = question.optionOne.votes.indexOf(authedUser) !== -1
        || question.optionTwo.votes.indexOf(authedUser) !== -1
    }
    console.log('answered: ', answered);

    return {
        authedUser,
        question,
        user,
        answered,
    };
}

export default connect(mapStateToProps)(Question);