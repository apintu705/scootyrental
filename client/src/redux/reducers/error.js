const initdata={
    error:false
}

export const error=(state=initdata,action)=>{
    switch(action.type){
        case "ERROR":
            return {
                ...state,
                error:action.payload
            }
        default:
            return {
                ...state
            }
    }
}