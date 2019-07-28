const express = require('express');

import Url from '../models/Url';
const router = express.Router();

// @route   GET /:code
// @desc    Redirect to original URL
router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });

        if (url) {
            const { longUrl, expirationDate } = url;
            const currDate = new Date();

            if (expirationDate < currDate) {
                url.remove();
                return res.status(400).json('URL expired');
            }
            
            return res.redirect(longUrl);
        } else {
            return res.status(404).json('No url found');
        }
    } catch (err) {
        console.error('Redirect error:', err);
        res.status(500).json('Redirect error');
    }
});

module.exports = router;

