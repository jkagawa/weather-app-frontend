import React, { useEffect, useState } from 'react'
import DayModal from '../components/DayModal'
import useGetData from '../custom-hooks/FetchData'
import { daysOfWeek } from '../tools/daysOfWeek'
import { hasData } from '../tools/functions'
import { weatherCodeMap } from '../tools/weatherCodeMap'

export default function Home() {
  const { weatherData, getData, getHourly, hourlyData, defaultLatitude, defaultLongitude } = useGetData()
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ selectedItem, setSelectedItem ] = useState("")
  const [ currLatitude, setCurrLatitude ] = useState(defaultLatitude)
  const [ currLongitude, setCurrLongitude ] = useState(defaultLongitude)
  const [ currentCity, setCurrentCity ] = useState<string>("New York City")

  function openModal(e: any, currDate: string) {
    setSelectedItem(e.target.getAttribute('data-id'))
    getHourly(currLatitude, currLongitude, currDate)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  const selectLocation = (latitude: string, longitude: string, city: string) => {
    setCurrentCity(city)
    setCurrLatitude(latitude)
    setCurrLongitude(longitude)
    getData(latitude, longitude)
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

  return (
    <>
      <DayModal 
        modalOpen={modalOpen} 
        closeModal={closeModal} 
        id={selectedItem}
        currentCity={currentCity}
        hourlyData={hourlyData}/>
      <div className="flex flex-col items-center justify-center text-center pt-14">
          <div className="text-4xl font-semibold p-4">Welcome to Seer!</div>
          <button onClick={() => selectLocation('40.71','-74.01', 'New York City')} className="bg-gray-200 p-2 m-2 rounded">New York City</button>
          <button onClick={() => selectLocation('37.77','-122.42', 'San Francisco')} className="bg-gray-200 p-2 m-2 rounded">San Francisco</button>
          <button onClick={() => selectLocation('41.85','-87.65', 'Chicago')} className="bg-gray-200 p-2 m-2 rounded">Chicago</button>
          <div className="text-2xl">{currentCity}</div>
          <div className="text-2xl">Today</div>
          <div className="text-2xl">{dataForecast.length>0? `${dataForecast[0][3]} ${dataForecast[0][2]} - High: ${dataForecast[0][0]}, Low: ${dataForecast[0][1]} - ${dataForecast[0][4]} ${weatherCodeMap[dataForecast[0][4]]}` : ""}</div>
          <div className="text-base">3-Day Forecast</div>
          {
            dataForecast.map((d: any, index) => 
              (<div key={index} data-id={d[5]} className={"cursor-pointer" + (index == 0? " font-bold" : "")} onClick={(e) => openModal(e, d[2])}>{d[3]} {d[2]} - High: {d[0]}, Low: {d[1]} - {d[4]} {weatherCodeMap[d[4]]}</div>)
            )
          }
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