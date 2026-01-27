import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import './LoginComponent.css'   

function LoginComponent() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()
    const authContext = useAuth()

    const handleSubmit = async () => {

        setShowErrorMessage(false)

        if (username.trim() === "" || password.trim() === "") {
            setShowErrorMessage(true)
            return
        }

        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
        } else {
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="login-container">

            <h1 className="login-title">Time to Login!</h1>

            <div className="login-form">

                {showErrorMessage && (
                    <div className="error-message">
                        Authentication Failed! Please check your credentials
                    </div>
                )}

                <div className="input-group">
                    <label>Username</label>
                    <input 
                        type="text"
                        value={username}
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>

                <button 
                    type="button" 
                    className="login-button"
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </div>

        </div>
    )
}

export default LoginComponent
