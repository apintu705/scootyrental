import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import {useSelector,useDispatch} from "react-redux"
import { getallcars } from '../redux/actions/actions';
import { Loading } from '../components/Loading';
import { Link} from 'react-router-dom';
import {DatePicker} from "antd";
import axios from 'axios';


export const Home = () => {
  const {RangePicker}=DatePicker;
  const {cars}=useSelector((state)=>state.reducer);
  const dispatch = useDispatch();
  const [totalcar,settotalcar]=useState([])
  const [city,setcity]=useState([])
  const [query,setQuery]=useState()
  const {loading}=useSelector((state)=>state.loading)

  const setfilter=(e)=>{
    var temp=[]

    for(var car of cars){

          if(car.bookedTimeSlots.length === 0){
              temp.push(car)
          }
    }
    settotalcar(temp)
  }

  useEffect(()=>{
    dispatch(getallcars())
    
  },[dispatch])
  useEffect(()=>{
    settotalcar(cars)
  },[cars])

  useEffect(()=>{
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8080/api/citys/city');

      setcity(result.data)
    }
    fetchData();
  },[])

  const filterResult = (catItem) => {
    const catResult = totalcar.filter((curCat) => {
        return curCat.type === catItem;
    });
    settotalcar(catResult);
  }

  const keys = ["type"];

  const search = () => {
    if(!query){
      settotalcar(cars)
    }else{
      let a= totalcar.filter(items=>{items.name=items.name.toLowerCase();
      return items.name.includes(query)});
      settotalcar(a)
    }
    
    
  };

  return (
    <Layout>
      <div className="slider">
        <div className="left">
          <h1 className="title">Masai Car Hire</h1>
        </div>

        <div className="right">
          <img style={{maxHeight:"50vh",martinTop:"5rem",width:"100%"}} 
          src="https://cdn.autoportal.com/bp-v3/img/models/65/5/26e997d66949b42e3a72ac8a35c47c4f.jpg"
           alt="" />
        </div>
      </div>

      <div className="content">
          <div className="content-row">
            <h1 className="big-title">Top Cars For Rent</h1>
          </div>

          <div className="content-flex">
            <div className="content-row flex-1">

              <div className="div-filter">
                <h2 className="car-subtitle">****Filter by Search****</h2>
                <input type="search" placeholder='Search...'onKeyPress={(e)=>{if(e.key==="Enter"){
                  search()
                }}} onChange={(e) => setQuery(e.target.value)} className='search' />
              </div>

              <div className="div-filter">
              <div className="car-subtitle">****Filter For Availability****</div>
              
              <RangePicker showTime={{format: "HH:mm"}} format="YYYY-MM-DD HH:mm:ss" onChange={(e)=>setfilter(e)} />
              </div>

              <div className="div-filter">
                <h2 className="car-subtitle">****Filter by Type****</h2>
                <div className="filter-btns">
                  <button onClick={() => settotalcar(cars)} className="btn-type">All</button>
                  {city.map((cat) => (
                      <button key={cat._id} onClick={() => filterResult(cat.type) } className="btn-type">{cat.type}</button>
                  ))}
                </div>
              </div>
            </div>
          <div className="content-row flex-2">
            {loading?<Loading/>:(
              <div className="content-groups">
                {totalcar.map((car)=>(
                  <div className="card" key={car._id}>
                    <div className="card-body">
                      <img src={car.image} className="img-cars" alt="car" />
                    </div>
                    <div className="card-footer">
                      <div className="card-footer-top">
                        <h3 className="car-title">{car.name}</h3>
                        <p className="per-day">Per Dar: ${(car.payPerDay).toFixed(2)} </p>
                      </div>
                      <div className="card-footer-bottom">
                        <button className="rent-now"><Link className="rent-link" to={`/car/${car._id}`}>Rent Now</Link></button>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            )}
              
          </div>
          </div>
      </div>

    </Layout>
  )
}
