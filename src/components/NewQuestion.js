import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
    <main>
      <h1 className="center">New Question</h1>
      <div className="question">
        <h2>Would You Rather...</h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="option"
            value={optionOne}
            placeholder="First option..."
            onChange={(e) => handleSelectOption(e, 1)}
          />

          <p>or</p>

          <input
            className="option"
            value={optionTwo}
            placeholder="Second option..."
            onChange={(e) => handleSelectOption(e, 2)}
          />

          <button className="button" type="submit" disabled={optionOne === '' || optionTwo === ''}>
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users,
  };
};

export default connect(mapStateToProps)(NewQuestion);
