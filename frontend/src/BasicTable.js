import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ props }) {
  //console.log("this is the table");
  //console.log(props);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Track Name</TableCell>
            <TableCell align="right">artist name</TableCell>
            <TableCell align="right">energy</TableCell>
            <TableCell align="right">loudness</TableCell>
            <TableCell align="right">valence</TableCell>
            <TableCell align="right">ablum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((prop) => (
            <TableRow
              key={prop.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {prop.name}
              </TableCell>
              <TableCell align="right">{prop.artist}</TableCell>
              <TableCell align="right">{prop.energy}</TableCell>
              <TableCell align="right">{prop.loudness}</TableCell>
              <TableCell align="right">{prop.valence}</TableCell>
              <TableCell align="right">
                <img
                  width="100"
                  height="100"
                  clip-path="circle(50.0% at 50% 50%)"
                  src={prop.img}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
