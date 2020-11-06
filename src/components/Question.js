import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import QuestionDetail from './QuestionDetail';
import { handleAnswerQuestion } from '../actions/questions';
import NotFound from './NotFound';

class Question extends Component {
  constructor(props) {
    super(props);
    const { answered } = this.props;
    this.state = {
      qAnswered: answered,
      selectOption: '',
    };
  }

  handleAnswer = () => {
    const { dispatch, authedUser, question } = this.props;
    const { selectOption } = this.state;
    dispatch(handleAnswerQuestion(authedUser, question.id, selectOption));
    this.setState({
      qAnswered: true,
    });
  };

  handleSelectOption = (event) => {
    event.preventDefault();
    this.setState({
      selectOption: event.target.value,
    });
  };

  render() {
    const { question, user, questionNotExist } = this.props;
    if (questionNotExist) {
      return <Route path="*" component={NotFound} />;
    }
    const { qAnswered, selectOption } = this.state;
    const { optionOne, optionTwo } = question;

    return (
      <>
        {qAnswered && (
          <div>
            <h1 className="center">Result</h1>
            <div className="question-card">
              <div className="author-info">
                <img
                  className="question-card-avatar"
                  src={user.avatarURL}
                  alt={`avatar of ${question.author}`}
                />
                <div className="question-author">{question.author} asks</div>
              </div>
              <div className="option-container">
                <QuestionDetail
                  questionId={question.id}
                  optionName="optionOne"
                  onClick={this.handleAnswer}
                />
                <span>or</span>
                <QuestionDetail
                  questionId={question.id}
                  optionName="optionTwo"
                  onClick={this.handleAnswer}
                />
              </div>
            </div>
          </div>
        )}
        {!qAnswered && (
          <form onSubmit={this.handleAnswer}>
            <h1 className="center">Would you rather</h1>
            <div className="poll">
              <input
                type="radio"
                value="optionOne"
                id="radio1"
                checked={selectOption === 'optionOne'}
                onChange={this.handleSelectOption}
              />
              <label htmlFor="radio1">{optionOne.text}</label>
              <div>or</div>
              <input
                type="radio"
                value="optionTwo"
                id="radio2"
                checked={selectOption === 'optionTwo'}
                onChange={this.handleSelectOption}
              />
              <label htmlFor="radio2">{optionTwo.text}</label>
              <button className="button" type="submit" disabled={selectOption === ''}>
                Vote
              </button>
            </div>
          </form>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  /* eslint-disable */
  const { question_id } = props.match.params;
  const question = questions[question_id];
  let questionNotExist = false;
  if (!question) {
    questionNotExist = true;
  }
  const user = users[authedUser];
  let answered = false;
  if (question) {
    answered =
      question.optionOne.votes.indexOf(authedUser) !== -1 ||
      question.optionTwo.votes.indexOf(authedUser) !== -1;
  }

  return {
    authedUser,
    question,
    user,
    questionNotExist,
    answered,
  };
};

export default connect(mapStateToProps)(Question);
