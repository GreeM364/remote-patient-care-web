import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import "../css/form.css"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';

function AddNew(props) {
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
    const { t } = useTranslation();
    const getDocotr =(e) =>{
        if(props.doctor !== "") {
            fetch(`https://localhost:7070/api/Doctor/${props.doctor}`, {
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
                        let begginingWorkingDay = admin.beginningWorkingDay.split("T")[1].split(".")[0].split(":")
                        let endWorkingDay = admin.endWorkingDay.split("T")[1].split(".")[0].split(":")
                        setBegginingDay(begginingWorkingDay[0] + ":" + begginingWorkingDay[1])
                        setEndDay(endWorkingDay[0] + ":" + endWorkingDay[1])
                        getHospital(admin.hospitalId);
                    }
                )
        }
    }
    useEffect(() => {
        getDocotr();
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
    const AddDoctor = (e) => {
        e.preventDefault();
        if (firstName !== "" && lastName !== "" && patronymic !== "") {
            const user = { firstName: firstName, lastName: lastName, patronymic: patronymic,
                phone: phone, email: email, password: password, beginningWorkingDay: "2023-01-01T" + begginingDay + ":00",
                endWorkingDay: "2023-01-01T" +  endDay + ":00",
                birthDate: birthDateFull, hospitalId: hospitalId};
            console.log(user)
            fetch("https://localhost:7070/api/Doctor", {
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
            props.onAddDoctor(false)
        }
    };
    const EditDoctor = (e) => {
        e.preventDefault();
        if (firstName !== "" && lastName !== "" && patronymic !== "") {
            const user = { firstName: firstName, lastName: lastName, patronymic: patronymic,
                phone: phone, email: email, password: password, beginningWorkingDay: "2023-01-01T" + begginingDay + ":00",
                endWorkingDay: "2023-01-01T" +  endDay + ":00",
                birthDate: birthDateFull, hospitalId: hospitalId};
            fetch(`https://localhost:7070/api/Doctor/${props.doctor}`, {
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
            props.onAddDoctor(false)
        }
    };
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [begginingDay, setBegginingDay] = useState("")
    const [endDay, setEndDay] = useState("")
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
            <form className="addNewDoctor">
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
                <TextField className="input" id="outlined-basic" label={t("beginningWorkingDay")} variant="outlined"
                           value={begginingDay} onChange={(e)=> setBegginingDay(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label={t("endWorkingDay")} variant="outlined"
                           value={endDay} onChange={(e)=> setEndDay(e.target.value)}/>
                <LocalizationProvider className="input" dateAdapter={AdapterDayjs}>
                    <DatePicker className="custom-date-picker" onChange={handleDateChange} />
                </LocalizationProvider>
                {props.doctor === "" && <TextField className="input" id="outlined-basic" label={t("password")} variant="outlined"
                                                          value={password} onChange={(e)=> setPassword(e.target.value)}/>}
                <TextField  className="input"
                            id="outlined-select-currency"
                            select
                            label={hospitalName}
                            helperText={t("selectHospital")}
                            defaultChecked={hospitalId}
                >
                    {hospitals.map((option) => (
                        <MenuItem key={option.id} onClick={()=> setHospitalId(option.id)} value={<option value="" className="id"></option>}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                {props.doctor === "" ? <Button className="register" variant="contained" onClick={AddDoctor}>{t("register")}</Button>
                    : <Button className="register" variant="contained" onClick={EditDoctor}>{t("change")}</Button>}
                <Button  className="register" variant="contained" size="small" color="error" onClick={() => props.onAddDoctor(false)}>
                    {t("close")}
                </Button>
            </form>

        </div>
    );
}

export default AddNew;
