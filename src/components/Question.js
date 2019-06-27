import React, { Component } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
    render() {
        return (
            <div className='question'>

            </div>
        )
    }
}

function mapStateToProps({authedUser, users}){
    return {
        authedUser,
        users,
    };
}

export default connect(mapStateToProps)(Question);