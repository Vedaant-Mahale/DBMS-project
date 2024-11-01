import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx'
import Homepage from './Homepage.jsx';


function App() 
{
    return (
      <Router basename="/dbms-project">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/about" element={<Homepage />} />
            </Routes>
        </Router>
    );
}

export default App
