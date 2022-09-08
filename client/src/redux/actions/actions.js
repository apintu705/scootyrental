import axios from 'axios';

export const getallcars=()=>async(dispatch)=>{
    dispatch({type:"LOADING",payload:true})
    try{
        const {data}=await axios.get("http://localhost:8080/api/cars/getall")
        dispatch({type:"GET_ALL_CARS",payload:data})
        dispatch({type:"LOADING",payload:false})
    }
    catch(error){
        console.log(error)
        dispatch({type:"LOADING",payload:false})
    }
}