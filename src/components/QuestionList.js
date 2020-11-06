import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const QuestionList = (props) => {
  // destruct props
  const { user, question } = props;
  const { avatarURL, name } = user;
  const { id, author, optionOne, optionTwo } = question;

  return (
    <Link to={`/questions/${id}`}>
      <div className="question-list">
        <img className="avatar" src={avatarURL} alt={`avatar of ${author}`} />
        <span className="username">{name}</span>
        <div className="option-one">{optionOne.text}</div>
        <div id="or">or</div>
        <div className="option-two">{optionTwo.text}</div>
      </div>
    </Link>
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
