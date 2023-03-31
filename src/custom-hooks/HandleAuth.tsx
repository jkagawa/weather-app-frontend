import { useState } from "react"
import { server_calls } from "../api/server"


function HandleAuth() {
    const [ signUpData, setSignUpData ] = useState<{ [key: string]: any }>({})
    const [ logInData, setLogInData ] = useState<{ [key: string]: any }>({})

    async function handleSignUp(first_name: string, email: string, password: string) {
        const result = await server_calls.signUp(first_name, email, password)
        setSignUpData(result)
    }

    async function handleLogIn(email: string, password: string) {
        const result = await server_calls.logIn(email, password)
        setLogInData(result)
    }

    return { 
        signUpData,
        handleSignUp,
        logInData,
        handleLogIn
    }
}

export default HandleAuth