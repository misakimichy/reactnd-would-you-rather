import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import QuestionList from './QuestionList';

class Dashboard extends Component {
    state = {
        activeTab : '1',
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
        const { activeTab } = this.state;
    
        return(
            <div>
                {/* reactstrap nav: https://reactstrap.github.io/components/navs/ */}
                <Nav tabs>
                    <div className='tabs'>
                        <NavItem>
                            <NavLink
                                className={classnames({active: activeTab === '1'})}
                                onClick={() => this.handleTabChange('1')}
                            >
                                Unanswered
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: activeTab === '2'})}
                                onClick={() => this.handleTabChange('2')}
                            >
                                See Answered
                            </NavLink>
                        </NavItem>
                    </div>
                </Nav>
                {/* reactstarp tabs: https://reactstrap.github.io/components/tabs/ */}
                <TabContent activeTab={activeTab}>
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

function mapStateToProps ({ authedUser, users, questions }) {
    // if neither of option votes includes the selected username, those questions are going to be unanswered.
    // if either of option votes includes the selected username, those questions are going to be answered.
    
    const unansweredQuestions = Object.values(questions).filter(question =>
        !question.optionOne.votes.includes(question.author) && !question.optionTwo.votes.includes(question.author));
    const answeredQuestions = Object.values(questions).filter(question =>
        question.optionOne.votes.includes(question.author) || question.optionTwo.votes.includes(question.author));
    
    const unansweredQIds = Object.values(unansweredQuestions)
        .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id);
    const answeredQIds = Object.values(answeredQuestions)
        .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id);

    const user = Object.values(users).filter(user => {
        if(user.name === authedUser) {
            return console.log('this user answered to these Qs: ', user.answers);
        }
        console.log('not unserwed yet: ', Object.values(questions).filter(question => {
            question.id.includes(Object.keys(user.answers))
        }));
    });
    // Sara :  "6ni6ok3ym7mf1p33lnez", "8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9", "oxhs1bqm25b708cmbf3g"
    // Tyler:  "loxhs1bqm25b708cmbf3g", "xj352vofupe1dqz9emx13r"
    // John:  "xj352vofupe1dqz9emx13r", "vthrdm985a262al8qx3do", "6ni6ok3ym7mf1p33lnez"


    // console.log('Object.values of questions: ', Object.values(questions));
    // console.log('unanswered question.author includes?:', Object.values(questions).filter(question =>
    //     question.optionOne.votes.includes(question.author)));
    // console.log('unansweredQuestions', unansweredQuestions);
    // console.log('unansweredQids: ', unansweredQIds);
    // console.log('user name: ', Object.values(users).filter(user => user.name.includes(authedUser)));


    return {
        unansweredQIds,
        answeredQIds,
    }
}

export default connect(mapStateToProps)(Dashboard);