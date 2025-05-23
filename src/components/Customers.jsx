import { useEffect, useState, useRef, useCallback } from "react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import CustomerGrid from "./CustomerGrid";
import CustomerForm from "./CustomerForm";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Asiakkaan oletusmuoto
const INITIAL_CUSTOMER = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
};

export default function Customer() {
    const [customers, setCustomers] = useState([]); 
    const [showAddForm, setShowAddForm] = useState(false); 
    const [showEditForm, setShowEditForm] = useState(false);
    const [newCustomer, setNewCustomer] = useState(INITIAL_CUSTOMER);
    const [editCustomer, setEditCustomer] = useState(INITIAL_CUSTOMER); 
    const [editCustomerLink, setEditCustomerLink] = useState(""); 
    const gridRef = useRef(null);

    const actionsRenderer = (params) => (
        <div className="grid-action-buttons">
            <button onClick={() => handleEdit(params.data)} className="edit-button">
                Edit
            </button>
            <button onClick={() => handleDelete(params.data)} className="delete-button">
                Delete
            </button>
        </div>
    );

    const columnDefs = [
        { field: "firstname", headerName: "First Name", sortable: true, filter: true, flex: 1 },
        { field: "lastname", headerName: "Last Name", sortable: true, filter: true, flex: 1 },
        { field: "email", headerName: "Email", sortable: true, filter: true, flex: 1 },
        { field: "phone", headerName: "Phone", sortable: true, filter: true, flex: 1 },
        { field: "streetaddress", headerName: "Street Address", sortable: true, filter: true, flex: 1 },
        { field: "postcode", headerName: "Postcode", sortable: true, filter: true, flex: 1 },
        { field: "city", headerName: "City", sortable: true, filter: true, flex: 1 },
        {
            headerName: "Functions",
            cellRenderer: actionsRenderer,
            width: 150,
            sortable: false,
            filter: false,
        },
    ];

    // Asiakastietojen fetchi
    const fetchCustomers = useCallback(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/customers`)
            .then((res) => res.json())
            .then((data) => setCustomers(data._embedded.customers))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const addCustomer = () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/customers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCustomer),
        })
            .then((res) => {
                if (res.ok) {
                    fetchCustomers();
                    setNewCustomer(INITIAL_CUSTOMER);
                    setShowAddForm(false);
                } else {
                    console.error("Something went wrong");
                }
            })
            .catch((err) => console.error(err));
    };

    const handleEdit = (customer) => {
        const customerLink = customer._links.self.href;
        setEditCustomerLink(customerLink);
        setEditCustomer({
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email,
            phone: customer.phone,
            streetaddress: customer.streetaddress,
            postcode: customer.postcode,
            city: customer.city,
        });
        setShowEditForm(true);
    };

    const updateCustomer = () => {
        fetch(editCustomerLink, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editCustomer),
        })
            .then((res) => {
                if (res.ok) {
                    fetchCustomers();
                    setShowEditForm(false);
                } else {
                    console.error("Something went wrong with the update");
                }
            })
            .catch((err) => console.error(err));
    };

    const handleDelete = (customer) => {
        if (window.confirm(`Are you sure you want to delete ${customer.firstname} ${customer.lastname}?`)) {
            const customerLink = customer._links.self.href;
            fetch(customerLink, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.ok) {
                        fetchCustomers();
                    } else {
                        console.error("Delete failed");
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    const closeForm = () => {
        setShowAddForm(false);
        setShowEditForm(false);
    };

    // Asiakastiedot CSV-muotoon
    const exportToCSV = () => {
        const csvData = customers.map(({ firstname, lastname, email, phone, streetaddress, postcode, city }) => ({
            firstname,
            lastname,
            email,
            phone,
            streetaddress,
            postcode,
            city,
        }));

        const csvContent =
            "data:text/csv;charset=utf-8," +
            ["First Name,Last Name,Email,Phone,Street Address,Postcode,City"]
                .concat(csvData.map((row) => Object.values(row).join(",")))
                .join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "customers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <CustomerGrid customers={customers} columnDefs={columnDefs} gridRef={gridRef} />
            <div style={{ margin: "20px" }}>
                <button onClick={() => setShowAddForm(true)} style={{ backgroundColor: "#0078d4", color: "white", padding: "10px 20px", borderRadius: "4px", cursor: "pointer" }}>
                    Add New Customer
                </button>
                <button onClick={exportToCSV} style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", marginLeft: "10px" }}>
                    Export to CSV
                </button>
            </div>
            {showAddForm && (
                <CustomerForm
                    customer={newCustomer}
                    onChange={handleInputChange}
                    onSubmit={addCustomer}
                    onCancel={closeForm}
                    title="Add New Customer"
                    submitLabel="Add Customer"
                />
            )}
            {showEditForm && (
                <CustomerForm
                    customer={editCustomer}
                    onChange={handleEditInputChange}
                    onSubmit={updateCustomer}
                    onCancel={closeForm}
                    title="Edit Customer"
                    submitLabel="Save Changes"
                />
            )}
        </div>
    );
}
