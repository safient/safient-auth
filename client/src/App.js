import React from "react";
import './App.css';
import axios from 'axios'
import {createWallet, retrieveWallet} from "./lib/wallet";

function App() {

    const registerUser = async () => {

        const response = await axios.post('http://127.0.0.1:5000/api/register', {
            email: 'st@gmail.com',
            pass: 'abcdd'
        })
        console.log('RES:',response.data)
    }

    const loginUser = async ()=>{
        const response = await axios.post('http://127.0.0.1:5000/api/login', {
            email: 'st@gmail.com',
            pass: 'abcdd'
        })
        console.log('RES:',response.data)
    }

    const createUserWallet = async ()=>{
        await createWallet("password")
        console.log("Wallet created!!")
    }

    const uploadWallet = async ()=>{
       const wallet = await retrieveWallet()
        const response = await axios.post('http://127.0.0.1:5000/api/uploadWallet', {
            wallet: JSON.stringify(wallet),
            email: 'st@gmail.com',
        })
        console.log('RES:',response.data)
    }

    const getWallet = async ()=>{
        const response = await axios.post('http://127.0.0.1:5000/api/getWallet', {
            email: 'st@gmail.com',
        })
        if (response.status) {
            const wallet = JSON.parse(response.data.wallet)
            console.log('RES:',wallet)
        }else{
            console.log("Something went wrong!!")
        }

    }

    return (
        <div className="App">
            WELCOME TO REACT<br/><br/>
            <button onClick={registerUser}>Register User</button><br/><br/>
            <button onClick={loginUser}>Login User</button><br/><br/>
            <button onClick={createUserWallet}>Create wallet</button><br/><br/>
            <button onClick={uploadWallet}>Upload wallet</button><br/><br/>
            <button onClick={getWallet}>Get wallet</button><br/><br/>
        </div>
    );
}

export default App;
