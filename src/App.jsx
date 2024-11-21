import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Customer from './Customer.jsx';
import Employee from './Employee.jsx';
import Supplied from "./Supplied.jsx";

function App() 
{
    return (
      <Router basename="/dbms-project">
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/customer" element={<Customer/>} />
                <Route path="/employee" element={<Employee/>} />
                <Route path="/supplied" element={<Supplied/>} />
            </Routes>
        </Router>
    );
}

export default App
