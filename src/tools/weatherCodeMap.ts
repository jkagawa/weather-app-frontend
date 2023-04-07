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

import bgClear from '../assets/background/bg_clear_sky.jpg'
import bgClearNight from '../assets/background/bg_clear_sky_night.jpg'

import bgRain from '../assets/background/bg_rain.jpg'
import bgFog from '../assets/background/bg_fog.jpg'
import bgSnow from '../assets/background/bg_snow.jpg'
import bgThunderstorm from '../assets/background/bg_thunderstorm.jpg'
import bgFreezingRain from '../assets/background/bg_freezing_rain.jpg'


export const weatherCodeMap: {[key: number]: string[]} = {
    0:	["Clear sky", clear, bgClear, bgClearNight],
    1:	["Mainly clear, partly cloudy, and overcast", mainlyClear, bgClear, bgClearNight],
    2:	["Mainly clear, partly cloudy, and overcast", mainlyClear, bgClear, bgClearNight],
    3:	["Mainly clear, partly cloudy, and overcast", mainlyClear, bgClear, bgClearNight],
    45: ["Fog and depositing rime fog", fog, bgFog, bgFog],
    48: ["Fog and depositing rime fog", fog, bgFog, bgFog],
    51: ["Drizzle: Light, moderate, and dense intensity", drizzle, bgRain, bgRain],
    53: ["Drizzle: Light, moderate, and dense intensity", drizzle, bgRain, bgRain],
    55: ["Drizzle: Light, moderate, and dense intensity", drizzle, bgRain, bgRain],
    56: ["Freezing Drizzle: Light and dense intensity", freezingRain, bgFreezingRain, bgFreezingRain],
    57: ["Freezing Drizzle: Light and dense intensity", freezingRain, bgFreezingRain, bgFreezingRain],
    61: ["Rain: Slight, moderate and heavy intensity", rain, bgRain, bgRain],
    63: ["Rain: Slight, moderate and heavy intensity", rain, bgRain, bgRain],
    65: ["Rain: Slight, moderate and heavy intensity", rain, bgRain, bgRain],
    66: ["Freezing Rain: Light and heavy intensity", freezingRain, bgFreezingRain, bgFreezingRain],
    67: ["Freezing Rain: Light and heavy intensity", freezingRain, bgFreezingRain, bgFreezingRain],
    71: ["Snow fall: Slight, moderate, and heavy intensity", snow, bgSnow, bgSnow],
    73: ["Snow fall: Slight, moderate, and heavy intensity", snow, bgSnow, bgSnow],
    75: ["Snow fall: Slight, moderate, and heavy intensity", snow, bgSnow, bgSnow],
    77: ["Snow grains", snowShowers, bgSnow, bgSnow],
    80: ["Rain showers: Slight, moderate, and violent", rain, bgRain, bgRain],
    81: ["Rain showers: Slight, moderate, and violent", rain, bgRain, bgRain],
    82: ["Rain showers: Slight, moderate, and violent", rain, bgRain, bgRain],
    85: ["Snow showers slight and heavy", snowShowers, bgSnow, bgSnow],
    86: ["Snow showers slight and heavy", snowShowers, bgSnow, bgSnow],
    95: ["Thunderstorm: Slight or moderate", thunderstorm, bgThunderstorm, bgThunderstorm],
    96: ["Thunderstorm with slight and heavy hail", thunderstorm, bgThunderstorm, bgThunderstorm],
    99: ["Thunderstorm with slight and heavy hail", thunderstorm, bgThunderstorm, bgThunderstorm]
  }