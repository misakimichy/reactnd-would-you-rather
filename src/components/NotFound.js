import React from 'react';
import { connect } from 'react-redux';

const NotFound = () => {
    return (
        <div>
            <h3 className='center'>404 Page Not Found</h3>
        </div>
    );
}

function mapStateToProps ({ users }) {
    return {
        users,
    };
}

export default connect(mapStateToProps)(NotFound);