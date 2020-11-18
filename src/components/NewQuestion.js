import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { handleAddQuestion } from '../actions/questions';

const NewQuestion = (props) => {
  // destruct props
  const { dispatch, id } = props;
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [toHome, setToHome] = useState(false);

  const handleSelectOption = (e, optionIndex) => {
    const text = e.target.value;

    optionIndex === 1 ? setOptionOne(text) : setOptionTwo(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddQuestion(optionOne, optionTwo));
    setToHome(!id);
  };

  if (toHome) {
    return <Redirect to="/" />;
  }

  return (
    <Styles>
      <h1 className="center">New Question</h1>
      <div className="question">
        <h3>Would You Rather...</h3>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            value={optionOne}
            placeholder="First option..."
            onChange={(e) => handleSelectOption(e, 1)}
          />

          <p>or</p>

          <input
            value={optionTwo}
            placeholder="Second option..."
            onChange={(e) => handleSelectOption(e, 2)}
          />

          <button
            className="button"
            type="submit"
            disabled={optionOne === '' || optionTwo === ''}
            tabIndex="0"
          >
            Add poll
          </button>
        </form>
      </div>
    </Styles>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users,
  };
};

export default connect(mapStateToProps)(NewQuestion);

const Styles = styled.main`
  form {
    width: 100%;
  }

  input {
    font-size: 16px;
    resize: none;
    outline: none;

    width: 100%;
    height: 40px;
    margin-bottom: 10px;
  }

  .question {
    width: 450px;
  }
  @media screen and (max-width: 500px) {
    input {
      font-size: 14px;
      height: 30px;
    }

    .question {
      width: 300px;
    }
  }
`;
