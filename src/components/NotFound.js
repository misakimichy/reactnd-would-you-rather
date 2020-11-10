import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="center">
    <h1>404 Page Not Found</h1>
    <p>We couldn&apos;t find the question.</p>
    <Link to="/" className="back-home">
      Back Home
    </Link>
  </main>
);

export default NotFound;
