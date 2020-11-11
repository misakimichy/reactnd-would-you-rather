import React from 'react';
import { connect } from 'react-redux';

const QuestionDetail = (props) => {
  // destruct props
  const { option, isVoted, percentage } = props;
  const { text } = option;

  return (
    <div className={isVoted ? 'selected result' : 'result'}>
      <h1 className="options">{text}</h1>
      <p>({percentage}%)</p>
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
    isVoted: option.votes.includes(currentUser.id),
    percentage: ((option.votes.length / (optionOneVotes + optionTwoVotes)) * 100).toFixed(2),
  };
};

export default connect(mapStateToProps)(QuestionDetail);
