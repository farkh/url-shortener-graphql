import React, { useCallback, useState, useEffect } from 'react';
import { useMappedState } from 'redux-react-hook';
import axios from 'axios';

import AuthHome from './auth';
import NonAuthHome from './nonauth';
import CreateLink from '../CreateLink/CreateLink';

const Home = () => {
    useEffect(() => {
        const shorten = document.getElementById('short-url');

        if (loading) return;

        shorten.addEventListener("copy", function(event) {
            event.preventDefault();
            if (event.clipboardData) {
                event.clipboardData.setData("text/plain", shorten.textContent);
                console.log(event.clipboardData.getData("text"))
            }
        });
    });
    
    const [shortUrl, setShortUrl] = useState('');
    const mapState = useCallback((state) => ({
        authUser: state.sessionState.authUser,
        loading: state.sessionState.loading,
    }), []);
    
    const { authUser, loading } = useMappedState(mapState);

    if (loading) return <h1>Loading!</h1>;

    const handleSubmitForm = async (e, longUrl) => {
        if (e) e.preventDefault();

        const requestBody = {
            query: `
                mutation {
                    createUrl(longUrl: "${longUrl}") {
                        shortUrl
                    }
                }
            `,
        };

        try {
            const { data } = await axios.post('/api', requestBody);

            if (data.errors) {
                console.error('errors', data.errors[0].message);
            } else {
                const { shortUrl: shorten } = data.data.createUrl;
                setShortUrl(shorten);
            }

            console.log('data', data);
        } catch (err) {
            console.error('err', err);
        }

        console.log('SUbmit', longUrl);
    };
    
    return (
        <div className="home">
            <CreateLink onSubmit={handleSubmitForm} />
            <code
                id="short-url"
                onClick={() => document.execCommand("copy")}
            >
                {shortUrl ? shortUrl : ''}
            </code>
        </div>
    )
    // return authUser ? <AuthHome /> : <NonAuthHome />;
};

export default Home;
