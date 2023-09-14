import { GridColDef } from "@mui/x-data-grid";

const resultColumns: GridColDef[] = [
    { field: 'content', headerName: 'Content', flex: 7, headerClassName: "header", headerAlign: "center"},
    { field: 'score', headerName: 'Score', flex: 1, headerClassName: "header", headerAlign: "center", align: "center"},
  ];

export default resultColumns