import { useState, useEffect } from "react"
import { server_calls } from "../api/server"


function useGetData() {
    const [ weatherData, setWeatherData ] = useState<{ [key: string]: any }>({})
    const [ hourlyData, setHourlyData ] = useState<{ [key: string]: any }>({})
    const [ locationData, setLocationData ] = useState<{ [key: string]: any }>({})
    const defaultLatitude: string = '40.71427'
    const defaultLongitude: string = '-74.00597'
    const defaultCity: string = 'New York'
    const defaultCityId: string = '5128581'
    const defaultTimeZone: string = 'America/New_York'

    let newDate = new Date()
    const year = newDate.toLocaleString("default", { year: "numeric" })
    const month = newDate.toLocaleString("default", { month: "2-digit" })
    const day = newDate.toLocaleString("default", { day: "2-digit" })
    const dateToday = year + '-' + month + '-' + day

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
        let newDate = new Date()
        const year = newDate.toLocaleString("default", { year: "numeric" })
        const month = newDate.toLocaleString("default", { month: "2-digit" })
        const day = newDate.toLocaleString("default", { day: "2-digit" })
        const date = year + '-' + month + '-' + day

        handleDataFetch(defaultLatitude, defaultLongitude)
        handleFetchHourly(defaultLatitude, defaultLongitude, dateToday)
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
        setLocationData,
        defaultCity,
        defaultCityId,
        defaultTimeZone,
        dateToday
    }
}

export default useGetData