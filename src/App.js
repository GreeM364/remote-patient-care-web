import LogForm from "./components/LogForm";
import {useEffect, useState} from 'react';
import Main from "./components/MainContainer";
import MainContainer from "./components/MainContainer";
import { LanguageProvider } from "./components/LanguageContext";


function App() {
    const[isLoginedIn, setLog] = useState(false);
    const[roleUser, setRoleUser] = useState("");
    const[nameUser, setNameUser] = useState("");
    const[idUser, setIdUser] = useState("");
    const [current_token, setToken] = useState("");
  return (
      <LanguageProvider>
    <div className="App" style={{margin: 0}}>
        {isLoginedIn !== true && <LogForm onLog={setLog} onRole={setRoleUser} onName={setNameUser} onId={setIdUser}
                                         current_token={current_token} onToken={setToken}/>}
        {isLoginedIn === true && <MainContainer onLog={setLog} roleUser={roleUser} idUser={idUser} nameUser={nameUser} current_token={current_token}/>}
    </div>
      </LanguageProvider>
  );
}

export default App;
