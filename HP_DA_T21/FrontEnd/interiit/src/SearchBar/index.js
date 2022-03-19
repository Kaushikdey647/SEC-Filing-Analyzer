import Searchbar from "./searchBar1";
import AppBar from "../AppBar/index";
import { ListItem, Stack } from "@mui/material";
import "./searchBar1.css"
import * as React from 'react'
import { CompanyContext } from "../CompanyData";
export default function SearchBars(props) {
  const obj=React.useContext(CompanyContext)
  obj.changeData(4)
  return (
    <>
      <AppBar />
      <Stack>
        <ListItem className="SearchBar1">
          <Searchbar {...props}  />
        </ListItem>
      </Stack>
    </>
  );
}
