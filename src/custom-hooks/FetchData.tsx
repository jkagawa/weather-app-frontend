import { useState, useEffect } from "react"
import { server_calls } from "../api/server"


function useGetData() {
    const [ weatherData, setWeatherData ] = useState<{}>({})
    const [ hourlyData, setHourlyData ] = useState<{}>({})
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
    
    // useEffect on mount
    useEffect(() => {
        handleDataFetch(defaultLatitude, defaultLongitude)
    }, [])

    return { weatherData, getData: handleDataFetch, getHourly: handleFetchHourly, hourlyData, defaultLatitude, defaultLongitude }
}

export default useGetData