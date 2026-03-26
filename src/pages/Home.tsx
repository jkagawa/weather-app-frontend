import { useEffect, useState } from 'react'
import DayModal from '../components/DayModal'
import useGetData from '../custom-hooks/FetchData'
import { daysOfWeek } from '../tools/daysOfWeek'
import { hasData, convertDateFormatFull, convertDateFormatPartial } from '../tools/functions'
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
    dateToday, currentTime, isDay
  } = useGetData()

  const [ modalOpen, setModalOpen ] = useState(false)
  const [ selectedItem, setSelectedItem ] = useState("")
  const [ currLatitude, setCurrLatitude ] = useState(defaultLatitude)
  const [ currLongitude, setCurrLongitude ] = useState(defaultLongitude)
  const [ currentCity, setCurrentCity ] = useState<string>(defaultCity)
  const [ currentCityId, setCurrentCityId ] = useState<string>(defaultCityId)
  const [ currentTimeZone, setCurrentTimeZone ] = useState<string>(defaultTimeZone)
  const [ locationSaved, setLocationSaved ] = useState(false)
  const [ showLocationSelection, setShowLocationSelection ] = useState(false)

  const { handleSaveLocation, savedLocations, handleGetSavedLocations } = HandleDB()

  const { register, handleSubmit } = useForm({})

  function openModal(e: any, date: string) {
    setSelectedItem(e.target.getAttribute('data-id'))
    getHourly(currLatitude, currLongitude, date)
    setModalOpen(true)
  }

  function closeModal() {
    getHourly(currLatitude, currLongitude, dateToday)
    setModalOpen(false)
  }

  const selectLocation = (latitude: string, longitude: string, city: string, id: string, timezone: string) => {
    setShowLocationSelection(false)
    setCurrentCity(city)
    setCurrLatitude(latitude)
    setCurrLongitude(longitude)
    setCurrentCityId(id)
    setCurrentTimeZone(timezone)
    getData(latitude, longitude)
    getHourly(latitude, longitude, dateToday)
    setLocationData({})
    console.log(city, latitude, longitude, id, timezone)
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

  const toggleLocationSelection = () => {
    setShowLocationSelection(!showLocationSelection)
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

      {/* Background */}
      <div className='fixed z-0 w-screen left-1/2 transform -translate-x-1/2'>
        {
          dataHourly.length>0 ? (
            <img
              src={isDay ? weatherCodeMap[dataHourly[2]][2] : weatherCodeMap[dataHourly[2]][3]}
              alt={weatherCodeMap[dataHourly[2]][0]}
              className='h-screen w-screen object-cover m-auto'
            />
          ) : (
            <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
          )
        }
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="flex flex-col items-center justify-center text-center pt-20 pb-12 z-10 relative px-4">

        {/* Toggle location button */}
        <button
          onClick={toggleLocationSelection}
          className='flex items-center gap-2 px-4 py-2 mt-2 rounded-full glass text-white/90 text-sm font-medium hover:bg-white/20 transition-all duration-200 text-shadow-sm'
        >
          <i className="fa-solid fa-location-dot text-sky-300"></i>
          Pick a different location
          <i className={'fa-solid fa-chevron-down text-xs transition-transform duration-300 ' + (showLocationSelection ? 'rotate-180' : '')}></i>
        </button>

        {/* Location selection panel */}
        <div className={'overflow-hidden transition-all duration-300 ease-in-out w-full max-w-lg ' + (showLocationSelection ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0')}>

          {/* Search form */}
          <div className='flex flex-col items-center justify-center glass rounded-2xl mt-3 p-4 shadow-glass'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              onChange={handleSubmit(onSubmit)}
              className='flex flex-row items-center justify-center w-full gap-2'
            >
              <div className="flex-1">
                <Input
                  {...register('location')}
                  name="location"
                  type="text"
                  label="City or postal code"
                />
              </div>
              <button className='px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-all duration-200 shadow-sm'>
                Search
              </button>
            </form>

            {/* Search results */}
            <div className='flex flex-col w-full mt-2'>
              {
                Object.hasOwn(locationData, 'results') ? (
                  locationData.results.map((location: any, index: any) => (
                    <button
                      key={index}
                      className="glass-dark text-white/90 py-2 px-4 my-1 rounded-xl hover:bg-white/20 text-sm text-left transition-all duration-200"
                      onClick={() => selectLocation(location.latitude, location.longitude, location.name, location.id, location.timezone)}
                    >
                      <span className="font-medium">{location.name}</span>
                      <span className="text-white/60 ml-2">{location.country}</span>
                      {location.population ? <span className="text-white/40 ml-2 text-xs">pop. {location.population.toLocaleString()}</span> : ''}
                    </button>
                  ))
                ) : hasData(locationData) ? (
                  <div className="text-white/60 text-sm py-2">No results found</div>
                ) : (<></>)
              }
            </div>
          </div>

          {/* Saved & suggested locations */}
          <div className='glass rounded-2xl mt-2 p-4 shadow-glass text-left'>

            {/* Saved locations */}
            {
              savedLocations.length > 0 ? (
                <div className='mb-4'>
                  <div className='text-xs font-semibold tracking-widest text-white/50 uppercase mb-2'>Saved</div>
                  <div className='flex flex-row flex-wrap gap-2'>
                    {savedLocations.map((location: any, index: number) =>
                      <button
                        key={index}
                        onClick={() => selectLocation(location.latitude, location.longitude, location.name, location.location_api_id, location.timezone)}
                        className="glass-dark text-white/90 py-1 px-3 rounded-full text-sm hover:bg-white/20 transition-all duration-200"
                      >
                        <i className="fa-solid fa-star text-sky-300 mr-1.5 text-xs"></i>
                        {location.name}
                      </button>
                    )}
                  </div>
                </div>
              ) : (<></>)
            }

            {/* Suggested locations */}
            <div>
              <div className='text-xs font-semibold tracking-widest text-white/50 uppercase mb-2'>Suggested</div>
              <div className='flex flex-row flex-wrap gap-2'>
                {[
                  { name: 'New York', lat: '40.71427', lng: '-74.00597', id: '5128581', tz: 'America/New_York' },
                  { name: 'San Francisco', lat: '37.77493', lng: '-122.41942', id: '5391959', tz: 'America/Los_Angeles' },
                  { name: 'Chicago', lat: '41.85003', lng: '-87.65005', id: '4887398', tz: 'America/Chicago' },
                  { name: 'London', lat: '51.50853', lng: '-0.12574', id: '2643743', tz: 'Europe/London' },
                  { name: 'Beijing', lat: '39.9075', lng: '116.39723', id: '1816670', tz: 'Asia/Shanghai' },
                  { name: 'Tokyo', lat: '35.6895', lng: '139.69171', id: '1850147', tz: 'Asia/Tokyo' },
                ].map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => selectLocation(loc.lat, loc.lng, loc.name, loc.id, loc.tz)}
                    className="glass-dark text-white/80 py-1 px-3 rounded-full text-sm hover:bg-white/20 hover:text-white transition-all duration-200"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Current location */}
        <div className='flex flex-row items-center justify-center gap-3 mt-4'>
          <div className="text-5xl font-light text-white text-shadow tracking-tight">{currentCity}</div>
          {
            !locationSaved ? (
              <button
                className='flex flex-row items-center gap-1.5 py-1 px-3 rounded-full glass text-white/70 hover:text-sky-300 text-sm transition-all duration-200 hover:bg-white/20'
                onClick={saveLocation}
              >
                <i className="fa-solid fa-star text-xs"></i>
                <span>Save</span>
              </button>
            ) : (
              <div className='flex flex-row items-center gap-1.5 py-1 px-3 rounded-full glass text-sky-300 text-sm'>
                <i className="fa-solid fa-star text-xs"></i>
                <span>Saved</span>
              </div>
            )
          }
        </div>

        {/* Today's forecast */}
        <div className='glass rounded-2xl shadow-glass p-5 mt-4 w-full max-w-sm'>
          <div className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-3">Today</div>

          {dataForecast.length > 0 ? (
            <div>
              <div className="text-xs text-white/50 mb-4">
                {convertDateFormatFull(dataForecast[0][2])} &middot; {currentTime}
              </div>

              {dataHourly.length > 0 ? (
                <div className='flex flex-col items-center'>
                  <div className='text-8xl font-thin text-white text-shadow tracking-tighter'>
                    {dataHourly[1]}°
                  </div>
                  <div className='w-24 my-2'>
                    <img src={weatherCodeMap[dataHourly[2]][1]} alt={weatherCodeMap[dataHourly[2]][0]} />
                  </div>
                  <div className='text-sm text-white/70 font-medium'>{weatherCodeMap[dataHourly[2]][0]}</div>
                  <div className='flex flex-row gap-6 mt-4'>
                    <div className='flex flex-col items-center'>
                      <div className='text-xs text-white/50 uppercase tracking-widest'>High</div>
                      <div className='text-xl font-light text-white text-shadow'>{Math.round(Number(dataForecast[0][0]))}°F</div>
                    </div>
                    <div className='w-px bg-white/20'></div>
                    <div className='flex flex-col items-center'>
                      <div className='text-xs text-white/50 uppercase tracking-widest'>Low</div>
                      <div className='text-xl font-light text-white text-shadow'>{Math.round(Number(dataForecast[0][1]))}°F</div>
                    </div>
                  </div>
                </div>
              ) : (<></>)}
            </div>
          ) : (<></>)}
        </div>

        {/* 3-Day Forecast */}
        <div className='w-full max-w-lg mt-6'>
          <div className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-3 text-shadow-sm">3-Day Forecast</div>
          <div className='flex flex-row items-stretch justify-center gap-3 flex-wrap'>
            {
              dataForecast.map((d: any, index) => (
                <div
                  key={index}
                  data-id={d[5]}
                  className={
                    'flex flex-col items-center justify-between p-4 cursor-pointer rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-glass-lg min-w-[120px] flex-1 ' +
                    (index === 0
                      ? 'bg-sky-500/40 backdrop-blur-md border border-sky-400/40 shadow-glass text-white'
                      : 'glass text-white/90 hover:bg-white/20')
                  }
                  onClick={(e) => openModal(e, d[2])}
                >
                  <div className='flex flex-col items-center'>
                    <div className='text-sm font-semibold text-shadow-sm'>{d[3]}</div>
                    <div className='text-xs text-white/50 mt-0.5'>{convertDateFormatPartial(d[2])}</div>
                  </div>
                  <div className='w-14 my-3'>
                    <img src={weatherCodeMap[d[4]][1]} alt={weatherCodeMap[d[4]][0]} />
                  </div>
                  <div className='text-xs text-white/60 mb-2'>{weatherCodeMap[d[4]][0]}</div>
                  <div className='flex flex-row gap-3'>
                    <div className='flex flex-col items-center'>
                      <div className='text-xs text-white/40 uppercase tracking-widest'>Hi</div>
                      <div className='text-base font-medium text-shadow-sm'>{Math.round(Number(d[0]))}°</div>
                    </div>
                    <div className='flex flex-col items-center'>
                      <div className='text-xs text-white/40 uppercase tracking-widest'>Lo</div>
                      <div className='text-base font-medium text-shadow-sm'>{Math.round(Number(d[1]))}°</div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* Week Forecast */}
        <div className='w-full max-w-lg mt-6'>
          <div className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-3 text-shadow-sm">The Week</div>
          <div className='flex flex-col gap-2'>
            {
              dataWeek.map((d: any, index) => (
                <div
                  key={index}
                  data-id={d[5]}
                  className={
                    'flex flex-row items-center justify-between p-3 px-4 cursor-pointer rounded-xl transition-all duration-200 ' +
                    (index === currDay
                      ? 'bg-sky-500/40 backdrop-blur-md border border-sky-400/30 text-white'
                      : 'glass text-white/90 hover:bg-white/20')
                  }
                  onClick={(e) => openModal(e, d[2])}
                >
                  <div className='w-1/4 text-left'>
                    <div className='text-sm font-medium text-shadow-sm'>{d[3]}</div>
                    <div className='text-xs text-white/45'>{convertDateFormatPartial(d[2])}</div>
                  </div>

                  <div className='flex flex-row items-center gap-1 w-1/4 justify-center'>
                    <div className='w-8'>
                      <img src={weatherCodeMap[d[4]][1]} alt={weatherCodeMap[d[4]][0]} />
                    </div>
                  </div>

                  <div className='w-1/4 text-center'>
                    <div className='text-xs text-white/45 uppercase tracking-widest'>Hi</div>
                    <div className='text-base font-medium text-shadow-sm'>{Math.round(Number(d[0]))}°F</div>
                  </div>

                  <div className='w-1/4 text-center'>
                    <div className='text-xs text-white/45 uppercase tracking-widest'>Lo</div>
                    <div className='text-base font-medium text-shadow-sm'>{Math.round(Number(d[1]))}°F</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </>
  )
}
