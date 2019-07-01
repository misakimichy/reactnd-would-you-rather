import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionDetail from './QuestionDetail';
import Nav from './Nav';

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
                <Nav />
                <h3 className='center'>Question List</h3>
                <div>
                    <div
                        className='center'
                        onChange={this.handleTabChange}
                    >
                    Unanswered
                    </div>
                    <div
                        className='center'
                        onChange={this.handleTabChange}
                    >
                    Answered
                    </div>
                    <ul class='unanswered'>
                        {(unansweredQId.map(questionId => (
                            <li key={questionId}>
                                <QuestionDetail id={questionId} />
                            </li>
                        )))}
                    </ul>
                    <ul class='answered'>
                        {answeredQId.map(questionId => (
                            <li>
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
        answeredQId: Object.values(unanswered)
            .sort((a, b) => b.timestamp - a.timestamp).map(q => q.id)
    }
}

export default connect(mapStateToProps)(Dashboard);