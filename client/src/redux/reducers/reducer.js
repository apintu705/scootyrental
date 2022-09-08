const initialdata={
    scootys:[]
}

export const reducer=(state=initialdata,action)=>{
    switch(action.type){

        case "GET_ALL_SCOOTY":
            return{
                ...state,
                scootys:action.payload
            }

        default:
            return {
                ...state,
            }
    }
}