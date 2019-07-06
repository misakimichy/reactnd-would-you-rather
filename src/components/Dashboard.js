import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import QuestionList from './QuestionList';

class Dashboard extends Component {
    state = {
        activeTab : '1'
    }

    handleTabChange = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const { unansweredQIds, answeredQIds } = this.props;
    
        return(
            <div>
                {/* reactstrap nav: https://reactstrap.github.io/components/navs/ */}
                <Nav tabs>
                    <div className='tabs'>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '1'})}
                                onClick={() => this.handleTabChange('1')}
                            >
                                Unanswered
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '2'})}
                                onClick={() => this.handleTabChange('2')}
                            >
                                See Answered
                            </NavLink>
                        </NavItem>
                    </div>
                </Nav>
                {/* reactstarp tabs: https://reactstrap.github.io/components/tabs/ */}
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId='1'>
                        <ul className='questions'>
                            {unansweredQIds.map(questionId => (
                                <li key={questionId}>
                                    <QuestionList id={questionId}/>
                                </li>
                            ))}
                        </ul>
                    </TabPane>
                    <TabPane tabId='2'>
                        <ul className='questions'>
                            {answeredQIds.map(questionId => (
                                <li key={questionId}>
                                    <QuestionList id={questionId} />
                                </li>
                            ))}
                        </ul>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, questions }) {
    const unansweredQuestions = Object.values(questions).filter((question) =>
        !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser));
    const answeredQuestions = Object.values(questions).filter((question) =>
        question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser));
    
    const unansweredQIds = Object.values(unansweredQuestions)
        .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id);
    const answeredQIds = Object.values(answeredQuestions)
        .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id);

    return {
        unansweredQIds,
        answeredQIds,
    }
}

export default connect(mapStateToProps)(Dashboard);