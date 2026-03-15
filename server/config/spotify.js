const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const spotifyConfig = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
};

const getSpotifyToken = async (code) => {
    const response = await axios.post('https://accounts.spotify.com/api/token',
        new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: spotifyConfig.redirectUri,
        }),
        {
            headers: {
                'Authorization': 'Basic ' + Buffer.from(
                    spotifyConfig.clientId + ':' + spotifyConfig.clientSecret
                ).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    return response.data;
};

module.exports = { spotifyConfig, getSpotifyToken };