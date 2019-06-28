import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
    state = {
        answered: false,
    }

    handleTabChange = event => {
        this.setState({answered: true});
    }

    render() {
        const { answered } = this.state;
        return(
            <div>
                <h3 className='center'>Question List</h3>
                <button
                    className={!answered ? 'button-left' : ''}
                    onClick={event => this.handleTabChange(event)}
                >
                Unanswered
                </button>
                <button
                    className={answered ? 'button-right' : 'btn-right'}
                    onClick={event => this.handleTabChange(event)}
                >
                Answered
                </button>
                <ul className='question-feed'>
                    {this.props.questionIds.map(question => (
                        <li key={question}>
                            <Question question={question}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ questions }) {
    return {
        questionIds: Object.keys(questions)
            .sort((a,b) =>questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);