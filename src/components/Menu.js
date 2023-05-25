import React, { useState, useEffect } from 'react';
import "../css/menu.css";
import photo from '../images/image3.png';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LogoutIcon from '@mui/icons-material/Logout';

function Menu(props) {
    const change = (e) => {
        console.log(e)
        const myElement = document.getElementById(props.choose);
        myElement.style.backgroundColor = "black";
        const newElement = document.getElementById(e);
        newElement.style.backgroundColor = "SteelBlue";
        props.setChoose(e)

    }


    return (
        <div className="Menu">
            <div>
                <div className="header">
                    <img style={{height: "50px", width: "50px", margin: 0}} src={photo}/>
                    <h2 style={{font: "VT323", fontSize: "30px", fontWeight: 400, color: "whitesmoke"}}>Health</h2>
                </div>
                <div className="list">
                    {props.roleUser === "GlobalAdmin" &&
                        <p id="accounts" style={{backgroundColor: "SteelBlue"}} onClick={() => change("accounts")}>
                        <ContactPageIcon/>
                        <span>Accounts</span></p>}
                    {props.roleUser === "HospitalAdmin"&&
                        <p id="accounts" style={{backgroundColor: "SteelBlue"}} onClick={() => change("accounts")}>
                            <ContactPageIcon/>
                            <span>Accounts</span></p>}
                    {props.roleUser === "HospitalAdmin" &&
                        <p id="payments" onClick={() => change("payments")}><PaymentsIcon/> <span>Payments</span></p>}
                    {props.roleUser === "GlobalAdmin" &&
                        <p id="hospitals" onClick={() => change("hospitals")}><LocalHospitalIcon/> <span>Hospitals</span></p>}
                    {props.roleUser === "HospitalAdmin" &&
                        <p id="hospitals" onClick={() => change("hospitals")}><LocalHospitalIcon/> <span>Hospitals</span></p>}
                    {props.roleUser === "Doctor" &&
                        <p id="patient" onClick={() => change("patient")}><ContactPageIcon/> <span>Patient</span></p>}
                    {props.roleUser === "CaregiverPatient" &&
                        <p id="patient" onClick={() => change("patient")}><ContactPageIcon/> <span>Patient</span></p>}
                    {props.roleUser === "Patient" &&
                        <p id="doctor" onClick={() => change("doctor")}><ContactPageIcon/> <span>Doctor</span></p>}
                    {props.roleUser === "Patient" &&
                        <p id="caregiver" onClick={() => change("caregiver")}><ContactPageIcon/> <span>Caregiver</span></p>}
                    <p id="other" onClick={() => change("other")}><MoreHorizIcon/> <span>Other</span></p>

                </div>
            </div>
            <div className="list">
                <p onClick={() => props.onLog(false)}><LogoutIcon/> <span>Logout</span></p>
            </div>



        </div>
    );
}

export default Menu;
