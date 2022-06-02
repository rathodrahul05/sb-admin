import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { userStateContext } from "../../pages/login-screens/blank";

export default function DisplayTable() {
  const user = React.useContext(userStateContext);
  const showValues=(row)=>{
    user.setValue('id',row.id)
    user.setValue("firstName", row.firstName);
    user.setValue("lastName", row.lastName);
    user.setValue("gender", row.gender);
    user.setValue("email", row.email);
    user.setValue("technicalSkills", row.technicalSkills);
    user.setValue("location", row.location);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Technical Skills</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.users?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">
                {row.technicalSkills.length==0?'NA':row.technicalSkills.toString()}
              </TableCell>
              <TableCell align="center">{row.location}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  onClick={() => {
                    user.setIsEdit(true);
                    showValues(row)
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="outlined"
                  onClick={() => user.deleteUsers(row.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
