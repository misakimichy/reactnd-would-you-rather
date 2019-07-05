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
        const { unansweredQids, answeredQids } = this.props;
    
        return(
            // reactstrap nav: https://reactstrap.github.io/components/navs/
            // reactstarp tabs: https://reactstrap.github.io/components/tabs/
            <div>
                <Nav tabs>
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
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId='1'>
                        <ul>
                            {unansweredQids.map(questionId => (
                                <li key={questionId}>
                                    <QuestionList id={questionId}/>
                                </li>
                            ))}
                        </ul>
                    </TabPane>
                    <TabPane tabId='2'>
                        <ul>
                            {answeredQids.map(questionId => (
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
    const unansweredQuestions = Object.values(questions).filter(question =>
        !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser)
    );
    const answeredQuestions = Object.values(questions).filter(question =>
        question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
    );

    return {
        unansweredQids: Object.values(unansweredQuestions).sort((a, b) => b.timestamp - a.timestamp).map(q => q.id),
        answeredQids: Object.values(answeredQuestions).sort((a, b) => b.timestamp - a.timestamp).map(q => q.id),
    }
}

export default connect(mapStateToProps)(Dashboard);