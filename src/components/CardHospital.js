import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import photo from '../images/hospital.png';
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
        <Card sx={{ display: 'flex', width: '100%' }}>
            <CardMedia
                component="img"
                sx={{ width: '20%' }}
                image={photo}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                <CardContent className="card">
                    <TextField className="field"
                        disabled
                        id="outlined-disabled"
                        label="Name" value={hospital.name}
                        /><TextField className="field"
                                     disabled
                                     id="outlined-disabled"
                                     label="Address" value={hospital.address}
                    />
                    <Button sx={{width: "60%"}} size="small" color="primary" onClick={() => props.onViewHospital(false)}>
                        Close
                    </Button>
                </CardContent>
            </Box>
        </Card>
    );
}
