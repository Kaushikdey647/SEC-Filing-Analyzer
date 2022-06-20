import { Typography } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { Chart } from "react-google-charts";
import { useLocation } from "react-router-dom";
function MLPrediction({ ...props }) {
  console.log(props);
  const {state}=useLocation()
  const {tickerName}=state
  console.log(tickerName,"tickerName")
  const [GraphData, setGraphData] = React.useState([]);
  let finalArr = [];
  const [g, setG] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      console.log("fuck me");
      try {
        const data = await axios.get(
          `http://127.0.0.1:8000/api/pred?q=${tickerName}`
        );
        setGraphData(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    let arr1 = [];
    let arr2 = [];
    let ArrFinal = [];
    console.log("BEFORE IF", GraphData.data);
    if (GraphData.data) {
      console.log(GraphData);
      arr1 = Object.keys(GraphData.data);
      arr2 = Object.values(GraphData.data);
      console.log(arr1, "Arr1");
      console.log(arr2, "Arr2");
      for (let elem in arr1) {
        let ok = [];
        if (arr2[elem] != 0) {
          ok.push(arr1[elem], arr2[elem]);
          ArrFinal.push(ok);
        }
      }
      console.log("Graph Data", ArrFinal);
      setG(ArrFinal);
    }
  },[]);
  function call(e) {
    return <>e</>;
  }
  return (
    <>
      {g ? (
        <Chart
          chartType="Line"
          width="100%"
          data={g}
          options={{
            title: "Predicted",
            curveType: "function",
            height: "2000px",
            legend: { position: "bottom" },
            interpolateNulls: true,
          }}
        />
      ) : <>
      <Typography variant="h1">404</Typography>
      </>}
    </>
  );
}
export default MLPrediction;
