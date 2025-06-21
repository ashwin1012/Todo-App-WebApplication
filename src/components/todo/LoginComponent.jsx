import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

function LoginComponent(){

    const[username, setUsername]=useState('')

    const[password, setPassword]=useState('')

    const[showErroeMessage, setErrorMessage]=useState(false)

    const navigate=useNavigate()

    const authContext=useAuth()

    function handleUsernameChange(event){
         setUsername(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    async function handleSubmit(){
        if(await authContext.login(username, password)){
                 navigate(`/welcome/${username}`)
        }else{
                 setErrorMessage(true)
        }
    }


    return(
        <div className="Login">
            <h1>Time to Login!</h1>
            <div className="LoginForm">
               {showErroeMessage && <div className='FailureMessage'>Authentication Failed! Please check your credentials</div>}
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit} >Login</button>
                </div>
            </div>

        </div>
    )
}
export default LoginComponent