import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h1 className='center'>404 Page Not Found</h1>
            <p>We couldn't find the question.</p>
            <Link to='/'>Back to Home</Link>
        </div>
    );
}

export default NotFound;