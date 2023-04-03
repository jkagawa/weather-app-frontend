import { daysOfWeek } from '../tools/daysOfWeek'
import { hasData, convertDateFormatPartial, convertTimeFormat } from '../tools/functions'
import { weatherCodeMap } from '../tools/weatherCodeMap'

interface Props {
    modalOpen: boolean,
    closeModal: () => void,
    id: string,
    currentCity: string,
    hourlyData: { [key: string]: any } 
}

export default function DayModal(props: Props) {

    let hourly: { [key: string]: any[] } = {}
    let time: string[] = []
    let temp: string[]  = []
    let weathercode: number[] = []
    let date: string = ''
    let dayText: string = ''
    let timezone_abbreviation: string = ''

    if(hasData(props.hourlyData)) {
        hourly = props.hourlyData.hourly
        time = hourly.time
        temp = hourly.temperature_2m
        weathercode = hourly.weathercode
        date = time[0].split('T')[0]
        timezone_abbreviation = props.hourlyData.timezone_abbreviation

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

                        {/* Close button */}
                        <p 
                            className="flex m-3 bg-gray-400 p-2 rounded hover:bg-black text-white cursor-pointer"
                            onClick={ props.closeModal }
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </p>
                    </div>
                    <div className="flex-flex-col items-center text-center mt-3 p-2 overflow-auto">
                        
                        {/* Location name */}
                        <div className="text-3xl">{props.currentCity}</div>

                        {/* Day and Date */}
                        <div className="text-sm">
                            <div>{dayText}</div>
                            <div>{convertDateFormatPartial(date)} {timezone_abbreviation}</div>
                        </div>
                        {
                            time.map((time: any, index) => 
                                (
                                    <div 
                                        key={index}
                                        className='flex flex-row items-center justify-evenly m-3'
                                    >
                                        {/* Time */}
                                        <div>{convertTimeFormat(time.split('T')[1])}</div>

                                        {/* Temperature */}
                                        <div className='text-xl'>{Math.round(Number(temp[index]))}°F</div>

                                        {/* Weather icon */}
                                        <div className='w-12'><img src={weatherCodeMap[weathercode[index]][1]} alt={weatherCodeMap[weathercode[index]][0]} /></div>
                                          
                                    </div>)
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        
    )
}
