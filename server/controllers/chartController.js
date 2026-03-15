const axios = require('axios');
const User = require('../models/User');

// Fetch user's top tracks from Spotify
const getPersonalChart = async (req, res) => {
    try {
        const { spotifyId, timeRange } = req.params;

        // timeRange options: short_term (4 weeks), medium_term (6 months), long_term (all time)
        const validRanges = ['short_term', 'medium_term', 'long_term'];
        if (!validRanges.includes(timeRange)) {
            return res.status(400).json({ error: 'Invalid time range' });
        }

        // Find user in MongoDB to get their access token
        const user = await User.findOne({ spotifyId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch top tracks from Spotify
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: { 'Authorization': `Bearer ${user.accessToken}` },
            params: {
                time_range: timeRange,
                limit: 50,
            }
        });
                // Format the tracks into chart entries
        const tracks = response.data.items.map((track, index) => ({
            rank: index + 1,
            trackId: track.id,
            title: track.name,
            artist: track.artists.map(a => a.name).join(', '),
            album: track.album.name,
            albumArt: track.album.images[0]?.url,
            duration: track.duration_ms,
            explicit: track.explicit,
            spotifyUrl: track.external_urls.spotify,
        }));

        res.json({
            timeRange,
            totalTracks: tracks.length,
            chart: tracks,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch personal chart' });
    }
};

module.exports = { getPersonalChart };