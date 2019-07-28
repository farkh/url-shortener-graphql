import React, { useState } from 'react';
import axios from 'axios';

import CreateLink from '../CreateLink/CreateLink';

const Home = () => {
    const [shortUrl, setShortUrl] = useState('');

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
            <code id="short-url">
                {shortUrl}
            </code>
        </div>
    )
};

export default Home;
