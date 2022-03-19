import { Grid, Zoom } from "@mui/material";
import * as React from "react";
import "./searchBar1.css";
import CardWithData from "./SingleCard";
import WowSuchEmpty from "../resources/reddit.png";
export default function DataRender({ ...props }) {
  // console.log(props.check, "alright");

  const data = props.data ? props.data.data : null;
  React.useEffect(() => {}, [props]);
  return (
    <div className="searchBar">
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
            {/* {console.log("toggleer : ",props.toggler)} */}
            {data ? (
              data.map((elem, index) => (
                <Zoom
                  in={props.toggler === "cancel"}
                  style={{ transitionDelay: `${index}00ms` }}
                >
                  <Grid item xs={12} sm={6} md={4}>
                    <CardWithData data={elem} />
                  </Grid>
                </Zoom>
              ))
            ) : (
              <Grid item xs={12} sm={12} md={12}>
                <img src={WowSuchEmpty} alt="ok" />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
