import { imageListClasses } from "@mui/material"
import clear from '../assets/clear_sky.png'
import drizzle from '../assets/drizzle.png'
import fog from '../assets/fog.png'
import mainlyClear from '../assets/mainly_clear.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import snowShowers from '../assets/snow_showers.png'
import thunderstorm from '../assets/thunderstorm.png'
import freezingRain from '../assets/freezing_rain.png'


export const weatherCodeMap: {[key: number]: string[]} = {
    0:	["Clear sky", clear],
    1:	["Mainly clear, partly cloudy, and overcast", mainlyClear],
    2:	["Mainly clear, partly cloudy, and overcast", mainlyClear],
    3:	["Mainly clear, partly cloudy, and overcast", mainlyClear],
    45: ["Fog and depositing rime fog", fog],
    48: ["Fog and depositing rime fog", fog],
    51: ["Drizzle: Light, moderate, and dense intensity", drizzle],
    53: ["Drizzle: Light, moderate, and dense intensity", drizzle],
    55: ["Drizzle: Light, moderate, and dense intensity", drizzle],
    56: ["Freezing Drizzle: Light and dense intensity", freezingRain],
    57: ["Freezing Drizzle: Light and dense intensity", freezingRain],
    61: ["Rain: Slight, moderate and heavy intensity", rain],
    63: ["Rain: Slight, moderate and heavy intensity", rain],
    65: ["Rain: Slight, moderate and heavy intensity", rain],
    66: ["Freezing Rain: Light and heavy intensity", freezingRain],
    67: ["Freezing Rain: Light and heavy intensity", freezingRain],
    71: ["Snow fall: Slight, moderate, and heavy intensity", snow],
    73: ["Snow fall: Slight, moderate, and heavy intensity", snow],
    75: ["Snow fall: Slight, moderate, and heavy intensity", snow],
    77: ["Snow grains", snowShowers],
    80: ["Rain showers: Slight, moderate, and violent", rain],
    81: ["Rain showers: Slight, moderate, and violent", rain],
    82: ["Rain showers: Slight, moderate, and violent", rain],
    85: ["Snow showers slight and heavy", snowShowers],
    86: ["Snow showers slight and heavy", snowShowers],
    95: ["Thunderstorm: Slight or moderate", thunderstorm],
    96: ["Thunderstorm with slight and heavy hail", thunderstorm],
    99: ["Thunderstorm with slight and heavy hail", thunderstorm]
  }