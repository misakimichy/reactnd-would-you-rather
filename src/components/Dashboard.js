import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';

class Dashboard extends Component {
    state = {
        hasAnswered: false,
    }

    handleTabChange = answered => {
        this.setState({
            hasAnswered: answered
        })
    }

    render() {
        const { hasAnswered } = this.state;
        const { authedUser, questions } = this.props;
        const questionsArray = Object.keys(questions).map(key => questions[key]);
        const filteredQuestions = questionsArray.filter(question => {
            const contains = (
                question.optionOne.votes.indexOf(authedUser) > -1 ||
                question.optionTwo.votes.indexOf(authedUser) > -1
            );
            return hasAnswered ? contains : !contains;
        });
        const sortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);
    

        return(
            <div>
                <h1 className='center'>Question List</h1>
                <div className='center tab'>
                    <button
                        className={!hasAnswered ? 'button-left active' : 'button-left'}
                        onClick={() => this.handleTabChange(false)}
                    >
                    Unanswered
                    </button>
                    <button
                        className={hasAnswered ? 'button-right active' : 'button-right'}
                        onClick={() => this.handleTabChange(true)}
                    >
                    Answered
                    </button>
                </div>
                <ul>
                    {sortedQuestions.map(question => (
                        <li key={question.id}>
                        <QuestionList id={question.id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, questions }) {
    return {
        authedUser,
        questions,
    }
}

export default connect(mapStateToProps)(Dashboard);