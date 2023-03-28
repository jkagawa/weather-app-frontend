
const base_url = 'https://api.open-meteo.com/v1/forecast'
const location_search_url = 'https://geocoding-api.open-meteo.com/v1/search'

const backend_url = 'https://titanium-bright-hurricane.glitch.me'
const options = {method: 'GET', headers: {accept: 'application/json'}};

export const server_calls = {
    getForecast: async (latitude: string, longitude: string) => {
        const parameters = `?latitude=${latitude}&longitude=${longitude}&past_days=6&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York&temperature_unit=fahrenheit`
        const response = await fetch(base_url + parameters, options)

        if(!response.ok) {
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },
    getHourly: async (latitude: string, longitude: string, date: string) => {
        const parameters = `?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&timezone=America%2FNew_York&temperature_unit=fahrenheit&start_date=${date}&end_date=${date}`
        const response = await fetch(base_url + parameters, options)

        if(!response.ok) {
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },
    
    searchLocation: async (location: string) => {
        const parameters = `?name=${location}`
        const response = await fetch(location_search_url + parameters, options)

        if(!response.ok) {
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },
    
    signUp: async (first_name: string, email: string, password: string) => {
        const options_signup = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                first_name: first_name,
                email: email,
                password: password
            })
        }

        const response = await fetch(backend_url + '/signup', options_signup)

        if(!response.ok) {
            throw new Error('Failed to sign up new user')
        }

        return await response.json()
    },
    
    logIn: async (email: string, password: string) => {
        const options_login = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }

        const response = await fetch(backend_url + '/signin', options_login)

        if(!response.ok) {
            throw new Error('Failed to log in')
        }

        return await response.json()
    },
    
    getSavedLocations: async (token: string) => {
        const options_get = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'x-access-token': 'Bearer ' + token,
                'access-control-allow-origin': '*'
            }
        }

        const response = await fetch(backend_url + '/api/location', options_get)

        if(!response.ok) {
            throw new Error('Failed to retrieve data')
        }

        return await response.json()
    },
    
    updateUserInfo: async (first_name: string, token: string) => {
        const options_get = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'x-access-token': 'Bearer ' + token
            },
            body: JSON.stringify({
                first_name: first_name
            })
        }

        const response = await fetch(backend_url + '/api/user', options_get)

        if(!response.ok) {
            throw new Error('Failed to update user')
        }

        return await response.json()
    }
}