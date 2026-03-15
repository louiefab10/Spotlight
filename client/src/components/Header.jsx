export default function Header({ isDark, setIsDark, user }) {
    return (
        <header className="header">
            <div className="header-inner">
                <div className="logo">
                    SPOT<span>LIGHT</span>
                </div>
                <div className="header-right">
                    {user && (
                        <span className="user-badge">▶ {user.displayName}</span>
                    )}
                    <label className="toggle-switch" title="Toggle theme">
                        <input
                            type="checkbox"
                            checked={!isDark}
                            onChange={() => setIsDark(!isDark)}
                        />
                        <span className="toggle-slider" />
                    </label>
                </div>
            </div>
        </header>
    );
}