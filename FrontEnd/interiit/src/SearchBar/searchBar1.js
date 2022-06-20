import * as React from "react";
import "./searchBar1.css";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  ListItem,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import WowSuchEmpty from "../resources/reddit.png";
import { CompanyContext } from "../CompanyData";
import Card from "@mui/material/Card";
import { Zoom } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import axios from "axios";
import SingleCard from "./SingleCard";
import DataRender from "./RenderDataList";
export default function SearchBar({ ...props }) {
  const [searchCancel, setSearchCancel] = React.useState("search");

  const [searchCancel1, setSearchCancel1] = React.useState("search");
  const [searchQuery, setSearchQuery] = React.useState(null);
  const [searchQueryNotSure, setSearchQueryNotSure] = React.useState(null);
  const [manageSure, setManageSure] = React.useState(false);
  const [manageNotSure, setManageNotSure] = React.useState(false);
  const [dataWhenNotSure, setDataWhenNotSure] = React.useState(null);
  const [dataWhenSure, setDataWhenSure] = React.useState(null);
  async function HandleQueryWhenSure() {
    try {
      let stringok = searchQuery;
      if (stringok) stringok = stringok.toUpperCase();
      else stringok = "";
      setSearchQuery(stringok);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/strict?q=${stringok}`
      );
      // console.log(response.data);
      setDataWhenSure(response.data);
    } catch (err) {
      // console.log("huehue", err);
    }
    if (searchCancel === "search") setSearchCancel("cancel");
    else {
      setSearchCancel("search");

      setDataWhenSure([]);
    }
  }
  async function HandleQueryWhenNotSure() {
    // console.log(searchQueryNotSure);
    // console.log("Context Clicked")
    try {
      let stringok = searchQueryNotSure;
      if (stringok) stringok = stringok.toUpperCase();
      else stringok = "";
      setSearchQueryNotSure(stringok);
      const response = await axios.get(
        `http://localhost:8000/api/?q=${stringok}`
      );
      // console.log(response.data);
      setDataWhenNotSure(response.data);
    } catch (err) {
      console.log(err);
    }
    if (searchCancel1 === "search") {
      setSearchCancel1("cancel");
    } else {
      setSearchCancel1("search");
      setDataWhenNotSure([]);
    }
  }
  return (
    <>
      <Stack spacing={2} className="Base1">
        <ListItem>
          <div className="Base">
            <Card className="OutSideCard">
              <div className="searchBar">
                <Grid container className="TopGrid">
                  <Grid item xs={12} sm={6} style={{ backgroundColor: "" }}>
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item xs={3}>
                        <Stack alignContent={"center"}>
                          <ListItem>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setManageSure(!manageSure);
                              }}
                              endIcon={<AssessmentIcon />}
                            >
                              Sure about company ticker
                            </Button>
                          </ListItem>
                        </Stack>
                        <Stack sx={{ width: "100%", margin: "auto" }}>
                          <ListItem
                            style={{ marginTop: "-13px", alignItems: "center" }}
                          >
                            <Slide
                              direction="up"
                              in={manageSure}
                              mountOnEnter
                              unmountOnExit
                            >
                              <FormControl variant="standard">
                                <InputLabel
                                  htmlFor="standard-adornment-password"
                                  className="LabelText"
                                >
                                  Search
                                </InputLabel>
                                <Input
                                  id="standard-adornment-password"
                                  onKeyDown={(e) => {
                                    if (e.keyCode == 13) HandleQueryWhenSure();
                                  }}
                                  type="text"
                                  value={searchQuery}
                                  onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                  }
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={HandleQueryWhenSure}
                                        onMouseDown={(e) => e.preventDefault()}
                                      >
                                        {searchCancel === "search" ? (
                                          <SearchIcon />
                                        ) : (
                                          <CancelIcon />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>
                            </Slide>
                          </ListItem>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      style={{ backgroundColor: "" }}
                    >
                      <Grid item xs={3} style={{ backgroundColor: "" }}>
                        <Stack style={{ margin: "auto", backgroundColor: "" }}>
                          <ListItem>
                            <Button
                              variant="contained"
                              onClick={() => setManageNotSure(!manageNotSure)}
                              endIcon={<ThumbDownOffAltIcon />}
                            >
                              Not Sure about company ticker?
                            </Button>
                          </ListItem>
                        </Stack>
                        <Stack sx={{ width: "100%", margin: "auto" }}>
                          <ListItem style={{ marginTop: "-13px" }}>
                            <Slide
                              direction="up"
                              in={manageNotSure}
                              mountOnEnter
                              unmountOnExit
                            >
                              <FormControl variant="standard">
                                <InputLabel
                                  htmlFor="standard-adornment-password"
                                  className="LabelText"
                                >
                                  Search
                                </InputLabel>
                                <Input
                                  id="standard-adornment-password"
                                  onKeyDown={(e) => {
                                    if (e.keyCode == 13)
                                      HandleQueryWhenNotSure();
                                  }}
                                  type="text"
                                  value={searchQueryNotSure}
                                  onChange={(e) =>
                                    setSearchQueryNotSure(e.target.value)
                                  }
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={HandleQueryWhenNotSure}
                                        onMouseDown={(e) => e.preventDefault()}
                                      >
                                        {searchCancel1 === "search" ? (
                                          <SearchIcon />
                                        ) : (
                                          <CancelIcon />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>
                            </Slide>
                          </ListItem>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Card>
          </div>
        </ListItem>
        <ListItem>
          <div className="Base">
            <Typography variant="h4" className="Typo">
              Details About Companies of which You knew ticker about
            </Typography>
            <div className="OutSideCard">
              {/* {console.log(searchCancel, searchCancel1, "searchCancels")} */}
              {/* <DataRender func={props.x} data={dataWhenSure} toggler={searchCancel} check={`SingleData`} /> */}
              {console.log(dataWhenSure, "OK")}
              {dataWhenSure ? (
                <Zoom
                  in={searchCancel === "cancel"}
                  style={{ transitionDelay: `${1}00ms` }}
                >
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={3} style={{ backgroundColor: "" }}>
                      <SingleCard data={dataWhenSure.data} />
                    </Grid>
                  </Grid>
                </Zoom>
              ) : (
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={3} style={{ backgroundColor: "" }}>
                    <Grid
                      container
                      spacing={12}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item xs={12} sm={12} md={12}>
                        <img src={WowSuchEmpty} alt="ok" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </div>
          </div>
        </ListItem>
        <ListItem>
          <div className="Base">
            <Typography variant="h4" className="Typo">
              Details About Companies of which You were unsure of
            </Typography>
            <div className="OutSideCard">
              {/* {console.log(searchCancel, searchCancel1, "searchCancels")} */}
              <DataRender
                func={props.x}
                data={dataWhenNotSure}
                toggler={searchCancel1}
                check={`MultipleData`}
              />
            </div>
          </div>
        </ListItem>
      </Stack>
    </>
  );
}
