import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Question from './Question';
import { addQuestion } from '../actions/questions';

class Dashboard extends Component {
    state = {
        answered: true,
    }

    handleTabChange = event => {
        this.setState({
            answered: !this.state.answered
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
                    <ul>
                        unanswered.map
                    </ul>
                    <div
                        className='center'
                        onChange={this.handleTabChange}
                    >
                    Answered
                    </div>

                </div>
                <ul className='question-feed'>
                    {this.props.questionIds.map(id => (
                        <li key={id}>
                            <Question id={id}/>
                        </li>
                    ))}
                </ul>
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
            if(Object.keys(currentUser.answers).includes(questionId)){
                return answered.push(questions[questionId])
            } else {
                return unanswered.push(questions[questionId])
            }
        })
    }
    return {
        currentUser: currentUser,
        answered: answered,
        unanswered: unanswered
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard));