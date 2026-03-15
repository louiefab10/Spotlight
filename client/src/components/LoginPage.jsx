const SPOTIFY_LOGIN_URL = "https://spotlight-production-b4db.up.railway.app/auth/login";

export default function LoginPage({ isDark }) {
    const today = new Date();
    const episode = Math.floor((today - new Date("2024-01-01")) / (7 * 24 * 60 * 60 * 1000));

    return (
        <div className="login-page">
            <div className="login-show-title">SPOT<span>LIGHT</span></div>
            <div className="login-subtitle">Your Personal Music Chart Show</div>

            <div className="card login-card">
                <p className="login-desc">
                    Connect your Spotify account to make your personal music chart —
                    ranked by your listening history across different time periods,
                    just like your favorite K-pop music shows.
                </p>
                <a href={SPOTIFY_LOGIN_URL} className="spotify-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Connect with Spotify
                </a>
            </div>
        </div>
    );
}