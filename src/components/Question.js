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
        dispatch(handleAnswerQuestion(question.id, answer))
    }

    render() {
        const { question } = this.props;
        
        return (
            <Fragment>
                {question
                    ? <div>
                            <h1>Would You Rather</h1>
                            <div>{question.author}</div>
                            <div>
                                <QuestionDetail
                                    questionId={question.id}
                                    optionName="optionOne"
                                    onClick={this.handleAnswer}
                                />
                                <QuestionDetail
                                    questionId={question.id}
                                    optionName="optionTwo"
                                    onClick={this.handleAnswer}
                                />
                            </div>
                    </div>
                    : <NotFound />
                }
            </Fragment>
        )
    }
}

function mapStateToProps({ authedUser, questions }, props) {
    const { question_id } = props.match.params;
    const question = questions[question_id];
    
    return {
        authedUser,
        question,
    };
}

export default connect(mapStateToProps)(Question);