const initdata={
    loading:false
}

export const loading=(state=initdata,action)=>{
    switch(action.type){
        case "LOADING":
            return {
                ...state,
                loading:action.payload
            }
        default:
            return {
                ...state
            }
    }
}