import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import "../css/form.css"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
            dateObj += "0" + date.$M + "-"
        else
            dateObj += date.$M + "-"
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
                <TextField className="input" id="outlined-basic" label="First Name" variant="outlined"
                           value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label="Last Name" variant="outlined"
                           value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label="Patronymic" variant="outlined"
                           value={patronymic} onChange={(e)=> setPatronymic(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label="Phone" variant="outlined"
                           value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label="Email" variant="outlined"
                           value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label="Beginning Working Day" variant="outlined"
                           value={begginingDay} onChange={(e)=> setBegginingDay(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label="End Working Day" variant="outlined"
                           value={endDay} onChange={(e)=> setEndDay(e.target.value)}/>
                <LocalizationProvider className="input" dateAdapter={AdapterDayjs}>
                    <DatePicker value={birthDate}
                                onChange={handleDateChange} />
                </LocalizationProvider>
                {props.doctor === "" && <TextField className="input" id="outlined-basic" label="password" variant="outlined"
                                                          value={password} onChange={(e)=> setPassword(e.target.value)}/>}
                <TextField  className="input"
                            id="outlined-select-currency"
                            select
                            label={hospitalName}
                            helperText="Please select your currency"
                            defaultChecked={hospitalId}
                >
                    {hospitals.map((option) => (
                        <MenuItem key={option.id} onClick={()=> setHospitalId(option.id)} value={<option value="" className="id"></option>}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                {props.doctor === "" ? <Button className="register" variant="contained" onClick={AddDoctor}>Register</Button>
                    : <Button className="register" variant="contained" onClick={EditDoctor}>Change</Button>}
            </form>

        </div>
    );
}

export default AddNew;
