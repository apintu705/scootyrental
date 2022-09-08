import axios from "axios";
import {toast} from "react-toastify"

export const rentcat=(formdata)=>async(dispatch)=>{
 
    
    dispatch({type:"LOADING",payload:true})
    dispatch({type:"ERROR",payload:false})
    try{
        await axios.post("http://localhost:8080/api/rent/rentscooty",formdata)

        
        toast.success("you have successfull reserved the scooty !")
        dispatch({type:"LOADING",payload:false})
        dispatch({type:"ERROR",payload:false})
        
    }
    catch(error){
        console.error(error.message)
        toast.error(error.response.data.message)
        dispatch({type:"ERROR",payload:true})
        dispatch({type:"LOADING",payload:false})
    }
}
