import { useState, useEffect } from "react";
import axios from "axios";
import ChartRow from "./ChartRow";
import Podium from "./Podium";
const TIME_RANGES = [
    { key: "short_term", label: "This Month" },
    { key: "medium_term", label: "6 Months" },
    { key: "long_term", label: "All Time" },
];

export default function ChartPage({ user }) {
    const [timeRange, setTimeRange] = useState("short_term");
    const [chart, setChart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    useEffect(() => {
        const fetchChart = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log(user);
                const res = await axios.get(
                    `http://127.0.0.1:5001/chart/personal/${user.spotifyId}/${timeRange}`
                );
                setChart(res.data.chart);
            } catch (err) {
                setError("Failed to load chart. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchChart();
    }, [timeRange, user.spotifyId]);

    const timeLabel = TIME_RANGES.find((t) => t.key === timeRange)?.label;

    return (
        <div className="app-container">
            <div className="chart-header">
                <div className="show-label">▶ Now Airing</div>
                <div className="chart-title">Personal Chart</div>
                <div className="chart-episode">
                    {dateStr} &nbsp;·&nbsp; {timeLabel} &nbsp;·&nbsp; Top {chart.length}
                </div>
            </div>

            <div className="time-selector">
                {TIME_RANGES.map((range) => (
                    <button
                        key={range.key}
                        className={`time-btn ${timeRange === range.key ? "active" : ""}`}
                        onClick={() => setTimeRange(range.key)}
                    >
                        {range.label}
                    </button>
                ))}
            </div>

            {loading && (
                <div className="loading-wrap">
                    <div className="loading-title">Loading Chart...</div>
                </div>
            )}

            {error && (
                <div className="loading-wrap">
                    <div style={{ color: "#e53e3e" }}>{error}</div>
                </div>
            )}

            {!loading && !error && chart.length > 0 && (
                <>
                <Podium tracks={chart}/>
                <div className="card chart-card">
                    <div className="chart-table-header">
                        <span>#</span>
                        <span></span>
                        <span>Track</span>
                        <span>Link</span>
                    </div>
                    {chart.slice(3).map((track, index) => (
                        <ChartRow key={track.trackId} track={track} index={index} />
                    ))}
                </div>
                </>
            )}
        </div>
    );
}