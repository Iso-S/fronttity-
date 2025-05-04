import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function TrainingCalendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/trainings`);
            const data = await response.json();
            const trainings = data._embedded.trainings;

            // Muotoillaan harjoitustiedot kalenteritapahtumiksi
            const formattedEvents = await Promise.all(
                trainings.map(async (training) => {
                    let customerName = "Unknown Customer";
                    if (training._links.customer) {
                        // Haetaan asiakkaan tiedot harjoitukselle
                        const customerResponse = await fetch(training._links.customer.href);
                        if (customerResponse.ok) {
                            const customerData = await customerResponse.json();
                            customerName = `${customerData.firstname} ${customerData.lastname}`;
                        }
                    }

                    return {
                        title: `${training.activity} / ${customerName}`,
                        start: new Date(training.date),
                        end: new Date(
                            new Date(training.date).getTime() +
                                training.duration * 60000 // Lisätään harjoituksen kesto minuutteina
                        ),
                    };
                })
            );
            setEvents(formattedEvents);
        } catch (error) {
            console.error("Error fetching trainings:", error);
        }
    };

    return (
        <div style={{ height: 480, width: 1000 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 400 }}
                views={["month", "week", "day", "agenda"]} // Saatavilla olevat näkymät
                defaultView="week" // Oletuksena viikko
            />
        </div>
    );
}