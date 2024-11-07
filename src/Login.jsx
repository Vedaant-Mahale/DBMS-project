import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() 
{
    const [User, setUser] = useState('');
    const [Pass, setPass] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    function wait(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const sendQuery = async () => 
    {
        const sqlQuery = "SELECT * FROM user where username = '"+User+"' and password = '"+Pass+"'";
        console.log(sqlQuery);
        try 
        {
            const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: sqlQuery });
            if(response.data.length === 1) 
            {
                console.log('Success');
                navigate('/customer',{ state: { user: response.data } });
            }
            else
            {
                setLoginfail(prev => ({...prev,opacity: 1}));
                await wait(1000);
                setLoginfail(prev => ({...prev,opacity: 0}));
            }
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
    const internal = {
        justifyContent: 'center',
        alignItems: 'center',
    }
    const login = {
        textAlign: 'center',
        width: '300px',
        height: '160px',
        border: '#555555 solid 2px',
        borderRadius: '20px',
        boxShadow: "2px 2px 2px rgb(100,100,100)",
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
        backgroundColor: isHovered ? 'black' : '#AADDFF',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', 
    };

    const [Loginfail, setLoginfail] = useState({
        marginTop: '20px',
        marginLeft: '50px',
        paddingTop: '10px',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        color: 'white',
        width: '200px',
        height: '30px',
        borderRadius: '25px',
        border: '#555555 solid 2px',
        opacity: 0,
        transition: 'opacity 0.3s ease'
    });

    return (
        <div style={body}>
            <div>
                <div style={login}>
                    <input style={input} type="text" value={User} onChange={(e) => setUser(e.target.value)} placeholder="Enter Username" />
                    <input style={input} type="password" value={Pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter Password" />
                    <button style={button} onClick={sendQuery} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Login</button>
                </div>
                <div style={Loginfail}>Login Failed</div>
            </div>
        </div>
    );
}

export default Login;