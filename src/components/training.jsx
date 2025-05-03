import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react"
import dayjs from 'dayjs'

export default function Training() {
    const [training, setTraining] = useState([])

    const dateCellRenderer = (params) => {
        return dayjs(params.value).format('DD.MM.YYYY HH:mm');
    };

    const [columnDefs] = useState([
        { field: 'activity', sortable: true, filter: true, floatingFilter: true, flex: 2 },
        { field: 'duration', sortable: true, filter: true, floatingFilter: true, flex: 2 },
        { field: 'date', sortable: true, filter: true, floatingFilter: true, cellRenderer: dateCellRenderer, flex: 2 },
        { field: 'customer', valueGetter: (params) => {
                return params.data.firstname && params.data.lastname ? 
                    `${params.data.firstname} ${params.data.lastname}` : 'N/A or not available';
            },
            sortable: true, filter: true, floatingFilter: true, flex: 3 
        },
    ]);
    
    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', { method: 'GET' });
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
                                lastname: customerData.lastname
                            };
                        }
                        return training;
                    } catch (error) {
                        console.error('Error fetching customer data:', error);
                        return training; 
                    }
                })
            );
            
            setTraining(trainingsWithCustomers);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ width: 1000, height: 500 }}>
            <AgGridReact
                pagination={true}
                paginationPageSize={10}
                rowData={training}
                columnDefs={columnDefs}
            />
        </div>
    );
}
