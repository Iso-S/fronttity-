import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import _ from "lodash";

export default function Statistics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/trainings`);
            const result = await response.json();
            const trainings = result._embedded.trainings;

            const grouped = _.groupBy(trainings, "activity");
            const chartData = Object.keys(grouped).map(activity => ({
                activity,
                minutes: _.sumBy(grouped[activity], "duration")
            }));

            setData(chartData);
        } catch (error) {
            console.error("Error fetching trainings:", error);
        }
    };

    return (
        <div style={{ width: 1000, height: 480, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
            <ResponsiveContainer width="80%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis label={{ value: 'Minuutit', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="minutes" fill="#8884d8" name="Varatut minuutit" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}