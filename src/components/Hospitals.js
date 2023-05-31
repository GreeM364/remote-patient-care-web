import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../css/main.css"
import BasicTable from "./BasicTable";
import AddHospital from "./AddHospital";
import CardAdmin from "./CardAdmin";
import CardHospital from "./CardHospital";
import {useTranslation} from "react-i18next";

function Hospitals(props) {
    const { t } = useTranslation();
    const titlesGlobalAdmin = [t("address"), t("name"), t("dataSubscribe"), t("doctorsCount"), t("patientsCount")];
    const [addHospital, setAddHospital] = useState(false);
    const [hospital, setHospital] = useState("")
    const [viewHospital, setViewHospital] = useState(false)




    return (
        <div className="Hospitals">
            {!addHospital && !viewHospital && <h1>{t("hospitals")}</h1>}
            {!addHospital && !viewHospital && <Button onClick={setAddHospital}  className="add" variant="contained"><AddCircleOutlineIcon/>{t("createNewHospital")}</Button>}
            {!addHospital && !viewHospital && <BasicTable page={'hospitals'} current_token={props.current_token} onHId={setHospital}
                                                          titles={titlesGlobalAdmin} onViewHospital={setViewHospital} onHospital={setAddHospital} roleUser={props.roleUser}/>}
            {addHospital && <h1>{t("createHospital")}</h1>}
            {addHospital && <AddHospital hospitalId="" hospitalId={hospital} onHospital={setAddHospital} current_token={props.current_token}/>}
            {viewHospital && <CardHospital hospital={hospital} onViewHospital={setViewHospital}
                                     current_token={props.current_token}/>}
        </div>
    );
}

export default Hospitals;
