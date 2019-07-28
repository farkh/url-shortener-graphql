import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';

import useWithAuthenticate from '../WithAuthenticate/index';

const LoaderHOC = (Component) => {
    return ({ ...props }) => {
        useWithAuthenticate();
        const mapState = useCallback((state) => ({
            loading: state.sessionState.loading,
        }), []);

        const { loading } = useMappedState(mapState);

        if (loading) return (
            <div className="loader">
                <h1 className="loader__title">Loading...</h1>
            </div>
        );

        return <Component {...props} />;
    };
};

export default LoaderHOC;
