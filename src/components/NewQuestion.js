import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
    }

    handleSelectOption = (event, optionIndex) => {
        const text = event.target.value;

        this.setState(previousState => {
            return optionIndex === 1
                ? {...previousState, 'optionOne': text}
                : {...previousState, 'optionTwo': text}
        });
    }
    render() {
        const { authedUser, users } = this.props;
        const { optionOne, optionTwo } = this.state;

        return (
            <div>
                <h1 className='center'>New Question</h1>
                <div className='question'>
                    {/* <img
                        className='avatar'
                        src={`/${users[authedUser].avatarURL}`}
                        alt={`Avatar of ${authedUser}`}
                    /> */}
                    <h2>Would You Rather...</h2>
                    <form >
                        <div className='option'>
                            <input
                                className="option"
                                value={optionOne}
                                placeholder= "First option comes here."
                                onChange={(event) => this.handleSelectOption(event, 1)}
                            />
                        </div>
                        <span>or</span>
                        <div className='options'>
                            <input
                                className="option"
                                value={optionTwo}
                                placeholder= "Second option comes here."
                                onChange={(event) => this.handleSelectOption(event, 2)}
                            />
                        </div>
                        <button
                            className='button'
                            type='submit'
                            disabled={optionOne === ''|| optionTwo === ''}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps ({ authedUser, users }) {
    return {
        authedUser,
        users,
    };
}

export default connect(mapStateToProps)(NewQuestion);