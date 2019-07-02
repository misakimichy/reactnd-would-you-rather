import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionDetail from './QuestionDetail';

class Dashboard extends Component {
    state = {
        activeTab: '1',
    }

    handleTabChange = tab => {
        if(this.state.activeTab !== tab)
        this.setState({
           activeTab: tab,
         })
    }

    render() {
        const { unansweredQId, answeredQId} = this.props;

        return(
            <div>
                <h3 className='center'>Question List</h3>
                <div>
                    <button
                        className='center'
                        onClick={() => this.handleTabChange('1')}
                    >
                    Unanswered
                    </button>
                    <button
                        className='center'
                        onChange={() => this.handleTabChange('2')}
                    >
                    Answered
                    </button>
                    <ul className='question-list'>
                        {(unansweredQId.map(questionId => (
                            <li key={questionId}>
                                <QuestionDetail id={questionId} />
                            </li>
                        )))}
                    </ul>
                    <ul className='question-list'>
                        {answeredQId.map(questionId => (
                            <li key={questionId}>
                                <QuestionDetail id={questionId} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ questions, authedUser}) {
    const unanswered = Object.values(questions).filter(question =>
        !question.optionOne.votes.includes(authedUser) &&
            !question.optionTwo.votes.includes(authedUser));

    const answered = Object.values(questions).filter(question =>
        question.optionOne.votes.includes(authedUser) ||
            question.optionTwo.votes.includes(authedUser));

    return {
        unansweredQId: Object.values(unanswered)
            .sort((a, b) => b.timestamp - a.timestamp).map(q => q.id),
        answeredQId: Object.values(answered)
            .sort((a, b) => b.timestamp - a.timestamp).map(q => q.id)
    }
}

export default connect(mapStateToProps)(Dashboard);