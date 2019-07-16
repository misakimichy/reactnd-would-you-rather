import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    }

    handleSelectOption = (event, optionIndex) => {
        const text = event.target.value;

        this.setState({
            [optionIndex === 1 ? 'optionOne' : 'optionTwo'] : text
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const { optionOne, optionTwo } = this.state;
        const { dispatch, id } = this.props;

        dispatch(handleAddQuestion(optionOne, optionTwo));
        this.setState(previousState => ({
            ...previousState,
            toHome: id ? false : true,
        }))
    }


    render() {
        const { optionOne, optionTwo, toHome } = this.state;

        if(toHome) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <h1 className='center'>New Question</h1>
                <div className='question'>
                    <h2>Would You Rather...</h2>
                    <form onSubmit={this.handleSubmit}>
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