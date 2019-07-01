import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Question from './Question';
import { addQuestion } from '../actions/questions';

class Dashboard extends Component {
    state = {
        unanswered: true,
    }

    handleTabChange = event => {
        this.setState({
            unanswered: !this.state.unanswered
         })
    }

    render() {
        const { currentUser, unanswered, answered } = this.props;

        return(
            <div>
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
                    <ul>
                        {(this.state.unanswered ? unanswered : answered).map(question => {
                            return (
                                <li key={question.id}>
                                    <Link to={`/questions/${question.id}`}>
                                        Would You Rather...
                                    </Link>
                                    {!this.state.unanswered &&
                                        (<p>You answered :
                                            {question.optionOne.votes.includes(currentUser.id)
                                                ? question.optionOne.text
                                                : question.optionTwo.text}</p>
                                        )
                                    }
                                </li>
                            )
                        }
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps (props) {
    const { users, questions, authedUser } = props;
    let currentUser = null;
    const unanswered = [];
    const answered = [];

    if(authedUser){
        currentUser = users[authedUser];
        Object.keys(questions).sort((a,b) => {
            return questions[b].timestamp - questions[a].timestamp
        }).map(questionId => {
            Object.keys(currentUser.answers).includes(questionId)
                ? answered.push(questions[questionId])
                : unanswered.push(questions[questionId])
        })
    }
    return {
        currentUser: currentUser,
        answered: answered,
        unanswered: unanswered
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard));