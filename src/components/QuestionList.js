import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const QuestionList = (props) => {
  // destruct props
  const { user, question } = props;
  const { avatarURL, name } = user;
  const { id, author, optionOne, optionTwo } = question;

  return (
    <Styles>
      <Link to={`/questions/${id}`}>
        <div className="question-list">
          <img className="avatar" src={avatarURL} alt={`avatar of ${author}`} />

          <div className="card-right">
            <p className="author">{name}</p>
            <p className="options">{optionOne.text}</p>
            <p>or</p>
            <p className="options">{optionTwo.text}</p>
          </div>
        </div>
      </Link>
    </Styles>
  );
};

const mapStateToProps = ({ users, questions }, { id }) => {
  const question = questions[id];
  const user = users[question.author];

  return {
    user,
    question,
  };
};

export default connect(mapStateToProps)(QuestionList);

const Styles = styled.div``;
