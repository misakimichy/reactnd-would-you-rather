import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionDetail extends Component {
    render() {
        const {id, questions } = this.props;
        const question = questions[id];

        return (
            <div>
                <h3 className='center'>Question</h3>
                {question &&
                    <Question question={question} />}
            </div>
        );
    }
}

const mapStateToProps = ({ questions }, props) => {
    const { id } = props.match.params;
    
    return {
        id,
        questions,
    };
}

export default connect(mapStateToProps)(QuestionDetail);
