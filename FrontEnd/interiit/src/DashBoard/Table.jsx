import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
export default function BasicTable({ ...props }) {
  const [data, setData] = React.useState({ ...props }.data);
  let ArrayForRender = null;
  if (data) ArrayForRender = Object.entries(data);
  //   console.log(ArrayForRender, "Array For Render");
  ArrayForRender = ArrayForRender.slice(1);
  let FinalArray = ArrayForRender.pop();
  // console.log(FinalArray, "Table Data");
  const col2Vals = Object.values(FinalArray[1]);
  const col1Vals = Object.keys(FinalArray[1]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 645 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {col1Vals.map((row, index) => (
            <TableRow
              key={col1Vals}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="right">
                {col2Vals[index] !== "—" ? col2Vals[index] :<DoNotDisturbAltIcon/>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
