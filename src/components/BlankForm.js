import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { userStateContext } from "../../pages/login-screens/blank";
import DisplayTable from "./DisplayTable";

export default function BlankForm() {
  const user = useContext(userStateContext);
  const { control, errors } = user;

  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-center mb-4">
          <h1 className="h3 mb-0 text-gray-800">User Form</h1>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid>
            <form
              onSubmit={user.handleSubmit((data) => {
                if (user.isedit) {
                  user.editUsers(data.id, data);
                  user.setIsEdit(false);
                } else {
                  user.addUsers(data);
                }
                user.reset();
                console.log(data);
              })}
            >
              <div style={{ margin: "10px" }}>
                <FormLabel component="legend">User Info</FormLabel>
                <Grid xl={12} sx={{ my: 2 }}>
                  <TextField
                    type="text"
                    placeholder="First Name"
                    size="small"
                    {...user.register("firstName")}
                  />
                  {errors.firstName&&<p style={{color:'red',}}>{"⚠ "}{errors.firstName?.message}</p>}
                </Grid>
                <Grid item md={8} sx={{ my: 2 }}>
                  <TextField
                    placeholder="Last Name"
                    size="small"
                    type="text"
                    {...user.register("lastName")}
                  />
                   {errors.lastName&&<p style={{color:'red',}}>{"⚠ "}{errors.lastName?.message}</p>}
                </Grid>
                <Grid item xs={8} sx={{ my: 2 }}>
                  <TextField
                    type="email"
                    placeholder="email"
                    size="small"
                    {...user.register("email")}
                  />
                   {errors.email&&<p style={{color:'red',}}>{"⚠ "}{errors.email?.message}</p>}
                </Grid>
                <Grid item xs={12} sx={{ my: 2 }}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <Controller
                      rules={{ required: true }}
                      control={control}
                      name="gender"
                      render={({ field }) => (
                        <RadioGroup row {...field}>
                          <FormControlLabel
                            value="Male"
                            control={<Radio size="small" />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="Female"
                            control={<Radio size="small" />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="Others"
                            control={<Radio size="small" />}
                            label="Others"
                          />
                        </RadioGroup>
                      )}
                    />
                    {errors.gender&&<p style={{color:'red',}}>{"⚠ "}{errors.gender?.message}</p>}
                  </FormControl>
                </Grid>
                <Grid item xl={12}>
                  <FormLabel component="legend">Technical Skills</FormLabel>
                  <Controller
                    name="technicalSkills"
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...user.register("technicalSkills")}
                              size="small"
                              value="Node"
                              checked={user
                                .getValues("technicalSkills")
                                .includes("Node")}
                            />
                          }
                          label={<span className="font14">Node</span>}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...user.register("technicalSkills")}
                              size="small"
                              value="React"
                              checked={user
                                .getValues("technicalSkills")
                                .includes("React")}
                            />
                          }
                          label={<span className="font14">React</span>}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...user.register("technicalSkills")}
                              size="small"
                              value="JavaScript"
                              checked={user
                                .getValues("technicalSkills")
                                .includes("JavaScript")}
                            />
                          }
                          label={<span className="font14">JavaScript</span>}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...user.register("technicalSkills")}
                              size="small"
                              value={"Mongo DB"}
                              checked={user
                                .getValues("technicalSkills")
                                .includes("Mongo DB")}
                            />
                          }
                          label={<span className="font14">Mongo DB</span>}
                        />
                      </>
                    )}
                  />
                  {errors.technicalSkills&&<p style={{color:'red',}}>{"⚠ "}{errors.technicalSkills?.message}</p>}
                  {/* <Controller
                    name="technicalSkills"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                          {...user.register("technicalSkills")}
                            size="small"
                           
                          />
                        }
                        label={<span className="font14">React</span>}
                      />
                    )}
                  /> */}
                  {/* <Controller
                    name="technicalSkills"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                          {...user.register("technicalSkills")}
                            size="small"
                            
                          />
                        }
                        label={<span className="font14">JavaScript</span>}
                      />
                    )}
                  /> */}
                  {/* <Controller
                    name="technicalSkills"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                          {...user.register("technicalSkills")}
                            size="small"
                            // onChange={(e) => field.onChange(e.target.checked)}
                            // checked={field.value}
                          
                          />
                        }
                        label={<span className="font14">Mongo DB</span>}
                      />
                    )}
                  /> */}
                  {/* <input
                    type="checkbox"
                    {...user.register("technicalSkills")}
                    value="JavaScript"
                  />
                  JavaScript
                  <input
                    type="checkbox"
                    {...user.register("technicalSkills")}
                    value="React"
                  />
                  React
                  <input
                    type="checkbox"
                    {...user.register("technicalSkills")}
                    value="Mongo DB"
                  />
                  Mongo DB
                  <input
                    type="checkbox"
                    {...user.register("technicalSkills")}
                    value="Node"
                  />
                  Node */}
                </Grid>
                <Grid item lg={12}>
                  <FormLabel component="legend">Location</FormLabel>
                  <FormControl sx={{ minWidth: 200 }}>
                    <select defaultValue={""} {...user.register("location")}>
                      <option value="">Select Location</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </FormControl>
                </Grid>
              </div>
              {user.isedit ? (
                <>
                  <Button sx={{ m: 2 }} variant="contained" type="submit">
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      user.setIsEdit(false);
                      user.reset();
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button sx={{ m: 2 }} variant="contained" type="submit">
                  Create User
                </Button>
              )}
            </form>
          </Grid>
        </Box>
        {/* <form
          onSubmit={user.handleSubmit((data) => {
            if (user.isedit) {
              user.editUsers(data.id, data);
              user.setIsEdit(false);
            } else {
              user.addUsers(data);
            }
            user.reset();
            console.log(data);
          })}
        >
          First Name{" "}
          <input type="text" required {...user.register("firstName")} />
          <br />
          Last Name <input type="text" {...user.register("lastName")} />
          <br />
          Email <input type="email" {...user.register("email")} />
          <br />
          Gender{" "}
          <input type="radio" {...user.register("gender")} value="Male" />
          Male
          <input type="radio" {...user.register("gender")} value="Female" />
          Female
          <br />
          Technical Skills{" "}
          <input
            type="checkbox"
            {...user.register("technicalSkills")}
            value="JavaScript"
          />
          JavaScript
          <input
            type="checkbox"
            {...user.register("technicalSkills")}
            value="React"
          />
          React
          <input
            type="checkbox"
            {...user.register("technicalSkills")}
            value="Mongo DB"
          />
          Mongo DB
          <input
            type="checkbox"
            {...user.register("technicalSkills")}
            value="Node"
          />
          Node
          <br />
          Location{" "}
          <select {...user.register("location")}>
            <option value="">Select Location</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
          <br />
          {user.isedit ? (
            <>
              <button type="submit">Save</button>
              <button
                onClick={() => {
                  user.setIsEdit(false);
                  user.reset();
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button type="submit">Create User</button>
          )}
        </form> */}
      </div>
      <DisplayTable />
    </>
  );
}
