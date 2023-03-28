import { useState } from "react"
import { server_calls } from "../api/server"


function HandleAuth() {
    const [ signUpData, setSignUpData ] = useState<{}>({})

    async function handleSignUp(first_name: string, email: string, password: string) {
        const result = await server_calls.signUp(first_name, email, password)
        setSignUpData(result)
    }

    return { 
        signUpData,
        handleSignUp
    }
}

export default HandleAuth