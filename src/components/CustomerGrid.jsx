import { AgGridReact } from "ag-grid-react";

export default function CustomerGrid({ customers, columnDefs, gridRef }) {
    return (
        <div style={{ height: 400, width: 1000 }}>
            {/* AG-Grid-komponentti asiakastietojen näyttämiseen */}
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