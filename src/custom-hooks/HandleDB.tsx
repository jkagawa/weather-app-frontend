import { useState } from "react"
import { server_calls } from "../api/server"


function HandleDB() {
    const [ savedLocations, setSavedLocations ] = useState<[]>([])
    const [ userInfo, setUserInfo ] = useState<{}>({})

    async function handleGetSavedLocations(token: string) {
        const result = await server_calls.getSavedLocations(token)
        setSavedLocations(result)
    }

    async function handleUpdateUserInfo(first_name: string, token: string) {
        const result = await server_calls.updateUserInfo(first_name, token)
        setUserInfo(result)
    }

    return { 
        savedLocations,
        handleGetSavedLocations,
        userInfo,
        handleUpdateUserInfo
    }
}

export default HandleDB