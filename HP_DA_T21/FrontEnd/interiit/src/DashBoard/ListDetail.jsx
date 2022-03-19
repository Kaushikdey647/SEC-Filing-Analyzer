import { List, ListItem, ListItemText, Typography } from "@mui/material";
import * as React from "react";
export default function DetailList({ ...props }) {
  const [data, setData] = React.useState({ ...props }.data);
  let ArrayForRender = null;
  if (data) ArrayForRender = Object.entries(data);
  //   console.log(ArrayForRender, "Array For Render");
  ArrayForRender = ArrayForRender.slice(1);
  let FinalArray = ArrayForRender.pop();
  // console.log(FinalArray, "Final");
  React.useEffect(() => {}, [props]);
  function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function callBackFunc(elem) {
    return (
      <ListItem>
        <ListItemText
          primary={<Typography style={{fontSize:"22px"}}>{capitalizeFirstLetter(elem[0])}</Typography>}
          secondary={<Typography
          style={{fontSize:"12px"}}
          >{elem[1]}</Typography>}
        />
      </ListItem>
    );
  }
  return (
    <>
      <List>{ArrayForRender ? ArrayForRender.map(callBackFunc) : null}</List>
    </>
  );
}
