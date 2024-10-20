import React from 'react';

const PageNotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/">Go back to Home</a>
        </div>
    );
};

export default PageNotFound;
