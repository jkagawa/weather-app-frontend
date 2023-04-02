import React, { useEffect, useState } from 'react'
import DayModal from '../components/DayModal'
import useGetData from '../custom-hooks/FetchData'
import { daysOfWeek } from '../tools/daysOfWeek'
import { hasData } from '../tools/functions'
import { weatherCodeMap } from '../tools/weatherCodeMap'
import { useForm } from 'react-hook-form'
import Input from '../components/Input'
import HandleDB from '../custom-hooks/HandleDB'

interface Props {
  loggedIn: boolean,
  setLoggedIn: any,
  firstName: string,
  email: string,
  token: string,
  setFirstName: any
}

export default function Home(props: Props) {
  const { 
    weatherData, getData, 
    getHourly, hourlyData, 
    defaultLatitude, defaultLongitude,
    getLocation, locationData, setLocationData,
    defaultCity, defaultCityId, defaultTimeZone,
    dateToday
  } = useGetData()

  const [ modalOpen, setModalOpen ] = useState(false)
  const [ selectedItem, setSelectedItem ] = useState("")
  const [ currLatitude, setCurrLatitude ] = useState(defaultLatitude)
  const [ currLongitude, setCurrLongitude ] = useState(defaultLongitude)
  const [ currentCity, setCurrentCity ] = useState<string>(defaultCity)
  const [ currentCityId, setCurrentCityId ] = useState<string>(defaultCityId)
  const [ currentTimeZone, setCurrentTimeZone ] = useState<string>(defaultTimeZone)
  const [ locationSaved, setLocationSaved ] = useState(false)

  const { handleSaveLocation, savedLocations, handleGetSavedLocations } = HandleDB()

  const { register, handleSubmit } = useForm({})

  function openModal(e: any, currDate: string) {
    setSelectedItem(e.target.getAttribute('data-id'))
    getHourly(currLatitude, currLongitude, currDate)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  const selectLocation = (latitude: string, longitude: string, city: string, id: string, timezone: string) => {
    setCurrentCity(city)
    setCurrLatitude(latitude)
    setCurrLongitude(longitude)
    setCurrentCityId(id)
    setCurrentTimeZone(timezone)
    getData(latitude, longitude)
    getHourly(latitude, longitude, dateToday)
    setLocationData({})
  }

  let dataForecast = []
  let dataWeek = []

  const currDate = new Date()
  const currDay = currDate.getDay()

  if(hasData(weatherData)) {
    const maxForecast = weatherData.daily.temperature_2m_max

    for(let i=0; i<maxForecast.length; i++) {
      let max = weatherData.daily.temperature_2m_max[i]
      let min = weatherData.daily.temperature_2m_min[i]
      let date = weatherData.daily.time[i]
      let weathercode = weatherData.daily.weathercode[i]

      const newDate = new Date(date)

      if(i > 5 && i < 9) {
        dataForecast.push([max, min, date, daysOfWeek[newDate.getDay()], weathercode, i])
      }
      
      if(i >= (6-currDay) && i < (13-currDay)) {
        dataWeek.push([max, min, date, daysOfWeek[newDate.getDay()], weathercode, i])
      }
    }
  }

  let dataHourly: any[] = []

  if(hasData(hourlyData)) {

    const time = hourlyData.hourly.time[currDate.getHours()]
    const temp = Math.round(Number(hourlyData.hourly.temperature_2m[currDate.getHours()]))
    const weathercode = hourlyData.hourly.weathercode[currDate.getHours()]

    dataHourly = [time, temp, weathercode]
  }

  const onSubmit = (data: any, event: any) => {
    if(data.location) {
      const convertedLocation = encodeURI(data.location)
      getLocation(convertedLocation)
      event.target.reset()
    }
  }

  const saveLocation = () => {
    console.log(props.token, currentCity, currLatitude, currLongitude, currentCityId, currentTimeZone)
    handleSaveLocation(props.token, currentCity, currLatitude, currLongitude, currentTimeZone, currentCityId)
  }

  const checkIfLocationSaved = () => {
    setLocationSaved(false)
    if(savedLocations.length>0) {
      for(let i=0; i<savedLocations.length; i++) {
        const location: { [key: string]: any[] } = savedLocations[i]
        if(location.location_api_id.toString() == currentCityId.toString()) {
          setLocationSaved(true)
        }
      }
    }
  }

  useEffect(() => {
    if(props.token) {
      handleGetSavedLocations(props.token)
    }
  }, [props.token])

  useEffect(() => {
    checkIfLocationSaved()
  }, [currentCityId])

  useEffect(() => {
    checkIfLocationSaved()
  }, [savedLocations])

  return (
    <>
      <DayModal 
        modalOpen={modalOpen} 
        closeModal={closeModal} 
        id={selectedItem}
        currentCity={currentCity}
        hourlyData={hourlyData}
      />

      <div className="flex flex-col items-center justify-center text-center pt-14 pb-10">

          {/* Heading */}
          <div className="text-4xl font-semibold p-4">Welcome to Seer!</div>

          {/* Saved locations */}
          {
            savedLocations.length>0? (
              <div className='flex flex-col items-start max-w-screen-lg bg-gray-50 m-4'>

                <div className='text-sm mx-2'>Saved locations</div>

                <div className='flex flex-row flex-wrap items-center justify-center'>
                  {savedLocations.map((location: any, index: number) => 
                    <button
                      key={index}
                      onClick={() => selectLocation(location.latitude, location.longitude, location.name, location.location_api_id, location.timezone)} 
                      className="bg-gray-200 py-1 px-2 m-2 rounded-2xl hover:bg-slate-500 hover:text-white"
                    >{location.name}</button>
                  )}
                </div>

              </div>
            ) : (<></>)
          }
          

          {/* Search location */}
          <div className='flex flex-col items-center justify-center'>

            {/* Form */}
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className='flex flex-row items-center justify-center max-w-xl'
            >
              <Input 
                {...register('location')} 
                name="location" 
                type="text"
                label="City or postal code"
              />
              <button className='flex justify-start m-3 p-2 rounded bg-gray-200 text-black hover:bg-[#0E86D4] hover:text-white'>
                Search
              </button>
            </form>

            {/* Results */}
            <div>
              {
                Object.hasOwn(locationData, 'results')? (
                  locationData.results.map((location: any, index: any) => (
                    <button 
                      key={index} 
                      className={"bg-gray-200 py-1 px-2 m-2 rounded-2xl hover:bg-slate-500 hover:text-white"} 
                      onClick={() => selectLocation(location.latitude, location.longitude, location.name, location.id, location.timezone)}
                    >
                      {location.name} {location.country} {location.population} {location.timezone} {location.latitude} {location.longitude}, ID: {location.id}, Time Zone: {location.timezone}
                    </button>)
                  )
                ) : hasData(locationData)? (
                  <div>No result found</div>
                ) : (<></>)
              }
            </div>
          </div>

          {/* Suggested locations */}
          <div className='flex flex-col items-start max-w-screen-lg bg-gray-50 m-4'>
            <div className='text-sm mx-2'>Suggest locations</div>
            <div className='flex flex-row flex-wrap'>
              <button 
                onClick={() => selectLocation('40.71427','-74.00597', 'New York', '5128581', 'America/New_York')} 
                className="bg-gray-200 py-1 px-2 m-2 rounded-2xl hover:bg-slate-500 hover:text-white">
                  New York
              </button>
              <button 
                onClick={() => selectLocation('37.77493','-122.41942', 'San Francisco', '5391959', 'America/Los_Angeles')} 
                className="bg-gray-200 py-1 px-2 m-2 rounded-2xl hover:bg-slate-500 hover:text-white">
                  San Francisco
              </button>
              <button 
                onClick={() => selectLocation('41.85003','-87.65005', 'Chicago', '4887398', 'America/Chicago')} 
                className="bg-gray-200 py-1 px-2 m-2 rounded-2xl hover:bg-slate-500 hover:text-white">
                  Chicago
              </button>
            </div>
          </div>
        
          {/* Current location */}
          <div className='flex flex-row items-center justify-center'>
            <div className="text-4xl">{currentCity}</div>
            {
              !locationSaved? (
                <button 
                  className='mx-2 flex flex-row items-center justify-center hover:text-[#0E86D4]'
                  onClick={saveLocation}
                >
                  <i className="fa-solid fa-star mx-1"></i>
                  <div className='text-sm'>Save location</div>
                </button>
              ) : (
                <div 
                  className='mx-2 flex flex-row items-center justify-center text-[#0E86D4]'
                >
                  <i className="fa-solid fa-star mx-1"></i>
                  <div className='text-sm'>Saved</div>
                </div>
              )
            }
            
          </div>

          {/* Forecast Today */}
          <div className='p-2 max-w-screen-lg bg-gray-50 m-4'>
            <div className="text-2xl">Today</div>

            <div className="text-base">
              { dataForecast.length>0? (
                <div>
                  <div className="text-xs">
                    {dataForecast[0][3]} {dataForecast[0][2]}
                  </div>

                  {/* Forecast Now */}
                  {
                    dataHourly.length>0? (
                      <div className='flex flex-col items-center justify-center'>
                        <div className='flex flex-row items-center justify-center'>
                          <div className='text-xs'>Now</div>
                          <div className='text-7xl p-2'>{dataHourly[1]}°F</div>
                        </div>
                        <div className='w-32'><img src={weatherCodeMap[dataHourly[2]][1]} alt={weatherCodeMap[dataHourly[2]][0]} /></div>
                        <div className='w-48 text-xs p-2'>{weatherCodeMap[dataHourly[2]][0]}</div>
                      </div>
                    ) : (<></>)
                  }

                  {/* High Today */}
                  <div className='flex flex-row items-center justify-evenly'>
                    <div className='flex flex-row items-center'>
                      <div className='p-2 text-xs'>High</div>
                      <div className='text-2xl p-2'>{Math.round(Number(dataForecast[0][0]))}°F</div>
                    </div>

                    {/* Low Today */}
                    <div className='flex flex-row items-center'>
                      <div className='p-2 text-xs'>Low</div>
                      <div className='text-2xl p-2'>{Math.round(Number(dataForecast[0][1]))}°F</div>
                    </div>
                  </div>

                </div>
                ) : (<></>)
              }
            </div>
          </div>
          
          
          {/* 3-Day Forecast */}
          <div className='p-2 w-full max-w-screen-md bg-gray-50 m-4'>
            <div className="text-2xl">3-Day Forecast</div>
            <div className='flex flex-row items-center justify-center flex-wrap'>
              {
                dataForecast.map((d: any, index) => 
                  (
                    <div 
                      key={index} 
                      data-id={d[5]} 
                      className={"flex flex-col items-center justify-center hover:bg-gray-200 m-1 p-2 cursor-pointer border rounded-xl" + (index == 0? " bg-gray-100 border-gray-50" : " border-gray-50")} 
                      onClick={(e) => openModal(e, d[2])}
                    >
                      {/* Day and Date */}
                      <div className='flex flex-col items-center justify-center'>
                        <div className='text-lg'>{d[3]}</div>
                        <div className='text-xs'>{d[2]}</div>
                      </div>

                      {/* High */}
                      <div className='flex flex-row items-center justify-center'>
                        <div className='flex flex-col items-center justify-center m-2'>
                          <div className='text-xs'>High</div>
                          <div className='text-xl mx-2'>{Math.round(Number(d[0]))}°F</div>
                        </div>

                        {/* Low */}
                        <div className='flex flex-col items-center justify-center m-2'>
                          <div className='text-xs'>Low</div>
                          <div className='text-xl mx-2'>{Math.round(Number(d[1]))}°F</div>
                        </div>
                      </div>

                      {/* Weather icon and description */}
                      <div className='flex flex-col items-center justify-center'>
                        <div className='w-16'><img src={weatherCodeMap[d[4]][1]} alt={weatherCodeMap[d[4]][0]} /></div>
                        <div className='w-48 text-xs'>{weatherCodeMap[d[4]][0]}</div>
                      </div>
                    </div>
                  )
                )
              }
            </div>
          </div>
          
          {/* Week Forecast */}
          <div className='p-2 w-full max-w-screen-md bg-gray-50 m-4'>
            <div className="text-2xl">The Week</div>
            <div className='flex flex-col'>
              {
                dataWeek.map((d: any, index) => 
                  (
                    <div 
                      key={index} 
                      data-id={d[5]} 
                      className={"flex flex-row items-center justify-center hover:bg-gray-200 m-1 p-2 cursor-pointer border rounded-xl" + (index == currDay? " bg-gray-100 border-gray-50" : " border-gray-50")} onClick={(e) => openModal(e, d[2])}
                    >
                      {/* Day and Date */}
                      <div className='w-1/4'>
                        <div className='text-lg'>{d[3]}</div>
                        <div className='text-xs'>{d[2]}</div>
                      </div>

                      {/* High */}
                      <div className='w-1/4'>
                        <div className='text-xs'>High</div>
                        <div className='text-xl mx-2'>{Math.round(Number(d[0]))}°F</div>
                      </div>

                      {/* Low */}
                      <div className='w-1/4'>
                        <div className='text-xs'>Low</div>
                        <div className='text-xl mx-2'>{Math.round(Number(d[1]))}°F</div>
                      </div>

                      {/* Weather icon and description */}
                      <div className='w-1/4 flex flex-col items-center justify-center'>
                        <div className='w-16'><img src={weatherCodeMap[d[4]][1]} alt={weatherCodeMap[d[4]][0]} /></div>
                        <div className='w-32 text-xs'>{weatherCodeMap[d[4]][0]}</div>
                      </div>
                    </div>
                  )
                )
              }
            </div>
            
          </div>

      </div>

    </>
  )
}