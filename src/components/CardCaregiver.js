import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import admin from '../images/admin.png';
import TextField from '@mui/material/TextField';
import "../css/form.css"
import {useTranslation} from "react-i18next";

export default function CardAdmin( props) {
    const { t } = useTranslation();
    const getHospitalAdmin =(e) =>{
        if(props.account){
            fetch(`https://localhost:7070/api/User/profile`, {
                method: "GET",
                headers: {'accept': "*/*", "Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        console.log(res.result.caregiverPatient)
                        setUser(res.result.caregiverPatient)
                        setBirthDay(res.result.caregiverPatient.birthDate.split("T")[0])
                        setEmail(res.result.email)
                        setPhone(res.result.phone)
                    }
                )
        }
        else {
            fetch(`https://localhost:7070/api/CaregiverPatient/${props.caregiverPatient}`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        console.log(res.result)
                        setUser(res.result)
                        setBirthDay(res.result.birthDate.split("T")[0])


                    }
                )
        }
    }
    useEffect(() => {
        getHospitalAdmin();
    }, []);
    const Edit = () => {
        props.onViewCaregiverPatient(false)
        props.onAddCaregiverPatient(true)
        props.onId(user.id)
    }
    const [user, setUser] = useState([])
    const [birthDay, setBirthDay] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250px"
                    style={{ width: '250px', margin: "0px 50px" }}
                    image={admin}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {user.firstName + " " + user.lastName + " " + user.patronymic}
                    </Typography>
                    <Typography className="typography" variant="body2" color="text.secondary" style={{ display: 'flex' }}>
                        <TextField className="field" disabled id="outlined-disabled" label={t("email")} value={email} />
                        <TextField className="field" disabled id="outlined-disabled" label={t("phone")} value={phone} />
                        <TextField className="field" disabled id="outlined-disabled" label={t("birthDay")} value={birthDay} />
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {props.account && <Button size="small" color="primary" onClick={Edit}>
                    {t("edit")}
                </Button>}
                <Button size="small" color="primary" onClick={() => props.onViewCaregiverPatient(false)}>
                    {t("close")}
                </Button>
            </CardActions>
        </Card>
    );
}
