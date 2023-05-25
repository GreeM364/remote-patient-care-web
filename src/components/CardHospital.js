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
import Box from '@mui/material/Box';

export default function CardHospital( props) {

    const getHospital =(e) =>{
        fetch(`https://localhost:7070/api/Hospital/${props.hospital}`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                    console.log(res.result)
                    setHospital(res.result)
                    // setBirthDay(res.result.birthDate.split("T")[0])
                    // getHospital(res.result.hospitalId)

                }
            )
    }
    useEffect(() => {
        getHospital();
    }, []);
    const [hospital, setHospital] = useState([])
    return (
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <TextField className="field"
                        disabled
                        id="outlined-disabled"
                        label="Name" value={hospital.name}
                        /><TextField className="field"
                                     disabled
                                     id="outlined-disabled"
                                     label="Address" value={hospital.address}
                    />
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <Button size="small" color="primary" onClick={() => props.onViewHospital(false)}>
                        Close
                    </Button>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={admin}
                alt="Live from space album cover"
            />
        </Card>
    );
}
