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
        console.log(props.current_token)
        if(props.account){
            fetch(`https://localhost:7070/api/User/profile`, {
                method: "GET",
                headers: {'accept': "*/*", "Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        // console.log(res.result.hospitalAdministrator)

                        setUser(res.result.hospitalAdministrator)
                        setBirthDay(res.result.hospitalAdministrator.birthDate.split("T")[0])
                        setEmail(res.result.email)
                        setPhone(res.result.phone)
                        // console.log(gA.email)
                        getHospital(res.result.hospitalAdministrator.hospitalId)

                    }
                )
        }
        else {
            fetch(`https://localhost:7070/api/HospitalAdministrator/${props.hospitalAdmin}`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        // console.log(res.result)
                        setUser(res.result)
                        setBirthDay(res.result.birthDate.split("T")[0])

                        getHospital(res.result.hospitalId)

                    }
                )
        }
    }
    useEffect(() => {
        getHospitalAdmin();
    }, []);
    const Edit = () => {
        props.onViewAdmin(false)
        props.onAddAdmin(true)
        props.onId(user.id)
    }
    const getHospital =(e) =>{
        fetch(`https://localhost:7070/api/Hospital/${e}`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                    setHospitlName(res.result.name)

                }
            )
    }
    const [user, setUser] = useState([])
    const [birthDay, setBirthDay] = useState("")
    const [hospitalName, setHospitlName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    return (
        <Card sx={{ maxWidth: '100%'}} >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250"
                    style={{ width: '250px', margin: "0px 50px" }}
                    image={admin}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{margin: "0px 50px"}}>
                        {user.firstName + " " + user.lastName + " " + user.patronymic}
                    </Typography>
                    <Typography className="typography" variant="body2" color="text.secondary">
                        <TextField className="field"
                            disabled
                            id="outlined-disabled"
                            label={t("email")} value={email}
                        /><TextField className="field"
                        disabled
                        id="outlined-disabled"
                        label={t("phone")} value={phone}
                    /><TextField className="field"
                        disabled
                        id="outlined-disabled"
                        label={t("birthDay")} value={birthDay}
                    /><TextField className="field"
                        disabled
                        id="outlined-disabled"
                        label={t("hospitalName")} value={hospitalName}
                    />
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {props.account && <Button size="small" color="primary" onClick={Edit}>
                    {t("edit")}
                </Button>}
                <Button size="small" color="primary" onClick={() => props.onViewAdmin(false)}>
                    {t("close")}
                </Button>
            </CardActions>
        </Card>
    );
}
