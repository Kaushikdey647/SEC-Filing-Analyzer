import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import "./searchBar1.css";
import fallBackImage from "../resources/MicrosoftTeams-image.png";
import { ListItem, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CardWithData({...props}) {
  const navigate=useNavigate()
    const [url, setUrl] = React.useState(
    `https://eodhistoricaldata.com/img/logos/US/${props.data.ticker}.png`
  );
  React.useEffect(() => {}, [props]);
  // console.log(props.data, "actual Data");
  const errorHandlerForImageLink = () => {
    setUrl(fallBackImage);
    // console.log(url);
  };
  function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function handleCardClick() {
    // console.log("alright the card was clicked");
    // console.log(props,"data before sending")
    navigate('/dashboard',{state: {data : props.data} }) 
  }
  React.useEffect(() => {}, [url]);
  return (
    <Card className="DataCard" sx={{ width: "100%" }} onClick={handleCardClick}>
      <CardHeader
        avatar={
          <Avatar
            src={url}
            imgProps={{ onError: errorHandlerForImageLink }}
            aria-label="recipe"
          />
        }
        title={<>{props.data.title.toUpperCase()}</>}
      />
      <CardContent>
        <Stack style={{ marginTop: "-10px" }}>
          <ListItem>
            {props.data.cik ? (
              <>{`cik : ${props.data.cik}`}</>
            ) : (
              `cik not available`
            )}
          </ListItem>
          <ListItem>
            {props.data.title ? (
              <>{`title : ${capitalizeFirstLetter(props.data.title)}`}</>
            ) : (
              `title not available`
            )}
          </ListItem>
          <ListItem>
            {props.data.ticker ? (
              <>{`ticker : ${capitalizeFirstLetter(props.data.ticker)}`}</>
            ) : (
              `ticker not available`
            )}
          </ListItem>
        </Stack>
      </CardContent>
    </Card>
  );
}
