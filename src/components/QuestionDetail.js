import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Question from './Question';

class QuestionDetail extends Component {
    render() {
        const { question } = this.props;
        const { id, optionOne, optionTwo } = question;

        return (
            <Link to={`/question/${id}`}>
                <p>{optionOne.text}</p>
                <span>or</span>
                <p>{optionTwo.text}</p>
            </Link>
        );
    }
}

const mapStateToProps = ({ questions }, { id }) => {
    return {
        question: questions[id]
    };
}

export default connect(mapStateToProps)(QuestionDetail);
