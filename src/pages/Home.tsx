import React, { useEffect, useState } from 'react'
import DayModal from '../components/DayModal'
import useGetData from '../custom-hooks/FetchData'
import { daysOfWeek } from '../tools/daysOfWeek'
import { hasData } from '../tools/functions'
import { weatherCodeMap } from '../tools/weatherCodeMap'
import { useForm } from 'react-hook-form'
import Input from '../components/Input'


export default function Home() {
  const { 
    weatherData, getData, 
    getHourly, hourlyData, 
    defaultLatitude, defaultLongitude,
    getLocation, locationData, setLocationData
  } = useGetData()
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ selectedItem, setSelectedItem ] = useState("")
  const [ currLatitude, setCurrLatitude ] = useState(defaultLatitude)
  const [ currLongitude, setCurrLongitude ] = useState(defaultLongitude)
  const [ currentCity, setCurrentCity ] = useState<string>("New York City")
  const { register, handleSubmit } = useForm({})

  function openModal(e: any, currDate: string) {
    setSelectedItem(e.target.getAttribute('data-id'))
    getHourly(currLatitude, currLongitude, currDate)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  const selectLocation = (latitude: string, longitude: string, city: string, id: string) => {
    setCurrentCity(city)
    setCurrLatitude(latitude)
    setCurrLongitude(longitude)
    getData(latitude, longitude)
    setLocationData({})
  }

  // useEffect(() => {
  //   console.log(weatherData)

  //   if(hasData(weatherData)) {
  //     maxTemps = weatherData.daily.temperature_2m_max
  //   }
  // }, [weatherData])

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

  const onSubmit = (data: any, event: any) => {
    const convertedLocation = encodeURI(data.location)
    getLocation(convertedLocation)
    event.target.reset()
  }

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

          {/* Suggested locations */}
          <div className='flex flex-row'>
            <button 
              onClick={() => selectLocation('40.71427','-74.00597', 'New York', '5128581')} 
              className="bg-gray-200 py-1 px-2 m-2 rounded-2xl hover:bg-slate-500 hover:text-white">
                New York
              </button>
            <button 
              onClick={() => selectLocation('37.77493','-122.41942', 'San Francisco', '5391959')} 
              className="bg-gray-200 py-1 px-2 m-2 rounded-2xl hover:bg-slate-500 hover:text-white">
                San Francisco
            </button>
            <button 
              onClick={() => selectLocation('41.85003','-87.65005', 'Chicago', '4887398')} 
              className="bg-gray-200 py-1 px-2 m-2 rounded-2xl hover:bg-slate-500 hover:text-white">
                Chicago
            </button>
          </div>

          {/* Search location */}
          <div className='flex flex-col items-center justify-center'>

            {/* Form */}
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className='flex flex-row items-center justify-center w-full max-w-xl'
            >
              {/* <label htmlFor="location" className="text-2xl">Search</label> */}
              <Input 
                {...register('location')} 
                name="location" 
                placeholder="City or postal code" 
                type="text"
              />
              <button className="flex justify-start m-3 p-2 rounded bg-gray-200 text-black hover:bg-slate-500 hover:text-white">
                Search
              </button>
            </form>

            {/* Results */}
            <div>
              {
                hasData(locationData)? (
                  locationData.results.map((location: any, index) => (
                    <div key={index} className={"cursor-pointer"} onClick={() => selectLocation(location.latitude, location.longitude, location.name)}>{location.name} {location.country} {location.population} {location.timezone} {location.latitude} {location.longitude}, ID: {location.id}</div>)
                  )
                ) : (
                  <></>
                )
              }
            </div>
          </div>
        
          {/* Current location */}
          <div className="text-4xl">{currentCity}</div>

          {/* Forecast Today */}
          <div className="text-2xl">Today</div>
          <div className="text-2xl">{dataForecast.length>0? `${dataForecast[0][3]} ${dataForecast[0][2]} - High: ${dataForecast[0][0]}, Low: ${dataForecast[0][1]} - ${dataForecast[0][4]} ${weatherCodeMap[dataForecast[0][4]]}` : ""}</div>
          
          {/* 3-Day Forecast */}
          <div className="text-base">3-Day Forecast</div>
          {
            dataForecast.map((d: any, index) => 
              (<div key={index} data-id={d[5]} className={"cursor-pointer" + (index == 0? " font-bold" : "")} onClick={(e) => openModal(e, d[2])}>{d[3]} {d[2]} - High: {d[0]}, Low: {d[1]} - {d[4]} {weatherCodeMap[d[4]]}</div>)
            )
          }

          {/* Week Forecast */}
          <div className="text-base">The Week</div>
          {
            dataWeek.map((d: any, index) => 
              (<div key={index} data-id={d[5]} className={"cursor-pointer" + (index == currDay? " font-bold" : "")} onClick={(e) => openModal(e, d[2])}>{d[3]} {d[2]} - High: {d[0]}, Low: {d[1]} - {d[4]} {weatherCodeMap[d[4]]}</div>)
            )
          }
      </div>

    </>
  )
}