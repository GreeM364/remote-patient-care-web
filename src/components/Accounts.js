import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../css/main.css"
import BasicTable from "./BasicTable";
import AddNew from "./AddNew";
import CardAdmin from "./CardAdmin";
import AddDoctor from "./AddDoctor";
import CardDoctor from "./CardDoctor";
import { useTranslation } from 'react-i18next';

function Accounts(props) {
    const { t } = useTranslation();

    const titlesGlobalAdmin = [t('fullName'), t('phone'), t('email'), t('hospitalName')];
    const titlesHospitalAdmin = [t('fullName'), t('phone'), t('email'), t('workingHours')];
    const [addAdmin, setAddAdmin] = useState(false);
    const [addDoctor, setAddDoctor] = useState(false);
    const [hospitalAdmin, setHospitalAdmin] = useState("");
    const [doctor, setDoctor] = useState("");
    const [viewAdmin, setViewAdmin] = useState(false);
    const [viewDoctor, setViewDoctor] = useState(false);

    return (
        <div className="Accounts">
            {!addAdmin && !addDoctor && !viewDoctor && !viewAdmin && <h1>{t('accounts')}</h1>}
            {props.roleUser === "GlobalAdmin" && !addAdmin && !addDoctor && !viewDoctor && !viewAdmin &&
                <Button onClick={setAddAdmin} className="add" variant="contained">
                    <AddCircleOutlineIcon/> {t('createNewAdmin')}
                </Button>}
            {props.roleUser === "HospitalAdministrator" && !addAdmin && !addDoctor && !viewDoctor && !viewAdmin &&
                <Button onClick={setAddDoctor} className="add" variant="contained">
                    <AddCircleOutlineIcon/>{t('createNewDoctor')}
                </Button>}
            {props.roleUser === "GlobalAdmin" && !addAdmin && !addDoctor && !viewDoctor && !viewAdmin &&
                <BasicTable page="accounts" onHospitalAdmin={setHospitalAdmin} onViewAdmin={setViewAdmin}
                            onAddAdmin={setAddAdmin} current_token={props.current_token} titles={titlesGlobalAdmin}
                            roleUser={props.roleUser}/>}
            {props.roleUser === "HospitalAdministrator" && !addAdmin && !addDoctor && !viewDoctor && !viewAdmin &&
                <BasicTable page="accounts" onDoctor={setDoctor} onViewDoctor={setViewDoctor}
                            onAddDoctor={setAddDoctor} current_token={props.current_token} titles={titlesHospitalAdmin}
                            roleUser={props.roleUser}/>}
            {addAdmin && <h1>{t('createHospitalAdmin')}</h1>}
            {addAdmin && <AddNew hospitalAdmin={hospitalAdmin} onAddAdmin={setAddAdmin}
                                 current_token={props.current_token}/>}
            {viewAdmin && <CardAdmin hospitalAdmin={hospitalAdmin} onViewAdmin={setViewAdmin}
                                     current_token={props.current_token}/>}
            {addDoctor && <h1>{t('createNewDoctor')}</h1>}
            {addDoctor && <AddDoctor doctor={doctor} onAddDoctor={setAddDoctor} current_token={props.current_token}/>}
            {viewDoctor && <CardDoctor doctor={doctor} onViewDoctor={setViewDoctor}
                                       current_token={props.current_token}/>}

        </div>
    );
}

export default Accounts;
