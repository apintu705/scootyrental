import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import {useSelector,useDispatch} from "react-redux"
import {  getallscooty } from '../redux/actions/actions';
import { Loading } from '../components/Loading';
import { Link} from 'react-router-dom';
import {DatePicker} from "antd";
import axios from 'axios';


export const Home = () => {
  const {RangePicker}=DatePicker;
  const {scootys}=useSelector((state)=>state.reducer);
  const dispatch = useDispatch();
  const [totalscooty,settotalscooty]=useState([])
  const [city,setcity]=useState([])
  const [query,setQuery]=useState()
  const {loading}=useSelector((state)=>state.loading)

  const setfilter=(e)=>{
    var temp=[]

    for(var scooty of scootys){

          if(scooty.bookedTimeSlots.length === 0){
              temp.push(scooty)
          }
    }
    settotalscooty(temp)
  }

  useEffect(()=>{
    dispatch(getallscooty())
    
  },[dispatch])
  useEffect(()=>{
    settotalscooty(scootys)
  },[scootys])

  useEffect(()=>{
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8080/api/citys/city');

      setcity(result.data)
    }
    fetchData();
  },[])

  const filterResult = (catItem) => {
    const catResult = totalscooty.filter((curCat) => {
        return curCat.type === catItem;
    });
    settotalscooty(catResult);
  }



  const search = () => {
    if(!query){
      settotalscooty(scootys)
    }else{
      let a= totalscooty.filter(items=>{items.name=items.name.toLowerCase();
      return items.name.includes(query)});
      settotalscooty(a)
    }
    
    
  };

  return (
    <Layout>
      <div className="slider">
        <div className="left">
          <h1 className="title">Masai Scooty Hire</h1>
        </div>

        <div className="right">
          <img style={{maxHeight:"50vh",martinTop:"5rem",width:"100%"}} 
          src="https://cdn.autoportal.com/bp-v3/img/models/65/5/26e997d66949b42e3a72ac8a35c47c4f.jpg"
           alt="" />
        </div>
      </div>

      <div className="content">
          <div className="content-row">
            <h1 className="big-title">Scooty's For Rent</h1>
          </div>

          <div className="content-flex">
            <div className="content-row flex-1">

              <div className="div-filter">
                <h2 className="scooty-subtitle">****Search by scooty name****</h2>
                <input type="search" placeholder='Search...'onKeyPress={(e)=>{if(e.key==="Enter"){
                  search()
                }}} onChange={(e) => setQuery(e.target.value)} className='search' />
              </div>

              <div className="div-filter">
              <div className="scooty-subtitle">****Filter For Availability****</div>
              
              <RangePicker showTime={{format: "HH:mm"}} format="YYYY-MM-DD HH:mm:ss" onChange={(e)=>setfilter(e)} />
              </div>

              <div className="div-filter">
                <h2 className="scooty-subtitle">****Select your City you want a ride****</h2>
                <div className="filter-btns">
                  <button onClick={() => settotalscooty(scootys)} className="btn-type">All India</button>
                  {city.map((cat) => (
                      <button key={cat._id} onClick={() => filterResult(cat.type) } className="btn-type">{cat.type}</button>
                  ))}
                </div>
              </div>
            </div>
          <div className="content-row flex-2">
            {loading?<Loading/>:(
              <div className="content-groups">
                {totalscooty && totalscooty.map((scooty)=>(
                  <div className="card" key={scooty._id}>
                    <div className="card-body">
                      <img src={scooty.image} className="img-cars" alt="scooty" />
                    </div>
                    <div className="card-footer">
                      <div className="card-footer-top">
                        <h3 className="car-title">{scooty.name}</h3>
                        <p className="per-day">Per Dar: ${(scooty.payPerDay).toFixed(2)} </p>
                      </div>
                      <div className="card-footer-bottom">
                        <button className="rent-now"><Link className="rent-link" to={`/scooty/${scooty._id}`}>Rent Now</Link></button>
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
