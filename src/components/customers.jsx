import { AgGridReact } from "ag-grid-react";
import { useEffect, useState, useRef } from "react";
import { ClientSideRowModelModule } from 'ag-grid-community';
import { AgGridReact as AgGridReactModule } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef(null);

    const columnDefs = [
        { field: 'firstname', headerName: 'First Name', sortable: true, filter: true, flex: 1 },
        { field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, flex: 1 },
        { field: 'email', headerName: 'Email', sortable: true, filter: true, flex: 1 },
        { field: 'phone', headerName: 'Phone', sortable: true, filter: true, flex: 1 },
        { field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true, flex: 1 },
        { field: 'postcode', headerName: 'Postcode', sortable: true, filter: true, flex: 1 },
        { field: 'city', headerName: 'City', sortable: true, filter: true, flex: 1 }
    ];

    useEffect(() => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            .then(res => res.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ height: 500, width: 1000 }}>
            <AgGridReact
                ref={gridRef}
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
}
