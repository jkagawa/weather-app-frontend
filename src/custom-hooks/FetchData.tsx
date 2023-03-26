import { useState, useEffect } from "react"
import { server_calls } from "../api/server"


function useGetData() {
    const [ weatherData, setWeatherData ] = useState<{}>({})
    const [ hourlyData, setHourlyData ] = useState<{}>({})
    const [ locationData, setLocationData ] = useState<{}>({})
    const defaultLatitude: string = '40.71'
    const defaultLongitude: string = '-74.01'

    async function handleDataFetch(latitude: string, longitude: string) {
        const result = await server_calls.getForecast(latitude, longitude)
        setWeatherData(result)
    }

    async function handleFetchHourly(latitude: string, longitude: string, date: string) {
        const result = await server_calls.getHourly(latitude, longitude, date)
        setHourlyData(result)
    }

    async function handleFetchLocation(location: string) {
        const result = await server_calls.searchLocation(location)
        setLocationData(result)
    }
    
    // useEffect on mount
    useEffect(() => {
        handleDataFetch(defaultLatitude, defaultLongitude)
    }, [])

    return { 
        weatherData, 
        getData: handleDataFetch, 
        getHourly: handleFetchHourly, 
        hourlyData, 
        defaultLatitude, 
        defaultLongitude, 
        getLocation: handleFetchLocation, 
        locationData,
        setLocationData
    }
}

export default useGetData