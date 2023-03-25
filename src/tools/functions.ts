export const hasData = (obj: object) => {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return true;
    }
    return false;
}