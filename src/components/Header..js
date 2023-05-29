import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import photo2 from "../images/image2.png";
import "../css/header.css"
import {useTranslation} from "react-i18next";


function Header(props) {
    const { t } = useTranslation();
    console.log(props.choose)

    return (
        <div className="Header">
            {props.choose === "accounts" && props.roleUser === "GlobalAdmin" &&
            <div class="search">
                <InputBase
                    sx={{ ml: 1, flex: 1, width: "88%" }}
                    placeholder={t("findAdmin")}
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
                    placeholder={t("findDoctor")}
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
                    placeholder={t("findHospital")}
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
                    placeholder={t("findPatient")}
                    inputProps={{ 'aria-label': 'find doctor' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </div>}
            {props.choose === "caregiverPatients" && props.roleUser === "HospitalAdministrator" &&
                <div class="search">
                    <InputBase
                        sx={{ ml: 1, flex: 1, width: "88%" }}
                        placeholder={t("findCaregiver")}
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
