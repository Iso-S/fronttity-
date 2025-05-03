import React from "react";

export default function TrainingForm({
    newTraining,
    customers,
    onInputChange,
    onAddTraining,
    isOpen,
    onClose,
}) {
    if (!isOpen) return null;

    return (
        <div
            className="popup-overlay"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <div
                className="popup-form"
                style={{
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    width: "80%",
                    maxWidth: "500px",
                }}
            >
                <h3>Add New Training</h3>
                <div
                    className="popup-form-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                    }}
                >
                    <input
                        type="text"
                        name="activity"
                        value={newTraining.activity}
                        onChange={onInputChange}
                        placeholder="Activity"
                        style={{
                            padding: "0.5rem",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                    />
                    <input
                        type="number"
                        name="duration"
                        value={newTraining.duration}
                        onChange={onInputChange}
                        placeholder="Duration (minutes)"
                        style={{
                            padding: "0.5rem",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                    />
                    <input
                        type="datetime-local"
                        name="date"
                        value={newTraining.date}
                        onChange={onInputChange}
                        style={{
                            padding: "0.5rem",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                    />
                    <select
                        name="customer"
                        value={newTraining.customer}
                        onChange={onInputChange}
                        style={{
                            padding: "0.5rem",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                    >
                        <option value="">Select Customer</option>
                        {customers.map((customer) => (
                            <option
                                key={customer._links.self.href}
                                value={customer._links.self.href}
                            >
                                {customer.firstname} {customer.lastname}
                            </option>
                        ))}
                    </select>
                </div>
                <div
                    className="popup-buttons"
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "1rem",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#f5f5f5",
                            color: "#333",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onAddTraining}
                        style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#0078d4",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#005a9e")
                        }
                        onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "#0078d4")
                        }
                    >
                        Add Training
                    </button>
                </div>
            </div>
        </div>
    );
}