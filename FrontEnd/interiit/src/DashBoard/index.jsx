import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fallBackImage from "../resources/MicrosoftTeams-image.png";
import MLRender from "./ML";
import { Chart } from "react-google-charts";
import {
  IconButton,
  Button,
  Card,
  Collapse,
  Grid,
  TextField,
  CardHeader,
  Avatar,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Appbar from "../AppBar/index";
import DetailList from "./ListDetail";
import ComplexData from "./Table";
import DateAdapter from "@mui/lab/AdapterDateFns";
import GraphCard from "./DashBoard1";
import "moment-timezone";
import axios from "axios";
export default function DashBoard() {
  const [Stonks, SetStonks] = React.useState(null);
  const [GraphData, setGraphData] = React.useState(null);
  const { state } = useLocation();
  const { data } = state;
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(Date());
  const [expandedForChart, setExpanedForChart] = React.useState(false);
  const [FinalExpandedForCharts, setFinalExpandedForCharts] =
    React.useState(false);

  const navigate = useNavigate()
  // console.log(data, "hue");
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  //  {
  //        "date":"2017-01-01",
  //        "cik":796343
  //    }

  async function showAllGraphs() {
    setFinalExpandedForCharts(!FinalExpandedForCharts);
    let date = convert(value.toString());
    setValue(date);
    const sendObj = {
      date: date,
      cik: data.cik,
    };
    let params = JSON.stringify(sendObj);
    // console.log(JSON.stringify(sendObj));
    // console.log(typeof date, data.cik);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/bs?q1=${sendObj.cik}&q2=${date}`
      );
      // console.log(response.data, "res");
      setGraphData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(data, "just before url")
  const [url, setUrl] = React.useState(
    `https://eodhistoricaldata.com/img/logos/US/${data.ticker}.png`
  );

  const errorHandlerForImageLink = (e) => {
    setUrl(fallBackImage);
    // console.log(url);
    e.target.src = fallBackImage;
    // console.log("Image Error")
  };
  React.useEffect(() => {}, [url]);

  let ayo = [];
  React.useEffect(() => {
    async function GetStonks() {
      let ayo1 = [];
      try {
        const finalData = await axios.get(
          `http://127.0.0.1:8000/api/stock?q=${data.ticker}`
        );
        console.log(finalData.data.data);
        SetStonks(finalData.data.data);
        let arr = finalData.data.data;
        let arr1 = Object.keys(arr);
        let arr2 = Object.values(arr);
        for (let index in arr1) {
          let dk = [];
          if (index !== "0") {
            // console.log(index,"index")
            dk.push(arr1[index]);
            dk.push(arr2[index]);
            // dk.push(arr1[index]);
            // dk.push(arr2[index]);
          }
          if (dk.length) ayo1.push(dk);
          dk = [];
        }
        SetStonks(ayo1);
      } catch (error) {
        console.log(error);
      }
    }
    GetStonks();
    console.log("Page Loaded");
  }, []);

  console.log(ayo, "alright");
  function handle() {
    navigate("./MLPred",{state:{tickerName:data.ticker}})
  }
  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Appbar />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <Grid
              container
              spacing={10}
              alignItems="center"
              columnSpacing={1}
              justifyContent="center"
              style={{ paddingTop: "40px" }}
            >
              <Grid item xs={12} sm={12} md={6} style={{}}>
                <Card sx={{ maxWidth: 1245, paddingTop: "20px" }}>
                  <CardHeader
                    action={
                      <IconButton
                        aria-label="settings"
                        sx={{ heigh: 200, width: 200 }}
                      >
                        <Avatar
                          src={url}
                          sx={{ height: 100, width: 100 }}
                          imgProps={{ onError: errorHandlerForImageLink }}
                        />
                      </IconButton>
                    }
                    title={data.title}
                    subheader={data.ticker}
                  />
                  <DetailList data={data} />
                  <Button
                    onClick={() => {
                      setExpanded(!expanded);
                    }}
                  >
                    {!expanded
                      ? `See More Details About Company`
                      : `See Less Details About Company`}
                  </Button>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <ComplexData data={data} />
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item xs={3}>
                        {console.log(Stonks)}
                        {Stonks ? (
                          <Chart
                            chartType="LineChart"
                            data={Stonks}
                            style={{ paddingTop: "20px" }}
                            options={{
                              title: `Stock Graph`,

                              curveType: "function",
                              height: "200px",
                              legend: { position: "bottom" },
                              interpolateNulls: true,
                            }}
                          />
                        ) : null}
                      </Grid>
                    </Grid>
                  </Collapse>
                  <Button
                    onClick={() => {
                      setExpanedForChart(!expandedForChart);
                    }}
                  >
                    {!expandedForChart ? `See charts` : `Unsee Charts`}
                  </Button>
                  <Collapse in={expandedForChart} timeout="auto" unmountOnExit>
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item xs={3}>
                        <DatePicker
                          disableFuture
                          label="Enter The Date For Viewing Graphs"
                          openTo="year"
                          views={["year", "month", "day"]}
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              style={{
                                marginBottom: "12px",
                                marginTop: "22px",
                              }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={3} style={{ paddingBottom: "200px" }}>
                        <Button
                          style={{ marginBottom: "22px" }}
                          onClick={showAllGraphs}
                        >
                          {!FinalExpandedForCharts
                            ? `See Graphs`
                            : `Unsee Graphs`}
                        </Button>
                        <Collapse
                          in={FinalExpandedForCharts}
                          style={{ width: "800px" }}
                          timeout="auto"
                          unmountOnExit
                        >
                          <GraphCard data={GraphData} />
                        </Collapse>
                      </Grid>
                    </Grid>
                  </Collapse>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Card sx={{ maxWidth: 645 }}>
                  {/* <DetailList data={data} /> */}
                  <Button onClick={handle}>Click To See ML predictions</Button>
                  {/* <Button
                    onClick={() => {
                      setExpanedForChart(!expandedForChart);
                    }}
                  >
                    {!expandedForChart
                      ? `See More Details`
                      : `See Less Details`}
                  </Button> */}
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
}
