import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import "../css/form.css"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useTranslation} from "react-i18next";

function AddNew(props) {
    const { t } = useTranslation();
    const getHospitals =(e) =>{
        fetch(`https://localhost:7070/api/Hospital`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                    setHospitals(res.result);
                    setHospitalId(res.result[0].id)
                }
            )
    }
    useEffect(() => {
        getHospitals();
    }, []);
    const getHospitalAdmin =(e) =>{
        if(props.hospitalAdmin !== "") {
            fetch(`https://localhost:7070/api/HospitalAdministrator/${props.hospitalAdmin}`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        const admin = res.result
                        setFirstName(admin.firstName)
                        setLastName(admin.lastName)
                        setPatronymic(admin.patronymic)
                        setEmail(admin.email)
                        setPhone(admin.phone)
                        setBirthDateFull(admin.birthDate)
                        setHospitalId(admin.hospitalId)
                        getHospital(admin.hospitalId);
                    }
                )
        }
    }
    useEffect(() => {
        getHospitalAdmin();
    }, []);
    const getHospital =(e) =>{
        fetch(`https://localhost:7070/api/Hospital/${e}`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                const hospital = res.result
                console.log(e)
                if(e !== "") {
                    setHospitalName(hospital.name)
                }
                else
                    setHospitalName(hospital.name)

            }
        )


    }
    const [hospitals, setHospitals] = useState([])
    const AddHostipalAdmin = (e) => {
        e.preventDefault();
        if (firstName !== "" && lastName !== "" && patronymic !== "") {
            const user = { firstName: firstName, lastName: lastName, patronymic: patronymic,
                phone: phone, email: email, password: password, birthDate: birthDateFull, hospitalId: hospitalId};
            fetch("https://localhost:7070/api/HospitalAdministrator", {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    "Authorization": "Bearer " + props.current_token},
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)

                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            props.onAddAdmin(false)
        }
    };
    const EditHostipalAdmin = (e) => {
        e.preventDefault();
        if (firstName !== "" && lastName !== "" && patronymic !== "") {
            const user = { firstName: firstName, lastName: lastName, patronymic: patronymic,
                phone: phone, email: email, password: password, birthDate: birthDateFull, hospitalId: hospitalId};
            fetch(`https://localhost:7070/api/HospitalAdministrator/${props.hospitalAdmin}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json",
                    "Authorization": "Bearer " + props.current_token},
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)

                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            if(props.account){
                props.onViewAdmin(true)
            }
            props.onAddAdmin(false)
        }
    };
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [birthDateFull, setBirthDateFull] = useState("")
    const [password, setPassword] = useState("")
    const [hospitalId, setHospitalId] = useState("")
    const [hospitalName, setHospitalName] = useState("")
    const handleDateChange = (date) => {
        console.log(date)
        const month = "" + date.$M;
        const day = "" + date.$D;
        let dateObj = date.$y + "-";
        if(month.length == 1)
            dateObj += "0" + (date.$M + 1) + "-"
        else
            dateObj += (date.$M + 1) + "-"
        if(day.length == 1)
            dateObj += "0" + date.$D
        else
            dateObj += date.$D

        setBirthDateFull(dateObj)
        setBirthDate(date);
    };




    return (
        <div className="AddNew">
            <form className="addNewHospitalAdmin">
                <TextField className="input" id="outlined-basic" label={t("firstName")} variant="outlined"
                           value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label={t("lastName")} variant="outlined"
                           value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label={t("patronymic")} variant="outlined"
                           value={patronymic} onChange={(e)=> setPatronymic(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label={t("phone")} variant="outlined"
                           value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label={t("email")} variant="outlined"
                           value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker onChange={handleDateChange} className="custom-date-picker"/>
                </LocalizationProvider>
                {props.hospitalAdmin === "" && <TextField className="input" id="outlined-basic" label={t("password")} variant="outlined"
                           value={password} onChange={(e)=> setPassword(e.target.value)}/>}
                <TextField  className="input" id="outlined-select-currency" select label={hospitalName} helperText={t("selectHospital")}
                            defaultChecked={hospitalId}>
                    {hospitals.map((option) => (
                        <MenuItem key={option.id} onClick={()=> setHospitalId(option.id)} value={<option value="" className="id"></option>}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                {props.hospitalAdmin === "" ? <Button className="register" variant="contained" onClick={AddHostipalAdmin}>{t('register')}</Button>
                    : <Button className="register" variant="contained" onClick={EditHostipalAdmin}>{t('change')}</Button>}
                <Button  className="register" variant="contained" size="small" color="error" onClick={() => props.onAddAdmin(false)}>
                    {t("close")}
                </Button>
            </form>

        </div>
    );
}

export default AddNew;
