import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import QuestionList from './QuestionList';

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
    <main>
      <div className="tabs">
        {/* <Link className={classnames({ active: activeTab === '1' })}> */}
        <button
          type="button"
          className={(classnames({ active: activeTab === '1' }), 'button')}
          onClick={() => handleTabChange('1')}
        >
          Unanswered
        </button>

        <button
          type="button"
          className={(classnames({ active: activeTab === '2' }), 'button')}
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
    </main>
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
