import { React } from 'react';
// import logo from './logo.svg';
import './App.css';

function Logo () {
    return (
        <video width='480' height='300' loop autoPlay muted>
            <source src='./logo_yng_animated.mp4' type='video/mp4'/>
        </video>
    );
}

function Connect() {
    let connect = () => {
        window.location.href = 'http://localhost:3001/auth/discord';
    };

    return (<button onClick={connect}>Connect</button>);
}

export default function App () {

    return (
        <div className="App">
            <Logo/>
            <br/>
            <Connect/>
        </div>
    );
};

