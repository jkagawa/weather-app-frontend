const base_url = 'https://api.open-meteo.com/v1/forecast'
const location_search_url = 'https://geocoding-api.open-meteo.com/v1/search'

const backend_url = 'https://titanium-bright-hurricane.glitch.me'
const options = {method: 'GET', headers: {accept: 'application/json'}};
// const test_url = 'http://127.0.0.1:5000'

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
                first_name: first_name.toString(),
                email: email.toString(),
                password: password.toString()
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
                email: email.toString(),
                password: password.toString()
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
        const options_update = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'x-access-token': 'Bearer ' + token
            },
            body: JSON.stringify({
                first_name: first_name.toString()
            })
        }

        const response = await fetch(backend_url + '/api/user', options_update)

        if(!response.ok) {
            throw new Error('Failed to update user')
        }

        return await response.json()
    },

    saveLocation: async (token: string, name: string, latitude: string, longitude: string, timezone: string, location_api_id: string) => {
        const options_save = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'x-access-token': 'Bearer ' + token,
                'access-control-allow-origin': '*'
            },
            body: JSON.stringify({
                name: name.toString(),
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                timezone: timezone.toString(),
                location_api_id: location_api_id.toString()
            })
        }

        const response = await fetch(backend_url + '/api/location', options_save)

        if(!response.ok) {
            throw new Error('Failed to add data to the database')
        }

        return await response.json()
    }
}