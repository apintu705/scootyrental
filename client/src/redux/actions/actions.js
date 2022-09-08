import axios from 'axios';

export const getallscooty=()=>async(dispatch)=>{
    dispatch({type:"LOADING",payload:true})
    try{
        const {data}=await axios.get("http://localhost:8080/api/scootys/getall")
        dispatch({type:"GET_ALL_SCOOTY",payload:data})
        dispatch({type:"LOADING",payload:false})
    }
    catch(error){
        console.log(error)
        dispatch({type:"LOADING",payload:false})
    }
}