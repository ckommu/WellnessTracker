import React, { useState, useEffect } from 'react';
import styles from './my-stats-styles.module.css';
import { useUser } from '@clerk/clerk-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyStats = () => {

    const { user } = useUser();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`/api/progress/user/${user?.id}/active`);
                if(!response.ok) {
                    throw new Error('Failed to fetch stats');
                }
                const data = await response.json();
                console.log('Fetched MyStats data:', data);
                setStats(data)
            } catch (err) {
                console.error('Error fetching MyStats: ', err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchStats();
        }
    }, [user]);

    if (loading) {
        return <p>Loading your stats...</p>;
    }

    return (
        <div className={styles.statsContainer}>
            <h1>My Stats</h1>

            <div className={styles.section}>
                <h2>Active Challenge: </h2>
                <p><strong>{stats.challengeTitle}</strong></p>
                <p>Total Progress: {stats.totalLogged} {stats.challengeUnits}</p>
            </div>

            <div className={styles.progressBarContainer}>
                <div className={styles.progressBarBackground}>
                    <div
                        className={styles.progressBarFill}
                        style={{
                            width: `${Math.min((stats.totalLogged / 10000) * 100, 100)}%`,
                        }}
                    ></div>    
                </div>
                <p className={styles.progressText}>
                    {stats.totalLogged} {stats.challengeUnits} logged
                </p>
            </div>

            <div className={styles.section}>
                <h2>Daily Logs: </h2>
                {stats.logs.length > 0 ? (
                    <ul className={styles.logList}>
                        {stats.logs.map((log, index) => (
                            <li key={index}>
                                {new Date(log.date).toLocaleDateString()}: {log.value} {stats.challengeUnits}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No logs yet for this challenge.</p>
                )}
            </div> 
            <div className={styles.section}>
                <h2>Calendar View:</h2>
                <Calendar
                    tileClassName={({ date, view }) => {
                        if (view === 'month') {
                            const loggedDates = stats.logs.map(log => new Date(log.date).toDateString());
                            if (loggedDates.includes(date.toDateString())) {
                                return styles.loggedDay;
                            }
                        }
                        return null;
                    }}
                />
            </div>
        </div>
    );
};

export default MyStats;