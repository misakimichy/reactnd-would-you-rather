import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import useWindowWidth from '../utils/hooks/useWindowWidth';

const QuestionDetail = (props) => {
  // destruct props
  const { option, isVoted, percentage } = props;
  const { text } = option;

  const windowWidth = useWindowWidth();

  return (
    <Styles>
      <div className={isVoted ? 'selected result' : 'result'}>
        <p className="options" styles={windowWidth < 500 && { fontSize: '14px' }}>
          {text}
        </p>
        <p>({percentage}%)</p>
      </div>
    </Styles>
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

const Styles = styled.div``;
