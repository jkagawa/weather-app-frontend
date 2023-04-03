export const hasData = (obj: object) => {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return true;
    }
    return false;
}

export const convertDateFormatFull = (date: string) => {
    let newDate: string = date.replace('-','/')
    const options: {} = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    newDate = new Date(newDate).toLocaleDateString('en-us', options)
    return newDate
}

export const convertDateFormatPartial = (date: string) => {
    let newDate: string = date.replace('-','/')
    const options: {} = { year: 'numeric', month: 'long', day: 'numeric' }
    newDate = new Date(newDate).toLocaleDateString('en-us', options)
    return newDate
}

export const convertTimeFormat = (time: string) => {
    let newTime = Number(time.split(':')[0])
    const am_or_pm = newTime>12? 'pm' : 'am'
    if(newTime==0) {
        newTime = 12
    } else if(newTime>12) {
        newTime -=12
    }
    return newTime + ' ' + am_or_pm
}