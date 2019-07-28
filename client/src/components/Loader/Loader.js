import React from 'react';
import { Spinner } from 'reactstrap';

import './loader.scss';

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader__content">
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
            <h1 className="loader__title">Loading...</h1>
            </div>
        </div>
    );
};

export default Loader;
