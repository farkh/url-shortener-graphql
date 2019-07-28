import React, { useState } from 'react'

import './create-link.scss';

const CreateLink = (props) => {
    const [longUrl, setLongUrl] = useState('');
    const [expDate, setExpDate] = useState(null);
    
    const handleInputChange = setter => e => {
        setter(e.target.value);
    };
    
    return (
        <div className="create-link">
            <form className="create-link__form" onSubmit={(e) => props.onSubmit(e, longUrl)}>
                <input
                    type="text"
                    className="g__input"
                    placeholder="Enter the URL..."
                    value={longUrl}
                    onChange={handleInputChange(setLongUrl)}
                />

                <input type="submit" className="g__button g__button--primary" value="Shorten" />
            </form>
        </div>
    );
}

export default CreateLink
