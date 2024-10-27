import { useState } from 'react';
import axios from 'axios';

function Login() 
{
    const [User, setUser] = useState('');
    const [Pass, setPass] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const sendQuery = async () => 
    {
        const sqlQuery = "SELECT * FROM user where username = '"+User+"' and password = '"+Pass+"'";
        console.log(sqlQuery);
        try 
        {
            const response = await axios.post('http://localhost:3000/api/custom-query', { customQuery: sqlQuery });
            if(response.data.length === 1) 
            console.log('Successful Login');
            else if(response.data.length === 0)
            console.log('Entry Denied');
        } 
        catch (error) 
        {
            console.error('Error sending query:', error);
        }
    };

    const body = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)', 
        overflow: 'hidden',
    };

    const login = {
        textAlign: 'center',
        width: '300px',
        height: '160px',
        border: '#555555 solid 2px',
        borderRadius: '20px',
        boxShadow: "2px 2px 2px rgb(100,100,100)"
    };

    const input = {
        marginTop: '20px',
        width: '200px'
    };

    const button = {
        marginTop: '20px',
        width: '200px',
        height: '40px',
        borderRadius: '20px',
        backgroundColor: isHovered ? 'black' : 'green',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', 
    };

    return (
        <div style={body}>
            <div style={login}>
                <input style={input} type="text" value={User} onChange={(e) => setUser(e.target.value)} placeholder="Enter Username" />
                <input style={input} type="password" value={Pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter Password" />
                <button style={button} onClick={sendQuery} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Login</button>
            </div>
        </div>
    );
}

export default Login;