import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout'
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import axios from "axios";
import moment from "moment"
import {DatePicker} from "antd"
import { rentcat } from '../redux/actions/rentaction';

export const Scooty = () => {
  const {RangePicker}=DatePicker;
  const navigate=useNavigate()
  
  const {id}=useParams();
  const dispatch=useDispatch();
  const [scooty,setscooty]=useState("");

  const [from,setfrom]=useState();
  const [to,setto]=useState();
  const [totaldays,settotaldays]=useState(0)
  const [driver,setDriver]=useState(false)
  const [total,settotal]=useState(0)

  const a=scooty.payPerDay

  const selectTime=(e)=>{
    setfrom(moment(e[0]).format("MMM:DD:yyy HH:mm"))
    setto(moment(e[1]).format("MMM:DD:yyy HH:mm"))

    settotaldays(e[1].diff(e[0], 'Days'))
  }


  useEffect(()=>{
    if(!localStorage.getItem("User")){
      navigate("/login")
    }

    const fetchData = async () => {
        
      try {
        const result = await axios.get(`http://localhost:8080/api/scootys/scooty/${id}`);
        
        setscooty(result.data)

      } catch(err) {
        console.log("Error!");
      }
      
    }
    fetchData();
    driver?settotal(((totaldays*a)+40)):settotal(totaldays*a)

  },[id,navigate,driver,totaldays,a])

  const rentNow = async () => {
    const rentobj={
      user:JSON.parse(localStorage.getItem("User")),
      scooty:id,
      totaldays,
      total,
      driverRequired:driver,
      bookedTimeSlots:{
        from,
        to
      }
    }
    dispatch(rentcat(rentobj))
    navigate("/")
  }

  return (
    <Layout>
      <div className="scooty-container">
        <h3 className="scooty-rentTitle">Rent a Scooty</h3>
        <div className="scooty-row">
          <div className="scooty-col">
            <div className="scooty-groups">
              <div className="scooty-group">
                <h2 className="scooty-subtitle">****Scooty Info****</h2>
                <div className="scooty-info">
                  <span>{scooty && scooty.name.toUpperCase()}</span>
                  <span>${(scooty.payPerDay)?.toFixed(2)} Pay Per Day</span>
                  <span>Fuel Type: {scooty.fuelType}</span>
                  
                </div>
              </div>
              <div className="scooty-group">
                <h2 className="scooty-subtitle">****Rent A scooty****</h2>
                <div className="scooty-info">
                  <RangePicker showTime={{format: "HH:mm"}} format="YYYY-MM-DD HH:mm:ss" onChange={(e)=>selectTime(e)} />
                  {from && to && (
                    <>
                      <span>Total Days: {totaldays}</span>
                      <span>Pay Per Day: ${(scooty.payPerDay)?.toFixed(2)}</span>
                      <p className='driver'>
                        <input type="checkbox" onChange={(e) => {
                          if(e.target.checked) {
                            setDriver(true)
                          } else {
                            setDriver(false)
                          }
                          }} id="driver"/> 
                        <label htmlFor='driver'>Driver Required</label>
                      </p>
                      <div className="total">
                        <h1 className="totalTitle">Total Amount: ${(total).toFixed(2)}</h1>
                      </div>
                      <button className='rent-now' 
                      onClick={rentNow}>Rent Now</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="scooty-col">
            <div className="scooty-image">
              <img src={scooty.image} className="scooty-img" alt={scooty.name} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
