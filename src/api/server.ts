
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
    }
}