import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import QuestionList from './QuestionList';

import { colors } from '../styles/theme';

const Dashboard = (props) => {
  // destruct props
  const { unansweredQIds, answeredQIds } = props;
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Styles>
      <div className="tabs">
        <button
          type="button"
          className={activeTab === '1' ? 'button button-selected' : 'button'}
          onClick={() => handleTabChange('1')}
        >
          Unanswered
        </button>

        <button
          type="button"
          className={activeTab === '2' ? 'button button-selected' : 'button'}
          onClick={() => handleTabChange('2')}
        >
          See Answered
        </button>
      </div>

      {activeTab === '1' ? (
        <div className="questions">
          {unansweredQIds.map((questionId) => (
            <QuestionList key={questionId} id={questionId} />
          ))}
        </div>
      ) : (
        <div className="questions">
          {answeredQIds.map((questionId) => (
            <QuestionList key={questionId} id={questionId} />
          ))}
        </div>
      )}
    </Styles>
  );
};

function mapStateToProps({ authedUser, questions }) {
  // both votes don't include username -> unanswered
  // either of them includes username -> answered
  return {
    authedUser,
    answeredQIds: Object.keys(questions)
      .filter((question) => {
        let optionOneSelected = questions[question].optionOne.votes.indexOf(authedUser) !== -1;
        let optionTwoSelected = questions[question].optionTwo.votes.indexOf(authedUser) !== -1;
        return optionOneSelected || optionTwoSelected;
      })
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    unansweredQIds: Object.keys(questions)
      .filter((question) => {
        let optionOneSelected = questions[question].optionOne.votes.indexOf(authedUser) === -1;
        let optionTwoSelected = questions[question].optionTwo.votes.indexOf(authedUser) === -1;
        return optionOneSelected && optionTwoSelected;
      })
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  };
}

export default connect(mapStateToProps)(Dashboard);

const Styles = styled.main`
  .tabs {
    display: flex;
    justify-content: space-evenly;

    width: 40%;
    margin: 0 auto;
  }

  .button-selected {
    background-color: ${colors.greenHover};
  }
`;
