import { useState } from "react"
import { server_calls } from "../api/server"


function HandleDB() {
    const [ savedLocations, setSavedLocations ] = useState<[]>([])
    const [ userInfo, setUserInfo ] = useState<{}>({})

    async function handleGetSavedLocations(token: string) {
        const result = await server_calls.getSavedLocations(token)
        setSavedLocations(result)
        return result
    }

    async function handleUpdateUserInfo(first_name: string, token: string) {
        const result = await server_calls.updateUserInfo(first_name, token)
        setUserInfo(result)
    }

    async function handleSaveLocation(token: string, name: string, latitude: string, longitude: string, timezone: string, location_api_id: string) {
        const result = await server_calls.saveLocation(token, name, latitude, longitude, timezone, location_api_id)
        setSavedLocations(result)
    }

    async function handleDeleteSavedLocation(token: string, location_id: string) {
        const result = await server_calls.deleteSavedLocation(token, location_id)
        const output = await handleGetSavedLocations(token)
        return output
    }

    return { 
        savedLocations,
        handleGetSavedLocations,
        userInfo,
        handleUpdateUserInfo,
        handleSaveLocation,
        handleDeleteSavedLocation
    }
}

export default HandleDB