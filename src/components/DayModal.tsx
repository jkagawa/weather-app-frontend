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
    let temp: string[] = []
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
            className='fixed w-full h-full flex overflow-auto justify-center items-start bg-black/50 backdrop-blur-sm z-50'
            onClick={props.closeModal}
        >
            <div
                className='max-w-md w-11/12 fixed flex z-10 mt-20 mb-20 glass-modal rounded-2xl shadow-glass-lg overflow-hidden'
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex flex-col max-h-[75vh]">

                    {/* Header */}
                    <div className="flex flex-row items-start justify-between p-5 border-b border-white/10">
                        <div>
                            <div className="text-2xl font-light text-white tracking-tight">{props.currentCity}</div>
                            <div className="text-sm text-white/50 mt-0.5">
                                {dayText} &middot; {convertDateFormatPartial(date)}
                                {timezone_abbreviation && <span className="ml-1">{timezone_abbreviation}</span>}
                            </div>
                        </div>
                        <button
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 mt-0.5"
                            onClick={props.closeModal}
                        >
                            <i className="fa-solid fa-xmark text-sm"></i>
                        </button>
                    </div>

                    {/* Hourly list */}
                    <div className="overflow-y-auto scrollbar-thin flex-1">
                        {
                            time.map((t: any, index) => (
                                <div
                                    key={index}
                                    className='flex flex-row items-center justify-between px-5 py-3 border-b border-white/5 hover:bg-white/5 transition-colors duration-150'
                                >
                                    <div className="text-sm font-medium text-white/60 w-16">
                                        {convertTimeFormat(t.split('T')[1])}
                                    </div>

                                    <div className='w-8'>
                                        <img src={weatherCodeMap[weathercode[index]][1]} alt={weatherCodeMap[weathercode[index]][0]} />
                                    </div>

                                    <div className='text-sm text-white/50 flex-1 text-center px-2'>
                                        {weatherCodeMap[weathercode[index]][0]}
                                    </div>

                                    <div className='text-lg font-light text-white w-16 text-right'>
                                        {Math.round(Number(temp[index]))}°F
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
