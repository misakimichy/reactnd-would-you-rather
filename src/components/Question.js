import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotFound from './NotFound';
import QuestionDetail from './QuestionDetail';

class Question extends Component {
    
    render() {
        const { question } = this.props;
        
        return (
            <div>
                {question
                    ? <div>
                            <h1>Would You Rather</h1>
                            <div>{question.author}</div>
                            <div>
                                <QuestionDetail questionId={question.id} optionName="optionOne" />
                            </div>
                    </div>
                    : <NotFound />
                }
            </div>
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