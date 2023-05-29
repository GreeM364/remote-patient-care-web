import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from "../i18n";

import "../css/menu.css";
import photo from '../images/image3.png';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LogoutIcon from '@mui/icons-material/Logout';

function Menu(props) {
    const { t } = useTranslation();

    const change = (e) => {
        console.log(e);
        const myElement = document.getElementById(props.choose);
        myElement.style.backgroundColor = "black";
        const newElement = document.getElementById(e);
        newElement.style.backgroundColor = "SteelBlue";
        props.setChoose(e);
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <div className="Menu">
            <div>
                <div className="header">
                    <img style={{height: "50px", width: "50px", margin: 0}} src={photo}/>
                    <h2 style={{font: "VT323", fontSize: "30px", fontWeight: 400, color: "whitesmoke"}}>Health</h2>
                </div>
                <div className="list">

                    {props.roleUser === "GlobalAdmin" && (
                        <p id="accounts" style={{backgroundColor: "SteelBlue"}} onClick={() => change("accounts")}>
                            <ContactPageIcon/>
                            <span>{t('accounts')}</span>
                        </p>
                    )}
                    {props.roleUser === "HospitalAdministrator" && (
                        <p id="accounts" style={{backgroundColor: "SteelBlue"}} onClick={() => change("accounts")}>
                            <ContactPageIcon/>
                            <span>{t('accounts')}</span>
                        </p>
                    )}
                    {props.roleUser === "HospitalAdministrator" && (
                        <p id="caregiverPatients" onClick={() => change("caregiverPatients")}>
                            <ContactPageIcon/>
                            <span>{t('caregiverPatients')}</span>
                        </p>
                    )}
                    {props.roleUser === "HospitalAdministrator" && (
                        <p id="payments" onClick={() => change("payments")}>
                            <PaymentsIcon/>
                            <span>{t('payments')}</span>
                        </p>
                    )}
                    {props.roleUser === "GlobalAdmin" && (
                        <p id="hospitals" onClick={() => change("hospitals")}>
                            <LocalHospitalIcon/>
                            <span>{t('hospitals')}</span>
                        </p>
                    )}
                    {props.roleUser === "HospitalAdministrator" && (
                        <p id="patients" onClick={() => change("patients")}>
                            <ContactPageIcon/>
                            <span>{t('patients')}</span>
                        </p>
                    )}
                    {(props.roleUser === "Doctor" || props.roleUser === "CaregiverPatient") && (
                        <p id="patients" onClick={() => change("patients")}>
                            <ContactPageIcon/>
                            <span>{t('patients')}</span>
                        </p>
                    )}
                    {(props.roleUser === "Doctor" || props.roleUser === "CaregiverPatient") && (
                        <p id="addPatients" onClick={() => change("addPatients")}>
                            <ContactPageIcon/>
                            <span>{t('addPatients')}</span>
                        </p>
                    )}
                    {props.roleUser === "Patient" && (
                        <p id="doctor" onClick={() => change("doctor")}>
                            <ContactPageIcon/>
                            <span>{t('doctor')}</span>
                        </p>
                    )}
                    {props.roleUser === "Patient" && (
                        <p id="caregiver" onClick={() => change("caregiver")}>
                            <ContactPageIcon/>
                            <span>{t('caregiver')}</span>
                        </p>
                    )}
                    {/*<p id="other" onClick={() => change("other")}><MoreHorizIcon/> <span>{t('other')}</span></p>*/}

                </div>
            </div>

            <div className="list">
                <button onClick={() => changeLanguage('ua')}>{t('ukrainian')}</button>
                <button onClick={() => changeLanguage('en')}>{t('english')}</button>
                <button onClick={() => changeLanguage('fr')}>{t('french')}</button>
                <button onClick={() => changeLanguage('es')}>{t('spanish')}</button>
                <button onClick={() => changeLanguage('ar')}>{t('arabic')}</button>
                <button onClick={() => changeLanguage('zh')}>{t('сhinese')}</button>
                <p onClick={() => props.onLog(false)}>
                    <LogoutIcon/>
                    <span>{t('logout')}</span>
                </p>
            </div>
        </div>
    );
}

export default Menu;
