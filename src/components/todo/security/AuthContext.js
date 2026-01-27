import { createContext, useContext, useState } from "react"
import { apiClient } from "../api/ApiClient"
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService.js"

// 1: Create Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// 2: Share the created context with other components
export default function AuthProvider({ children }) {

    // 3: Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    

async function login(username, password) {

    try {
        const response = await executeJwtAuthenticationService(username, password)

        if (response.status === 200) {

            const jwtTocken='bearer '+response.data.token

            setAuthenticated(true)
            setUsername(username)
            setToken(jwtTocken)

          
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('Intercept and adding a token')
                        config.headers.Authorization = jwtTocken
                        return config
                    }
                )
            return true
        } else {
            logout()
            return false
        }
    } catch (error) {
        logout()
        return false
    }
}


    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
       <AuthContext.Provider value={{ isAuthenticated, username, token, login, logout }}>
           {children}
       </AuthContext.Provider>
    )
}



// async function login(username, password) {
//     const baToken = 'Basic ' + window.btoa(username + ":" + password)

//     try {
//         const response = await executeBasicAuthenticationService(baToken)

//         if (response.status === 200) {
//             setAuthenticated(true)
//             setUsername(username)
//             setToken(baToken)

          
//                 interceptorId = apiClient.interceptors.request.use(
//                     (config) => {
//                         console.log('Intercept and adding a token')
//                         config.headers.Authorization = baToken
//                         return config
//                     }
//                 )
//             return true
//         } else {
//             logout()
//             return false
//         }
//     } catch (error) {
//         logout()
//         return false
//     }
// }