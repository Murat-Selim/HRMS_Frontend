export const ADD_FILTER = "ADD_FILTER"
export const REMOVE_FILTER = "REMOVE_FILTER"

export const addFilter = (filter)=>{
    return {
        type:ADD_FILTER,
        payload:filter
    }
}

export const removeFilter=()=>{
    return {
        type:REMOVE_FILTER,
        payload:{
            cityId:[null],
            jobPositionId:[null],
            workTimeId:[null],
            workPlaceId:[null]
        }
    }
}