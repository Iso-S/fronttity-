import { AgGridReact } from "ag-grid-react";

export default function TrainingGrid({ training, columnDefs }) {
    return (
        <div style={{ width: 1000, height: 400 }}>
            <AgGridReact
                pagination={true}
                paginationPageSize={10}
                rowData={training}
                columnDefs={columnDefs}
            />
        </div>
    );
}