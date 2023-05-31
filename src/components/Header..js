import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import photo2 from "../images/image2.png";
import "../css/header.css"
import {useTranslation} from "react-i18next";


function Header({ nameUser, choose, roleUser, onView, onSearchQueryChange }) {
    const { t } = useTranslation();

    const handleInputChange = (e) => {
        const query = e.target.value;
        console.log('Input header: ', query);
        onSearchQueryChange(query);
    };

    return (
        <div className="Header">
            {choose === "accounts" && roleUser === "GlobalAdmin" &&
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
            {choose === "accounts" && roleUser === "HospitalAdministrator" &&
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
            {choose === "hospitals" && roleUser === "GlobalAdmin" &&
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
            {choose === "patients" && (roleUser === "HospitalAdministrator" || roleUser === "Doctor" || roleUser === "CaregiverPatient") &&
            <div class="search">
                <InputBase
                    sx={{ ml: 1, flex: 1, width: "88%" }}
                    placeholder={t("findPatient")}
                    inputProps={{ 'aria-label': 'find doctor' }}
                    onChange={handleInputChange}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </div>}
            {choose === "caregiverPatients" && roleUser === "HospitalAdministrator" &&
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

            <div class="account_header" onClick={() => onView(true)}>
                <div class="name_of_account">
                    <h4 style={{margin: 1}}>{nameUser}</h4>
                    <p style={{margin:0, color: "grey"}}>{roleUser}</p>
                </div>
                <img style={{height: "50px", width: "50px", margin: 0, display: "block"}} src={photo2}/>
            </div>
        </div>
    );
}

export default Header;
