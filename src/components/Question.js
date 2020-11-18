import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { handleAnswerQuestion } from '../actions/questions';

// components
import QuestionDetail from './QuestionDetail';
import NotFound from './NotFound';

const Question = (props) => {
  // destruct props
  const { dispatch, question, user, questionNotExist, authedUser, answered } = props;
  const { avatarURL } = user;
  const { author, id, optionOne, optionTwo } = question;

  const [answeredStatus, setAnsweredStatus] = useState(answered);
  const [selectOption, setSelectOption] = useState('');

  const handleAnswer = () => {
    dispatch(handleAnswerQuestion(authedUser, question.id, selectOption));
    setAnsweredStatus(true);
  };

  if (questionNotExist) {
    return <Route path="*" component={NotFound} />;
  }
  return (
    <Styles>
      {answeredStatus ? (
        <>
          <h1 className="center">Result</h1>
          <div className="question-list">
            <div className="questions">
              <img className="avatar" src={avatarURL} alt={`avatar of ${author}`} />
              <span style={{ fontSize: '14px' }}>{author}</span>
            </div>

            <div className="option-container">
              <QuestionDetail questionId={id} optionName="optionOne" onClick={handleAnswer} />
              <p>or</p>
              <QuestionDetail questionId={id} optionName="optionTwo" onClick={handleAnswer} />
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleAnswer}>
          <div className="question">
            <h2 className="center">Would you rather</h2>
            <div className="radio-button">
              <input
                type="radio"
                value="optionOne"
                id="radio1"
                checked={selectOption === 'optionOne'}
                onChange={(e) => setSelectOption(e.target.value)}
              />
              <label htmlFor="radio1">{optionOne.text}</label>
            </div>
            <p>or</p>
            <div className="radio-button">
              <input
                type="radio"
                value="optionTwo"
                id="radio2"
                checked={selectOption === 'optionTwo'}
                onChange={(e) => setSelectOption(e.target.value)}
              />
              <label htmlFor="radio2">{optionTwo.text}</label>
            </div>
            <button className="button" type="submit" disabled={selectOption === ''}>
              vote
            </button>
          </div>
        </form>
      )}
    </Styles>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
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

const Styles = styled.section`
  .radio-button {
    display: flex;
    align-items: center;

    * {
      cursor: pointer;
    }
  }

  .option-container {
    width: unset;
  }

  .question {
    width: 450px;
  }
`;
