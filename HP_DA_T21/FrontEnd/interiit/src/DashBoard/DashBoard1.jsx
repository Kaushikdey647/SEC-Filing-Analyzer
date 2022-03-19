import * as React from "react";
import Card from "@mui/material/Card";
import {Chart} from "react-google-charts";
import {CardContent} from "@mui/material";
import Caros from "./caros"

export default function GraphCard({...props}) {
  const [Graph, SetGraph] = React.useState([]);
  let datax = props;
  // console.log(datax, Graph, "Graphical Data");
  React.useEffect(() => {
    if (datax.data) SetGraph(datax.data.data);
    datax = props;
  });
  // const DataOuline=[["date","keys"],[vals,vasl]]
  let FinalArr = [];
  React.useEffect(() => {}, [FinalArr, Chart]);
  ProcessData();
  // console.log(FinalArr, "Allright");
  function ProcessData() {
    for (let elem of Graph) {
      let arr1 = Object.keys(elem);
      let arr2 = Object.values(elem);
      if (!FinalArr.length) FinalArr.push(arr1);
      FinalArr.push(arr2);
    }
    // console.log(FinalArr, "BeforeComplex");
    function isObject(obj) {
      return obj === Object(obj);
    }
    if (FinalArr.length) {
      FinalArr = MultiGraphDataProcessor(FinalArr);
    }
  }
  function MultiGraphDataProcessor(finalArr) {
    let Daddy = [];
    let i = 1;
    while (i < finalArr[0].length - 2) {
      let stepMom = [];
      let stepDaughterx = [];
      for (let stepDaughter of FinalArr) {
        stepMom.push(stepDaughter[0]);
        stepMom.push(stepDaughter[i]);
        if (stepDaughter[i] != 0)
          stepDaughterx.push(stepMom);
        stepMom = [];
      }
      i += 1;
      // console.log(stepDaughterx,"GILF")
      Daddy.push(stepDaughterx);
    }
    return Daddy;
  }
  // console.log(FinalArr, "Finally!!!!!");
  // console.log();
  const data = [
    ["Date", "Value"],
    ["2004", 1000],
    ["2005", 1170],
    ["2006", 660],
    ["2007", 1030],
  ];
  const options = {
    title: "Company Performance",
    curveType: "function",
    legend: {position: "bottom"},
  };
  function callBack(elem) {
    // console.log(elem, "huehuehe");
    return (
      <Chart
        chartType="Line"
        width="100%"
        data={elem}
        options={{
          title: elem[0][1],
          curveType: "function",
          height: "2000px",
          legend: {position: "bottom"},
          interpolateNulls: true,
        }}
      />
    );
  }
  return (
    <Card sx={{maxWidth: 600, paddingTop: "20px"}}>
      <CardContent style={{paddingTop: "2px"}}>
        {/* {FinalArr ? FinalArr.map(callBack) : <></>} */}
        {/* {console.log(FinalArr[2][0][1],"title")} */}
        {FinalArr ? (
          <div style={{paddingBottom: "20px"}}>
            {/* <Carousel
              NextIcon={<NavigateNextIcon />}
              sx={{
                minHeight: "200px",
                paddingBottom: "20px",
                paddingTop: "30px",
                backgroundColor: "",
              }}
            > */}
            <Caros data={FinalArr} />
            {/* <Swiper>
              {FinalArr.map((element, index) => (
                <div>
                  <Chart
                    chartType="Line"
                    data={element}
                    options={{
                      title: `ok`,

                      curveType: "function",
                      height: "200px",
                      legend: { position: "bottom" },
                      interpolateNulls: true,
                    }}
                  />
                </div>
              ))}
            </Swiper> */}

            {/* </Carousel> */}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
