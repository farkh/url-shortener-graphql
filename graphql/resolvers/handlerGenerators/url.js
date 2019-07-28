import validUrl from 'valid-url';
import shortid from 'shortid';

import Url from '../../../models/Url';
import { baseUrl } from '../../../config/default';

export const createUrl = async (args) => {
    const { longUrl, expDate } = args;

    const urlCode = shortid.generate();

    if (!longUrl || longUrl.length === 0) throw new Error('longUrl required');

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) return url;
            else {
                const shortUrl = `${baseUrl}/${urlCode}`;
                const creationDate = new Date();
                const expirationDate = expDate ? 
                    expDate :
                    new Date().setDate(creationDate.getDate() + 1);

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    creationDate,
                    expirationDate,
                });

                await url.save();
                return url;
            }
        } catch (err) {
            throw err;
        }
    } else {
        throw new Error('Invalid longUrl');
    }
};

export const getUrl = async (args, req, res) => {
    const { urlCode } = args;

    try {
        const url = Url.findOne({ urlCode });

        if (url) {
            const { longUrl, expirationDate } = url;
            const currDate = new Date();

            if (expirationDate < currDate) {
                url.remove();
                throw new Error('URL expired');
            }

            console.log('RESPONSE', res, typeof res.redirect);
            return url;
        } else throw new Error('No URL found');
    } catch (err) {
        throw err;
    }
};
