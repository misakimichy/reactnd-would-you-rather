import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class QuestionList extends Component {
    render() {
        const { question } = this.props;
        const { id, optionOne, optionTwo } = question;

        return (
            <Link to={`/question/question_${id}`}>
                {/* Add avatar here */}
                <div className='center qestion-list'>
                    <p>{optionOne.text}</p>
                    <span>or</span>
                    <p>{optionTwo.text}</p>
                </div>
            </Link>
        );
    }
}

const mapStateToProps = ({ questions }, { id }) => {
    return {
        question: questions[id]
    };
}

export default connect(mapStateToProps)(QuestionList);
