import { useEffect, useState } from "react";
import dayjs from "dayjs";
import TrainingForm from "./TrainingForm";
import TrainingGrid from "./TrainingGrid";

export default function Training() {
    const [training, setTraining] = useState([]);
    const [newTraining, setNewTraining] = useState({
        activity: "",
        duration: "",
        date: "",
        customer: "",
    });
    const [customers, setCustomers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    const dateCellRenderer = (params) => {
        return dayjs(params.value).format("DD.MM.YYYY HH:mm");
    };

    const [columnDefs] = useState([
        { field: "activity", sortable: true, filter: true, floatingFilter: true, flex: 2 },
        { field: "duration", sortable: true, filter: true, floatingFilter: true, flex: 2 },
        { field: "date", sortable: true, filter: true, floatingFilter: true, cellRenderer: dateCellRenderer, flex: 2 },
        {
            field: "customer",
            valueGetter: (params) => {
                return params.data.firstname && params.data.lastname
                    ? `${params.data.firstname} ${params.data.lastname}`
                    : "N/A or not available";
            },
            sortable: true,
            filter: true,
            floatingFilter: true,
            flex: 3,
        },
        {
            headerName: "Actions",
            cellRenderer: (params) => (
                <button
                    onClick={() => deleteTraining(params.data)}
                    style={{
                        backgroundColor: "#d9534f",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "3px",
                        cursor: "pointer",
                    }}
                >
                    Delete
                </button>
            ),
            flex: 1,
        },
    ]);

    useEffect(() => {
        getTrainings();
        getCustomers();
    }, []);

    const getTrainings = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/trainings`);
            const responseData = await response.json();
            const trainings = responseData._embedded.trainings;

            const trainingsWithCustomers = await Promise.all(
                trainings.map(async (training) => {
                    try {
                        if (training._links && training._links.customer && training._links.customer.href) {
                            const customerUrl = training._links.customer.href;
                            const customerResponse = await fetch(customerUrl);

                            if (!customerResponse.ok) {
                                throw new Error(`Failed to fetch customer: ${customerResponse.status}`);
                            }

                            const customerData = await customerResponse.json();
                            return {
                                ...training,
                                firstname: customerData.firstname,
                                lastname: customerData.lastname,
                            };
                        }
                        return training;
                    } catch (error) {
                        console.error("Error fetching customer data:", error);
                        return training;
                    }
                })
            );

            setTraining(trainingsWithCustomers);
        } catch (error) {
            console.error(error);
        }
    };

    const getCustomers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/customers`);
            const responseData = await response.json();
            setCustomers(responseData._embedded.customers);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    const addTraining = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/trainings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTraining),
            });

            if (response.ok) {
                getTrainings();
                setNewTraining({ activity: "", duration: "", date: "", customer: "" });
                setShowAddForm(false);
            } else {
                console.error("Failed to add training");
            }
        } catch (error) {
            console.error("Error adding training:", error);
        }
    };

    const deleteTraining = async (training) => {
        if (window.confirm(`Are you sure you want to delete this training?`)) {
            try {
                const response = await fetch(training._links.self.href, { method: "DELETE" });

                if (response.ok) {
                    getTrainings();
                } else {
                    console.error("Failed to delete training");
                }
            } catch (error) {
                console.error("Error deleting training:", error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTraining((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <TrainingForm
                newTraining={newTraining}
                customers={customers}
                onInputChange={handleInputChange}
                onAddTraining={addTraining}
                isOpen={showAddForm}
                onClose={() => setShowAddForm(false)}
            />
            <TrainingGrid training={training} columnDefs={columnDefs} />
            <div style={{ margin: "20px" }}>
                <button onClick={() => setShowAddForm(true)} style={{ backgroundColor: "#0078d4", color: "white", padding: "10px 20px", borderRadius: "4px", cursor: "pointer" }}>
                    Add New Training
                </button>
            </div>
        </div>
    );
}
