'use client';

import { useEffect, useState } from 'react';
import { WakaTimeCard } from './WakaTimeCard';

export default function WakaTimeStats() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/wakatime');
                if (res.ok) {
                    const json = await res.json();
                    setData(json.data);
                }
            } catch (error) {
                console.error('Failed to fetch WakaTime stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return null; // Or a loading skeleton if preferred

    return <WakaTimeCard data={data} />;
}
