import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import NotFound from './NotFound';
import QuestionDetail from './QuestionDetail';
import { handleAnswerQuestion } from '../actions/questions';

class Question extends Component {
    state = {
        vote: false,
    }
    
    handleAnswer = answer => {
        const { dispatch, question } = this.props;
        //Invoke handleAnsweredQuestion
        dispatch(handleAnswerQuestion(question.id, answer))
    }

    render() {
        const { question } = this.props;
        
        return (
            <Fragment>
                {question
                    ? (<div>
                            <h1>Would You Rather</h1>
                            <div>
                                <QuestionDetail
                                    questionId={question.id}
                                    optionName="optionOne"
                                    onClick={this.handleAnswer}
                                />
                            </div>
                    </div>)
                    : <NotFound />
                }
            </Fragment>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, props) {
    const user = users[authedUser];
    const questionId = props.match.params;
    const question = questions[questionId];
    
    return {
        authedUser,
        question,
        // showResult: Object.keys(user.answers).includes(questionId),
    };
}

export default connect(mapStateToProps)(Question);