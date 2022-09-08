const initialdata={
    cars:[]
}

export const reducer=(state=initialdata,action)=>{
    switch(action.type){

        case "GET_ALL_CARS":
            return{
                ...state,
                cars:action.payload
            }

        default:
            return {
                ...state,
            }
    }
}