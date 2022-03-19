import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login.js'
import SignUp from './SignUp.js'
import weatherApp from './App.js'

// check cookie exists here 
// http://localhost:8080 vs http://localhost:8080/login

// we need to send a request to the backend 
// the backend checks the cookie sent with the request
// the backend sends back whether our cookie a valid cookie
// once we get the fetch results from the backend
// if the cookie was valid render the app
// else render the login page

// const port = 3000;
// const url = `http://localhost:${port}`;

// let cookieExists;
// async function checkCookie() {
//   fetch(url, {
//     method: 'GET', 
      // headers: { 
      //   'Content-Type': 'application/json' 
      // },
      // credentials: 'include'

//   })
//   .then((data) => {
//     return data.json()
//   })
//   .then((data) => {
//     // console.log(data);
//     if (data.cookieStatus === 'good') return true;
//     else return false;
//   });
// }
// cookieExists = await checkCookie();



export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path ='/' element={<Login />}/>
          <Route path ='/signup' element={<SignUp />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}