import { useState, useEffect } from "react";
import Header from "./components/Header";
import ChartPage from "./components/ChartPage";
import LoginPage from "./components/LoginPage";
import "./App.css";

export default function App() {
    const [isDark, setIsDark] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const spotifyId = params.get('spotifyId');
        const displayName = params.get('displayName');
        if (spotifyId && displayName) {
            setUser({ spotifyId, displayName });
            // Clean up the URL
            window.history.replaceState({}, document.title, '/');
        }
    }, []);

    return (
        <div className={isDark ? "app dark" : "app light"}>
            <Header isDark={isDark} setIsDark={setIsDark} user={user} />
            {user ? (
                <ChartPage user={user} isDark={isDark} />
            ) : (
                <LoginPage setUser={setUser} isDark={isDark} />
            )}
        </div>
    );
}
