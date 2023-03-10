import searchbar from "../components/searchbar.css"
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import filteredItems from "./filteredItems";



function SearchBar({ searchdata }) {

    // console.log("PRINTING DATA FROM SEARCH FUNCTION" + searchdata);

    const [filteredData, setfilteredData] = useState([]);

    const inputHandler = (event) => {

        const searchedWord = event.target.value
        const newFilter = searchdata.filter((value) => {
            return value.jobTitle.toLowerCase().includes(searchedWord.toLowerCase());


        });
        setfilteredData(newFilter)

    }

    return (
        <div className="main">
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
            </div>
            {
                filteredData.length != 0 && (
                    <div>
                        {filteredData && filteredData.slice(0, 10).map((value, key) => {
                            return <div> {value.jobTitle} </div>
                        })}
                    </div>
                )
            }
        </div>
    );

}

export default SearchBar;