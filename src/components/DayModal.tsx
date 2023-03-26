import { useEffect } from 'react'
import { daysOfWeek } from '../tools/daysOfWeek'
import { hasData } from '../tools/functions'
import { weatherCodeMap } from '../tools/weatherCodeMap'

interface Props {
    modalOpen: boolean,
    closeModal: () => void,
    id: string,
    currentCity: string,
    hourlyData: {}
}

export default function DayModal(props: Props) {

    let hourly: {} = {}
    let time: [] = []
    let temp: []  = []
    let weathercode: string = ''
    let date: string = ''
    let dayText: string = ''

    if(hasData(props.hourlyData)) {
        hourly = props.hourlyData.hourly
        time = hourly.time
        temp = hourly.temperature_2m
        weathercode = hourly.weathercode
        date = time[0].split('T')[0]

        const newDate = new Date(date)
        dayText = daysOfWeek[newDate.getDay()]
    }

    if(!props.modalOpen) return (<></>);
    return (
        <div
            className='fixed w-full h-full flex overflow-auto z-1 justify-center align-middle bg-gray-700 bg-opacity-50 z-10'
            onClick={ props.closeModal }
        >
            <div 
                className='max-w-xl w-4/5 h-4/5 fixed flex z-10 mt-20 mb-20 bg-white shadow-xl rounded'
                onClick={ (e) => e.stopPropagation() }
            >
                <div className="w-full flex flex-col">
                    <div className="flex flex-row justify-end">
                        <p 
                            className="flex m-3 bg-gray-400 p-2 rounded hover:bg-black text-white cursor-pointer"
                            onClick={ props.closeModal }
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </p>
                    </div>
                    <div className="flex-flex-col items-center text-center mt-3 p-2 overflow-auto">
                        <div className="text-2xl">{props.id}</div>
                        <div className="text-2xl">{props.currentCity}</div>
                        <div className="text-2xl">{dayText} {date}</div>
                        {
                            time.map((time: any, index) => 
                                (<div key={index}>{time.split('T')[1]} {temp[index]} {weathercode[index]} {weatherCodeMap[weathercode[index]]}</div>)
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        
    )
}
