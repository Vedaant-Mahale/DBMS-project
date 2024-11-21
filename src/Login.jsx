import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [User, setUser] = useState('');
    const [Pass, setPass] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [loginFail, setLoginfail] = useState(false);
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const sendQuery = async () => {
        const sqlQuery = "SELECT * FROM user WHERE username = '" + User + "' AND password = '" + Pass + "'";
        console.log(sqlQuery);
        try {
            const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: sqlQuery });
            if (response.data.length === 1) {
                console.log('Success');
                navigate('/customer', { state: { user: response.data } });
            } else {
                setLoginfail(true);
                await wait(1000);
                setLoginfail(false);
            }
        } catch (error) {
            console.error('Error sending query:', error);
        }
    };
    const styles = {
        body: {
            margin: 0,
            fontFamily: "'Arial', sans-serif",
            background: 'linear-gradient(to right, #00c6ff, #0072ff)',
            backgroundSize: '400% 400%',
            animation: 'gradientBackground 8s ease infinite', // Gradient background animation
            backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085")', // Example background image (you can replace this URL with any image)
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed', // Create a parallax effect
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover', // Ensure the image covers the whole background
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        },
        loginContainer: {
            position: 'relative',
            width: '350px',
            height: '300px',
            perspective: '1000px', // Create depth for the 3D flip effect
        },
        slideIn: {
            animation: 'slideIn 1s forwards', // Slide-in animation
        },
        front: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden', // Hide the back when it's flipped
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '25px',
            background: 'rgba(255, 255, 255, 0.8)', // Transparent white background for the front
            borderRadius: '15px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            transform: 'rotateY(0deg)', // Front is facing up initially
            transition: 'transform 1s', // Smooth transition for flip
        },
        back: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden', // Hide back when flipped
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '25px',
            background: '#f0f0f0', // Background color for the back
            borderRadius: '15px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            transform: 'rotateY(180deg)', // Back is initially hidden
        },
        header: {
            marginBottom: '15px',
            color: '#333',
            fontSize: '22px',
            fontWeight: 'bold',
        },
        input: {
            width: '70%',
            height: '20px',
            padding: '10px',
            margin: '10px',
            border: '2px solid #0072ff',
            borderRadius: '50px',
            transition: 'border-color 0.3s, box-shadow 0.3s',
            fontSize: '14px',
            backgroundColor: '#f0f8ff',
            color: '#333',
        },
        button: {
            width: '70%',
            padding: '10px 30px',
            margin:'20px 0',
            border: 'none',
            borderRadius: '50px',
            backgroundColor: '#0072ff',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s ease',
        },
        buttonHovered: {
            backgroundColor: '#00c6ff',
            transform: 'translateY(-3px)', // Slight hover effect
        },
        errorMessage: {
            color: 'red',
            marginTop: '10px',
            opacity: 0,
            animation: 'fadeIn 0.5s ease-out forwards',
        },
    };

    // Trigger the slide-in animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(true);
        },);  // Delay before the slide-in starts
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={styles.body}>
            <div
                id="login-container"
                style={{
                    ...styles.loginContainer,
                    ...(animate ? styles.slideIn : {}),
                }}
            >
                {/* Front of the Card (Login Form) */}
                <div className="front" style={styles.front}>
                    <h2 style={styles.header}>Welcome Back!</h2>
                    <input
                        style={styles.input}
                        type="text"
                        value={User}
                        onChange={(e) => setUser(e.target.value)}
                        placeholder="Username"
                        onFocus={(e) => e.target.style.boxShadow = '0 0 8px 2px rgba(0, 114, 255, 0.6)'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        value={Pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Password"
                        onFocus={(e) => e.target.style.boxShadow = '0 0 8px 2px rgba(0, 114, 255, 0.6)'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                    />
                    <button
                        style={{ ...styles.button, ...(isHovered ? styles.buttonHovered : {}) }}
                        onClick={sendQuery}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Login
                    </button>
                    {loginFail && <div style={styles.errorMessage}>Invalid Username or Password</div>}
                </div>

                {/* Back of the Card (optional, can be empty or contain another message or graphic) */}
                <div className="back" style={styles.back}>
                    <h3 style={styles.header}>Back of the Card</h3>
                    <p>Any other info or graphics can go here</p>
                </div>
            </div>

            {/* Global styles for animation */}
            <style>
                {`
                    @keyframes slideIn {
                        0% { transform: translateX(100%); opacity: 0; }
                        100% { transform: translateX(0); opacity: 1; }
                    }

                    @keyframes gradientBackground {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}
            </style>
        </div>
    );
}

export default Login;