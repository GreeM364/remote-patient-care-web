import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import { useTranslation } from "react-i18next";


const Form1 = ({ patientId }) => {
    const [connection, setConnection] = useState(null);
    const [physicalMessages, setPhysicalMessages] = useState([]);
    const [criticalMessages, setCriticalMessages] = useState([]);

    const startConnection = async () => {
        const hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7227/physicalconditionhub')
            .build();

        hubConnection.on('PhysicalCondition', (physicalCondition) => {
            setPhysicalMessages((prevMessages) => [
                ...prevMessages,
                {
                    pulse: physicalCondition.pulse,
                    upperArterialPressure: physicalCondition.upperArterialPressure,
                    lowerArterialPressure: physicalCondition.lowerArterialPressure,
                    bodyTemperature: physicalCondition.bodyTemperature,
                    breathingRate: physicalCondition.breathingRate,
                    time: moment(physicalCondition.dateTime).format('+HH:mm:ss'),
                },
            ]);
        });

        hubConnection.on('CriticalCondition', (criticalCondition) => {
            setCriticalMessages((prevMessages) => [
                ...prevMessages,
                {
                    message: criticalCondition.message,
                    time: moment(criticalCondition.dateTime).format('HH:mm:ss'),
                },
            ]);
        });

        await hubConnection.start();
        hubConnection.invoke('Enter', patientId).catch((err) => console.error(err));
        setConnection(hubConnection);
    };

    useEffect(() => {
        // Clean up the connection on component unmount
        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, [connection]);

    const { t } = useTranslation();

    const renderPhysicalMessages = () => {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                <div style={{ width: '45%' }}>
                    <LineChart width={400} height={300} data={physicalMessages}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pulse" stroke="#8884d8" name={t("pulse")} />
                    </LineChart>

                    <LineChart width={400} height={300} data={physicalMessages}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="upperArterialPressure"
                            stroke="#82ca9d"
                            name={t("upperArterialPressure")}
                        />
                        <Line
                            type="monotone"
                            dataKey="lowerArterialPressure"
                            stroke="#ffc658"
                            name={t("lowerArterialPressure")}
                        />
                    </LineChart>
                </div>

                <div style={{ width: '45%' }}>
                    <LineChart width={400} height={300} data={physicalMessages}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="bodyTemperature" stroke="#ff7300" name={t("bodyTemperature")} />
                    </LineChart>

                    <LineChart width={400} height={300} data={physicalMessages}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="breathingRate" stroke="#0088aa" name={t("breathingRate")} />
                    </LineChart>
                </div>
            </div>
        );
    };

    const renderCriticalMessages = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '80%', margin: '0 auto' }}>
                <h2>{t("criticalMessages")}</h2>
                <ul style={{ height: '300px', overflowY: 'auto', textAlign: 'center', width: "100%", paddingLeft: '0' }}>
                    {criticalMessages.map((message, index) => (
                        <li key={index} style={{ listStyle: 'inside' }}>
                            <strong style={{color: "red"}}>{t("message")}:</strong> {message.message}
                            <br />
                            <strong>{t("time")}:</strong> {message.time}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };


    return (
        <div>
            <button onClick={startConnection}>{t("viewConditionInRealTime")}</button>
            <div style={{ width: '100%' }}>
                {renderPhysicalMessages()}
                {renderCriticalMessages()}
            </div>
        </div>
    );
};

export default Form1;
