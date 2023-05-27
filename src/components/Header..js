import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import photo2 from "../images/image2.png";
import "../css/header.css"


function Header(props) {


    return (
        <div className="Header">
            {props.choose === "accounts" && props.roleUser === "GlobalAdmin" &&
            <div class="search">
                <InputBase
                    sx={{ ml: 1, flex: 1, width: "88%" }}
                    placeholder="Find Admin"
                    inputProps={{ 'aria-label': 'find doctor' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </div>}
            {props.choose === "accounts" && props.roleUser === "HospitalAdministrator" &&
            <div class="search">
                <InputBase
                    sx={{ ml: 1, flex: 1, width: "88%" }}
                    placeholder="Find Doctor"
                    inputProps={{ 'aria-label': 'find doctor' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </div>}
            {props.choose === "hospitals" && props.roleUser === "GlobalAdmin" &&
            <div class="search">
                <InputBase
                    sx={{ ml: 1, flex: 1, width: "88%" }}
                    placeholder="Find Hospital"
                    inputProps={{ 'aria-label': 'find doctor' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </div>}
            {props.choose === "patients" && (props.roleUser === "HospitalAdministrator" || props.roleUser === "Doctor" || props.roleUser === "CaregiverPatient") &&
            <div class="search">
                <InputBase
                    sx={{ ml: 1, flex: 1, width: "88%" }}
                    placeholder="Find Patient"
                    inputProps={{ 'aria-label': 'find doctor' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </div>}

            <div class="account_header" onClick={() => props.onView(true)}>
                <div class="name_of_account">
                    <h4 style={{margin: 1}}>{props.nameUser}</h4>
                    <p style={{margin:0, color: "grey"}}>{props.roleUser}</p>
                </div>
                <img style={{height: "50px", width: "50px", margin: 0, display: "block"}} src={photo2}/>
            </div>
        </div>
    );
}

export default Header;
