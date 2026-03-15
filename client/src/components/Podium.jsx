export default function Podium({tracks}){
    if(!tracks || tracks.length < 3) return null;
    const [silver, gold, bronze] = [tracks[1], tracks[0], tracks[2]];
    const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };

    const Card = ({track, isCenter}) => (
        <div className={`top3-card ${isCenter ? "top3-center" : "top3-side"}`}>
            <div className="top3-rank-badge">
                <span className={`top3-rank rank-${track.rank}`}>{medals[track.rank]}</span>
            </div>
            <div className="top3-art-wrap">
                {track.albumArt ? (
                    <img src={track.albumArt} alt={track.album} className="top3-art" />
                ) : (
                    <div className="top3-art-placeholder">♪</div>
                )}
                {isCenter && <div className="top3-spotlight" />}
            </div>
            <div className="top3-info">
                <div className="top3-title">{track.title}</div>
                <div className="top3-artist">{track.artist}</div>
            </div>
            <a href={track.spotifyUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="top3-spotify-btn"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Open in Spotify
            </a>
        </div>
    );
    return (
        <div className="top3-section">
            <div className="top3-label">▶ TOP CONTENDERS</div>
            <div className="top3-podium">
                <Card track={silver} isCenter={false} />
                <Card track={gold} isCenter={true} />
                <Card track={bronze} isCenter={false} />
            </div>
        </div>
    );
}