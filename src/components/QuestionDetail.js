import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const QuestionDetail = (props) => {
  // destruct props
  const { option, showResult, isVoted, percentage, optionName, onClick } = props;
  const { text, votes } = option;

  const handleClick = (e) => {
    e.preventDefault();
    onClick(optionName);
  };

  return showResult === false ? (
    <Link to="#" onClick={(e) => handleClick}>
      <div className={isVoted ? 'selected' : ''}>
        <h1 className="detail-option-one">{text}</h1>
        {showResult === true && (
          <div className="result">
            Number of Votes: {votes.length} ({percentage}%)
          </div>
        )}
      </div>
    </Link>
  ) : (
    <div className={isVoted ? 'selected' : ''}>
      <h1 className="detail-option-one">{text}</h1>
      {showResult === true && (
        <div className="result">
          Number of Votes: {votes.length} ({percentage}%)
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, { questionId, optionName }) => {
  const question = questions[questionId];
  const currentUser = users[authedUser];
  const option = question[optionName];
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;

  return {
    option,
    optionName,
    isVoted: option.votes.includes(currentUser.id),
    showResult: Object.keys(currentUser.answers).includes(questionId),
    percentage: ((option.votes.length / (optionOneVotes + optionTwoVotes)) * 100).toFixed(2),
  };
};

export default connect(mapStateToProps)(QuestionDetail);
