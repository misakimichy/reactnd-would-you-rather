import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
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

  /* 

  Reference: 
  reactstrap nav: https://reactstrap.github.io/components/navs/
  reactstarp tabs: https://reactstrap.github.io/components/tabs/
  
  */
  return (
    <main>
      <Nav tabs>
        <div className="tabs">
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => handleTabChange('1')}
            >
              Unanswered
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => handleTabChange('2')}
            >
              See Answered
            </NavLink>
          </NavItem>
        </div>
      </Nav>
      <TabContent activeTab={activeTab}>
        {activeTab === '1' ? (
          <TabPane tabId="1">
            <ul className="questions">
              {unansweredQIds.map((questionId) => (
                <li key={questionId}>
                  <QuestionList id={questionId} />
                </li>
              ))}
            </ul>
          </TabPane>
        ) : (
          <TabPane tabId="2">
            <ul className="questions">
              {answeredQIds.map((questionId) => (
                <li key={questionId}>
                  <QuestionList id={questionId} />
                </li>
              ))}
            </ul>
          </TabPane>
        )}
      </TabContent>
    </main>
  );
};

function mapStateToProps({ authedUser, questions }) {
  // if neither of option votes includes the selected username, those questions are going to be unanswered.
  // if either of option votes includes the selected username, those questions are going to be answered.
  return {
    authedUser: authedUser,
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
