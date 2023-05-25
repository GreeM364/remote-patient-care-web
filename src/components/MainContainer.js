import React, { useState } from 'react';
import Menu from "./Menu";
import Header from "./Header.";
import "../css/main.css"
import Accounts from "./Accounts";
import Hospitals from "./Hospitals";

function MainContainer(props) {
    const [choose, setChoose] = useState("accounts");


    return (
        <div className="MainContainer">
            <Menu setChoose={setChoose} roleUser={props.roleUser} choose={choose} onLog={props.onLog}/>
            <div class="mainDiv">
                <Header nameUser={props.nameUser} choose={choose} roleUser={props.roleUser}/>
                <hr width="90%"/>
                {choose === "accounts" &&
                    <Accounts current_token={props.current_token} roleUser={props.roleUser}/>}
                {choose === "hospitals" &&
                    <Hospitals current_token={props.current_token} roleUser={props.roleUser}/>}
            </div>
        </div>
    );
}

export default MainContainer;
