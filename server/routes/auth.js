const express = require('express');
const router = express.Router();
const { spotifyConfig, getSpotifyToken } = require('../config/spotify');
const axios = require('axios');
const User = require('../models/User');

const scopes = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played',
].join(' ');

router.get('/login', (req, res) => {
    const authUrl = 'https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            response_type: 'code',
            client_id: spotifyConfig.clientId,
            scope: scopes,
            redirect_uri: spotifyConfig.redirectUri,
        });
    res.redirect(authUrl);
});



router.get('/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const tokenData = await getSpotifyToken(code);
        const profileResponse =
            await axios.get('https://api.spotify.com/v1/me', {
                headers: {authorization: `Bearer ${tokenData.access_token}`}
            });
        const profile = profileResponse.data;
        const tokenExpiresAt = new Date(Date.now() + tokenData.expires_in * 1000);
        await User.findOneAndUpdate(
            { spotifyId: profile.id },
            {
                spotifyId: profile.id,
                displayName: profile.display_name,
                email: profile.email,
                accessToken: tokenData.access_token,
                refreshToken: tokenData.refresh_token,
                tokenExpiresAt,
            },
            { upsert: true, new: true }
        );
        //res.json({ message: 'Login successful', user: profile.display_name });
        res.redirect(`${process.env.CLIENT_URL}?spotifyId=${profile.id}&displayName=${encodeURIComponent(profile.display_name)}`);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get token' });
    }
});

module.exports = router;