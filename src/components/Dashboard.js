import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import QuestionList from './QuestionList';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
    };
  }

  handleTabChange = (tab) => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    const { unansweredQIds, answeredQIds } = this.props;
    const { activeTab } = this.state;

    return (
      <div>
        {/* reactstrap nav: https://reactstrap.github.io/components/navs/ */}
        <Nav tabs>
          <div className="tabs">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => this.handleTabChange('1')}
              >
                Unanswered
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => this.handleTabChange('2')}
              >
                See Answered
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        {/* reactstarp tabs: https://reactstrap.github.io/components/tabs/ */}
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <ul className="questions">
              {unansweredQIds.map((questionId) => (
                <li key={questionId}>
                  <QuestionList id={questionId} />
                </li>
              ))}
            </ul>
          </TabPane>
          <TabPane tabId="2">
            <ul className="questions">
              {answeredQIds.map((questionId) => (
                <li key={questionId}>
                  <QuestionList id={questionId} />
                </li>
              ))}
            </ul>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  // if neither of option votes includes the selected username, those questions are going to be unanswered.
  // if either of option votes includes the selected username, those questions are going to be answered.
  return {
    authedUser,
    answeredQIds: Object.keys(questions)
      .filter((question) => {
        /* eslint-disable */
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
