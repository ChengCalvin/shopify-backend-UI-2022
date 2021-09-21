import React, { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import axios from "axios";

const App = () => {
  const [searchValue, setSearchValue] = useState();
  const [selectSearchType, setSelectSearchType] = useState("characteristics");
  const [imageList, setImageList] = useState([]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSelectInputType = (e) => {
    setSelectSearchType(e.target.value);
  };

  const onSearchClick = () => {
    const params = {
      searchType: selectSearchType,
      searchValue: searchValue,
    };

    axios.get("http://localhost:5000", { params: params }).then((res) => {
      setImageList(res.data);
    });
  };

  return (
    <div className="App">
      <div>
        <Typography>Search by characteristic, text or image url</Typography>

        <div
          style={{ display: "flex", minWidth: 120, justifyContent: "center" }}
        >
          <TextField
            label="Search Input"
            value={searchValue}
            onChange={handleChange}
          />
          <Select
            value={selectSearchType}
            label="Search Option"
            onChange={handleSelectInputType}
          >
            <MenuItem value={"characteristics"}>Characteristics</MenuItem>
            <MenuItem value={"text"}>Text</MenuItem>
            <MenuItem value={"url"}>URL</MenuItem>
          </Select>
        </div>

        <Button
          variant="outlined"
          style={{ marginLeft: 10, marginTop: 10 }}
          onClick={onSearchClick}
        >
          Search
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {imageList.map((item) => (
            <ImageListItem key={item._id}>
              <img src={item.url} alt={item.title} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default App;
