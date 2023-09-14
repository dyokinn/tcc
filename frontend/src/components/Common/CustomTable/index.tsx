import { DataGrid} from '@mui/x-data-grid';
import resultColumns from '../../../assets/utils/columns';
import "./index.scss"

interface CustomTableProps {
    rows: any[]
}

const CustomTable = (props: CustomTableProps) => {
    
      
    return (
        <div style={{ height: "60vh", width: '90%', }}>
            <DataGrid
                rows={props.rows}
                columns={resultColumns}
                className='datagrid'
                getCellClassName={(cell) => "cell"}
                getRowId={row => row.id}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 25 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    )
}

export default CustomTable